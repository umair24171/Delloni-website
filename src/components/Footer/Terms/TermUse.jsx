import React from "react";
import "./termUse.css";
import poster from "../../../assets/poster.jpg";

const TermUsePage = () => {
  return (
    <div className="terms_container">
      <div className="ads_ads">
        <img src={poster} alt="Promotional poster" />
      </div>
      <div className="terms_max_width">
        {/* Terms of Use Content */}
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing our{" "}
          <strong>
            <a href="/platform" className="terms_link">
              platform
            </a>
          </strong>
          , you agree to be bound by these Terms of Use. These terms apply to
          all users of{" "}
          <strong>
            <a href="/about" className="terms_link">
              Vend
            </a>
          </strong>
          's{" "}
          <strong>
            <a href="/services" className="terms_link">
              services
            </a>
          </strong>
          , including website visitors, registered users, and clients. Failure
          to comply may result in restricted access to our{" "}
          <strong>
            <a href="/resources" className="terms_link">
              resources
            </a>
          </strong>
          .
        </p>
        <ol>
          <li>
            You must be at least 18 years old to engage with our{" "}
            <strong>
              <a href="/signup" className="terms_link">
                services
              </a>
            </strong>
            .
          </li>
          <li>
            All users are required to adhere to our{" "}
            <strong>
              <a href="/guidelines" className="terms_link">
                community standards
              </a>
            </strong>
            .
          </li>
          <li>
            Violation of these terms may lead to{" "}
            <strong>
              <a href="/support" className="terms_link">
                account termination
              </a>
            </strong>
            .
          </li>
        </ol>

        <h2>2. User Conduct</h2>
        <p>
          Users of our{" "}
          <strong>
            <a href="/platform" className="terms_link">
              platform
            </a>
          </strong>{" "}
          must engage in lawful and respectful behavior. Any misuse of our{" "}
          <strong>
            <a href="/services" className="terms_link">
              services
            </a>
          </strong>{" "}
          or attempts to disrupt our{" "}
          <strong>
            <a href="/infrastructure" className="terms_link">
              infrastructure
            </a>
          </strong>{" "}
          will not be tolerated.
        </p>
        <ol>
          <li>
            Do not share or distribute unauthorized{" "}
            <strong>
              <a href="/content" className="terms_link">
                content
              </a>
            </strong>
            .
          </li>
          <li>
            Refrain from engaging in activities that harm our{" "}
            <strong>
              <a href="/community" className="terms_link">
                community
              </a>
            </strong>
            .
          </li>
          <li>
            Report any issues to our{" "}
            <strong>
              <a href="/support" className="terms_link">
                support team
              </a>
            </strong>
            promptly.
          </li>
        </ol>

        <h2>3. Account Management</h2>
        <p>
          When you create an account on our{" "}
          <strong>
            <a href="/platform" className="terms_link">
              platform
            </a>
          </strong>
          , you are responsible for maintaining the security of your{" "}
          <strong>
            <a href="/security" className="terms_link">
              credentials
            </a>
          </strong>
          . Vend is not responsible for unauthorized access due to user
          negligence.
        </p>
        <ol>
          <li>
            Provide truthful information during{" "}
            <strong>
              <a href="/register" className="terms_link">
                registration
              </a>
            </strong>
            .
          </li>
          <li>
            Keep your{" "}
            <strong>
              <a href="/account" className="terms_link">
                account details
              </a>
            </strong>{" "}
            confidential.
          </li>
          <li>
            Immediately report any{" "}
            <strong>
              <a href="/contact" className="terms_link">
                security issues
              </a>
            </strong>{" "}
            to our team.
          </li>
          <li>
            Update your{" "}
            <strong>
              <a href="/profile" className="terms_link">
                profile
              </a>
            </strong>{" "}
            regularly to ensure accuracy.
          </li>
        </ol>

        <h2>4. Intellectual Property</h2>
        <p>
          All materials available on our{" "}
          <strong>
            <a href="/website" className="terms_link">
              website
            </a>
          </strong>
          , including but not limited to text, images, and software, are
          protected by{" "}
          <strong>
            <a href="/copyright" className="terms_link">
              intellectual property laws
            </a>
          </strong>
          . Unauthorized use is strictly prohibited.
        </p>
        <ol>
          <li>
            You may not copy or distribute our{" "}
            <strong>
              <a href="/content" className="terms_link">
                content
              </a>
            </strong>{" "}
            without express permission.
          </li>
          <li>
            Respect all{" "}
            <strong>
              <a href="/trademarks" className="terms_link">
                trademarks
              </a>
            </strong>{" "}
            associated with Vend.
          </li>
          <li>
            Contact our{" "}
            <strong>
              <a href="/legal" className="terms_link">
                legal team
              </a>
            </strong>{" "}
            for licensing inquiries.
          </li>
        </ol>

        <h2>5. Limitation of Liability</h2>
        <p>
          Vend strives to provide reliable{" "}
          <strong>
            <a href="/services" className="terms_link">
              services
            </a>
          </strong>
          , but we are not liable for any damages resulting from the use of our{" "}
          <strong>
            <a href="/platform" className="terms_link">
              platform
            </a>
          </strong>
          . We do not guarantee continuous access or error-free operation.
        </p>
        <ol>
          <li>
            We are not responsible for third-party{" "}
            <strong>
              <a href="/integrations" className="terms_link">
                integrations
              </a>
            </strong>
            .
          </li>
          <li>
            Any loss of data must be reported to our{" "}
            <strong>
              <a href="/support" className="terms_link">
                support team
              </a>
            </strong>
            .
          </li>
          <li>
            Users assume all risks when using our{" "}
            <strong>
              <a href="/tools" className="terms_link">
                tools
              </a>
            </strong>
            .
          </li>
        </ol>

        <h2>6. Modifications to Terms</h2>
        <p>
          We reserve the right to update these Terms of Use at any time. Changes
          will be communicated via our{" "}
          <strong>
            <a href="/website" className="terms_link">
              website
            </a>
          </strong>{" "}
          or through direct notifications to registered users.
        </p>
        <ol>
          <li>
            Check our{" "}
            <strong>
              <a href="/updates" className="terms_link">
                updates page
              </a>
            </strong>{" "}
            for the latest terms.
          </li>
          <li>
            Continued use of our{" "}
            <strong>
              <a href="/platform" className="terms_link">
                platform
              </a>
            </strong>{" "}
            implies acceptance of updated terms.
          </li>
          <li>
            Contact our{" "}
            <strong>
              <a href="/support" className="terms_link">
                support team
              </a>
            </strong>{" "}
            for clarification on changes.
          </li>
        </ol>

        <h2>7. Governing Law</h2>
        <p>
          These terms are governed by the laws of the jurisdiction where{" "}
          <strong>
            <a href="/about" className="terms_link">
              Vend
            </a>
          </strong>{" "}
          is headquartered. Any disputes will be resolved through arbitration or
          in a court of competent jurisdiction.
        </p>
        <ol>
          <li>
            Refer to our{" "}
            <strong>
              <a href="/legal" className="terms_link">
                legal page
              </a>
            </strong>{" "}
            for jurisdictional details.
          </li>
          <li>
            Users agree to comply with all applicable{" "}
            <strong>
              <a href="/regulations" className="terms_link">
                regulations
              </a>
            </strong>
            .
          </li>
          <li>
            Disputes should be reported to our{" "}
            <strong>
              <a href="/contact" className="terms_link">
                legal team
              </a>
            </strong>
            .
          </li>
        </ol>

        <h2>8. Contact Information</h2>
        <p>
          For any questions or concerns regarding these Terms of Use, please
          reach out to our{" "}
          <strong>
            <a href="/support" className="terms_link">
              support team
            </a>
          </strong>
          . Additional information is available on our{" "}
          <strong>
            <a href="/faq" className="terms_link">
              FAQ page
            </a>
          </strong>
          .
        </p>
        <ol>
          <li>
            Email us at our{" "}
            <strong>
              <a href="/contact" className="terms_link">
                support email
              </a>
            </strong>
            .
          </li>
          <li>
            Visit our{" "}
            <strong>
              <a href="/help" className="terms_link">
                help center
              </a>
            </strong>{" "}
            for resources.
          </li>
          <li>
            Follow our{" "}
            <strong>
              <a href="/updates" className="terms_link">
                updates
              </a>
            </strong>{" "}
            for the latest information.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermUsePage;
