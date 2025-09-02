// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Create AuthContext
const AuthContext = createContext();

// UserModel class
class UserModel {
  constructor(data) {
    this.uid = data.uid || '';
    this.type = data.type || 'individual';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.language = data.language || 'English';
    this.isEmailVerified = data.isEmailVerified || false;
    this.createdAt = data.createdAt || null;
    this.companyName = data.companyName || null;
    this.address = data.address || null;
    this.registerId = data.registerId || null;
    this.profileImage = data.profileImage || null;
    this.latitude = data.latitude || null;
    this.longitude = data.longitude || null;
    this.locationAddress = data.locationAddress || null;
    this.bio = data.bio || null;
  }

  static fromFirestore(userData, locationData = null) {
    return new UserModel({
      uid: userData.uid,
      type: userData.type,
      email: userData.email,
      phone: userData.phone,
      language: userData.language,
      isEmailVerified: userData.isEmailVerified,
      createdAt: userData.createdAt?.toDate(),
      companyName: userData.companyName,
      address: userData.address,
      registerId: userData.registerId,
      profileImage: userData.profileImage,
      latitude: locationData?.latitude,
      longitude: locationData?.longitude,
      locationAddress: locationData?.address,
      bio: userData.bio,
    });
  }

  toJson() {
    return {
      uid: this.uid,
      type: this.type,
      email: this.email,
      phone: this.phone,
      language: this.language,
      isEmailVerified: this.isEmailVerified,
      createdAt: this.createdAt,
      companyName: this.companyName,
      address: this.address,
      registerId: this.registerId,
      profileImage: this.profileImage,
      bio: this.bio,
    };
  }
}

// Auth functions
const signUpUser = async (userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    const user = userCredential.user;
    
    await sendEmailVerification(user);
    
    const newUser = new UserModel({
      uid: user.uid,
      email: userData.email,
      type: userData.type,
      phone: userData.phone,
      language: userData.language,
      companyName: userData.companyName,
      address: userData.address,
      registerId: userData.registerId,
      bio: userData.bio,
      isEmailVerified: false,
    });
    
    await setDoc(doc(db, 'users', user.uid), newUser.toJson());
    
    if (userData.latitude && userData.longitude) {
      await setDoc(doc(db, 'userLocations', user.uid), {
        latitude: userData.latitude,
        longitude: userData.longitude,
        address: userData.locationAddress || ''
      });
    }
    
    return { user: newUser, needsEmailVerification: true };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const locationDoc = await getDoc(doc(db, 'userLocations', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const locationData = locationDoc.exists() ? locationDoc.data() : null;
      
      const userModel = UserModel.fromFirestore(userData, locationData);
      userModel.isEmailVerified = user.emailVerified;
      
      return userModel;
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Signout error:', error);
    throw error;
  }
};

const getCurrentUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    const locationDoc = await getDoc(doc(db, 'userLocations', uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const locationData = locationDoc.exists() ? locationDoc.data() : null;
      return UserModel.fromFirestore(userData, locationData);
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// AuthProvider component
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userModel, setUserModel] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (userData) => {
    setLoading(true);
    try {
      const result = await signUpUser(userData);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    setLoading(true);
    try {
      const user = await signInUser(email, password);
      setUserModel(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      setUserModel(null);
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = () => {
    return currentUser !== null && userModel !== null;
  };

  const isEmailVerified = () => {
    return currentUser?.emailVerified || false;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        const userData = await getCurrentUserData(user.uid);
        if (userData) {
          userData.isEmailVerified = user.emailVerified;
          setUserModel(userData);
        }
      } else {
        setUserModel(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userModel,
    loading,
    signup,
    signin,
    logout,
    isLoggedIn,
    isEmailVerified,
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    !loading && children
  );
}

// Custom hook to use auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Exports
export { AuthProvider, useAuth, UserModel };
export default AuthContext;