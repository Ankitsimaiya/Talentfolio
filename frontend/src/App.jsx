import react from "react";
import {BrowserRouter as Router, Routes ,Route  }  from "react-router-dom"
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfilePage from "./components/Profile";
import MediaUploadForm from "./components/Media";
import UpdateProfilePage from "./components/UpdateProfile";
import UpdateProfilePhotoPage from "./components/UpdateProfilePhoto";

function App() {
  return (
    <>
      <Router>
          <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<ProfilePage/>}  />
          <Route path="/media" element={<MediaUploadForm/>}  />
          <Route path="/update-profile" element={<UpdateProfilePage/>}  />
          <Route path="/update-profile-photo" element={<UpdateProfilePhotoPage/>}  />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
