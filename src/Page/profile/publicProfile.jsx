import PublicProfile from "../../components/profile/publicProfile";
import Footer from "../../shared/footer/footer";
import Navbar from "../../shared/Navbar";

export default function PublicProfileMain() {
  return (
    <>
      <div className="advertisement_mained">
        <Navbar />
        <PublicProfile />
        <Footer />
      </div>
    </>
  );
}
