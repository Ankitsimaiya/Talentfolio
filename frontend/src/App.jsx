import react from "react";
import {BrowserRouter as Router, Routes ,Route  }  from "react-router-dom"
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfilePage from "./components/Profile";

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
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
