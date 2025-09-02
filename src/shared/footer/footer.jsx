import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import appstore from "../../assets/appstore.png";
import googleplay from "../../assets/playstore.png";
import logo from "../../assets/logo.png"; // Replace with actual logo path
import "./footer.css";

export default function Footer() {
  return (
    <>
      <div className="footerMain">
        <div className="footer">
          <div className="footerColumn">
            <h2>Security</h2>
            <Link to="/security/customer-security">
              <p>Customer security</p>
            </Link>
            <Link to="/our-services/shipping-with-purchase-protection">
              <p>Shipping with purchase protection</p>
            </Link>
            <Link to="/security/fake-emails">
              <p>Fake emails</p>
            </Link>
            <Link to="/company-information">
              <p>Report annoying advertising</p>
            </Link>
          </div>
          <div className="footerColumn">
            <h2>Terms</h2>
            <Link to="/terms/help">
              <p>Help</p>
            </Link>
            <Link to="/terms/sales-team">
              <p>Sales Team</p>
            </Link>
            <Link to="/terms/term-use">
              <p>Terms of Use</p>
            </Link>
            <Link to="/terms/term-use">
              <p>Privacy Policy</p>
            </Link>
            <Link to="/our-services/all-our-services">
              <p>Safety Tips</p>
            </Link>
            <Link to="/terms/term-use">
              <p>Terms</p>
            </Link>
            <Link to="/terms/term-use">
              <p>Cookies</p>
            </Link>
          </div>
          <div className="footerColumn">
            <h2>For businesses</h2>
            <Link to="/business/open-store">
              <p>Open Store</p>
            </Link>
            <Link to="/ads">
              <p>Show all stores with City filter</p>
            </Link>
          </div>
          <div className="footerColumn">
            <h2>The block</h2>
            <Link to="/our-services/all-our-services">
              <p>About us</p>
            </Link>
            <img src={logo} alt="Logo" className="footerLogo" />
            <div className="footerSocial">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="socialIcon" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="socialIcon" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="socialIcon" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="socialIcon" />
              </a>
            </div>
          </div>
        </div>
        <div className="footerColumn-center">
          <p>Copyright © 2025. All rights reserved.</p>
          <div className="footerButtons">
            <img src={appstore} alt="App Store" />
            <img src={googleplay} alt="Google Play" />
          </div>
        </div>
      </div>
    </>
  );
}
