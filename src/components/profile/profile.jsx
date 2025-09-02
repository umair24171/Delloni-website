import { useState } from "react";
import "./profile.css";
import profile from "../../assets/profile-picture.png";
import { MdOutlineEdit } from "react-icons/md";
import heart from "../../assets/like.png";
import pen from "../../assets/edit.png";
import user from "../../assets/user.png";
import bell from "../../assets/bell.png";
import sold from "../../assets/money-bag.png";
import check from "../../assets/check.png";
import leaf from "../../assets/leaves.png";
import settings from "../../assets/cogwheel.png";
import CustomModal from "../../helpers/CustomModal";
import { BiCross } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "Edit Profile",
  });
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "Ubaid Sheikh",
    description: "On the Block since today",
  });

  const openModal = () => {
    setModalState({ isOpen: true, title: "Edit Profile" });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: "" });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setProfileData({
      name: formData.get("name"),
      description: formData.get("description"),
    });
    closeModal();
  };

  const blocks = [
    {
      id: 1,
      title: "My ads",
      description: "view and manage your own ads",
      image: pen,
    },
    {
      id: 2,
      title: "saved ads",
      description: "Ads you have chosen to save",
      image: heart,
    },
    {
      id: 3,
      title: "Selected for you",
      description: "See ads that are tailored for you and your preferences",
      image: user,
    },
    {
      id: 4,
      title: "Alerts",
      description: "New ads from your alerts",
      image: bell,
    },
    {
      id: 5,
      title: "Sold with our secure services",
      description:
        "Everything you've sold with our shipping and payment services",
      image: sold,
    },
    {
      id: 6,
      title: "Purchased with our secure services",
      description:
        "Everything you bought with our shipping and payment services",
      image: check,
    },
    {
      id: 7,
      title: "My environmental contribution",
      description: "See what you've saved the environment via Blocket",
      image: leaf,
    },
    {
      id: 8,
      title: "Account settings",
      description: "view and manage your account profile",
      image: settings,
    },
  ];

  const handleNavigate = () => {
    navigate("/publicprofile");
  };

  return (
    <>
      <div className="profileMain">
        <div className="profile">
          <div className="profileHeader">
            <div className="profileImage">
              <img src={profile} alt="Profile" />
            </div>
            <div className="profileInfo">
              <h1>{profileData.name}</h1>
              <p>{profileData.description}</p>
            </div>
          </div>
          <div className="profileButton">
            <button className="profileButtonEdit" onClick={openModal}>
              <MdOutlineEdit />
              Edit Profile
            </button>
            <button
              onClick={() => handleNavigate()}
              className="profileButtonLogout"
            >
              View public profile
            </button>
          </div>
          <hr className="profileLine" />

          <div className="MyBlocks">
            <div className="myBlocksTitle">
              <p>My Block</p>
            </div>
            <div className="blocksCards">
              {blocks.map((block) => (
                <div className="blockCard" key={block.id}>
                  <img src={block.image} alt={block.title} />
                  <h2>{block.title}</h2>
                  <p>{block.description}</p>
                </div>
              ))}
            </div>
          </div>
          <hr className="" />
          <div className="profilelogout">
            <button>Log Out</button>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        <div className="editProfileModal">
          <div className="editProfileModalTitle">
            <p>Edit Profile</p>
            <IoIosClose
              className="crossIcon"
              style={{ fontSize: "3rem" }}
              onClick={closeModal}
            />
          </div>
          <div className="editModalCont">
            <div className="EditModalLeft">
              <img src={profile} alt="" />
            </div>
            <div className="editModalRight">
              <div className="modalNameChnage">
                <button>
                  <MdOutlineEdit />
                  Change disply name
                </button>
              </div>
              <div className="modalUserName">
                <p>Ubaid Sheikh</p>
              </div>
              <div className="modalDescription">
                <p>Description about you</p>
                <textarea name="" id=""></textarea>
                <p className="modalDescriptionNote">
                  Phone numbers, emails or links are not allowed.
                </p>
              </div>
              <div className="editModalButtons">
                <button className="editModalSave" onClick={handleProfileUpdate}>
                  Save
                </button>
                <button className="editModalCancel" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
