import "./publicProfile.css";
import profileImg from "../../assets/user.png";
import { MdOutlineReportProblem } from "react-icons/md";
import leaf from "../../assets/leaves.png";

export default function PublicProfile() {
  return (
    <>
      <div className="publicProfileMain">
        <div className="profileCardBackground"></div>
        <div className="publicProfile">
          <div className="publicProfileCard">
            <div className="publicProfileLeft">
              <div className="publicProfileImg">
                <img src={profileImg} alt="" />
              </div>
              <div className="publicProfileNameSection">
                <div className="publicProfileName">
                  <p>ubaidsheikh</p>
                  <p>On the Block since June 2025</p>
                </div>
                <div className="publicProfileReportUser">
                  <p>
                    <MdOutlineReportProblem />
                    Report user
                  </p>
                </div>
              </div>
            </div>

            <div className="publicProfileRight">
              <div className="publicProfileLeaf">
                <img src={leaf} alt="" />
              </div>
              <div className="publicProfileRightText">
                <p>
                  Saved 0 kg CO₂e. This corresponds to the production of 0
                  plastic bags.
                </p>
              </div>
            </div>
          </div>
          <div className="profileListing">
            <p>
              This seller currently has no listings. However, we have 724458
              other listings on Blocket.
            </p>
            <button>Search ads</button>
          </div>
        </div>
      </div>
    </>
  );
}
