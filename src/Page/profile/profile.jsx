import Profile from "../../components/profile/profile";
import Footer from "../../shared/footer/footer";
import Navbar from "../../shared/Navbar";


export default function ProfileMain() {
    return(
        <>
        <div className="advertisement_mained">
            <Navbar/>
            <Profile/>
            <Footer/>
        </div>
        </>
    )
}