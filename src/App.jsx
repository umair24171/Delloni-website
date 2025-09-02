// App.js - Updated with Authentication Routes
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Home from "./Page/Home/Home";
import AdvertisementMain from "./Page/Advertisement/AdvertisementMain";
import ProfileMain from "./Page/profile/profile";
import AdsDetailedPage from "./Page/Advertisement/AdsDetailedPage";
import PostAdPage from "./Page/PostAd/PostAdPage";
import PublicProfileMain from "./Page/profile/publicProfile";
import CustomerSecurity from "./Page/Footer/CustomerSecurity";
import SecurityRequestPage from "./Page/Footer/SecurityRequestPage";
import OurServicesPage from "./Page/Footer/OurServices/OurServicesPage";
import PostAddPage from "./Page/Footer/OurServices/PostAddPage";
import CompanyInformationPage from "./Page/Footer/OurServices/CompanyInformationPage";
import ShippingPurchasePage from "./Page/Footer/OurServices/ShippingPurchasePage";
import GalleryPage from "./Page/Footer/OurServices/GalleryPage";
import FakeEmailPage from "./Page/Footer/OurServices/FakeEmailPage";
import UsedInsurancePage from "./Page/Footer/OurServices/UsedInsurancePage";
import DigitalPurchasePage from "./Page/Footer/OurServices/DigitalPurchasePage";
import ValueCarPage from "./Page/Footer/OurServices/ValueCarPage";
import HelpContactPage from "./Page/Footer/Terms/HelpContactPage";
import SalesTeamPage from "./Page/Footer/Terms/SalesTeamPage";
import TermUsePage from "./Page/Footer/Terms/TermUsePage";
import OpenStorePage from "./Page/Footer/Business/OpenStorePage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Navigated to:", pathname);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log("Scroll attempted to top");
    }, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/ads" element={<AdvertisementMain />} />
          <Route path="/ads-details/:adId" element={<AdsDetailedPage />} />
          <Route path="/publicprofile" element={<PublicProfileMain />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileMain />
            </ProtectedRoute>
          } />
          <Route path="/post-ad" element={
            <ProtectedRoute>
              <PostAdPage />
            </ProtectedRoute>
          } />
          
          {/* Footer Routes */}
          <Route path="/security/customer-security" element={<CustomerSecurity />} />
          <Route path="/security-request" element={<SecurityRequestPage />} />
          <Route path="/our-services/all-our-services" element={<OurServicesPage />} />
          <Route path="/our-services/post-an-add" element={<PostAddPage />} />
          <Route path="/company-information" element={<CompanyInformationPage />} />
          <Route path="/our-services/shipping-with-purchase-protection" element={<ShippingPurchasePage />} />
          <Route path="/our-services/the-gallery" element={<GalleryPage />} />
          <Route path="/security/fake-emails" element={<FakeEmailPage />} />
          <Route path="/our-services/used-insurance" element={<UsedInsurancePage />} />
          <Route path="/our-services/digitals-purchase-contracts" element={<DigitalPurchasePage />} />
          <Route path="/our-services/valuing-a-car" element={<ValueCarPage />} />
          <Route path="/terms/help" element={<HelpContactPage />} />
          <Route path="/terms/sales-team" element={<SalesTeamPage />} />
          <Route path="/terms/term-use" element={<TermUsePage />} />
          <Route path="/business/open-store" element={<OpenStorePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;