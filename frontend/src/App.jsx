import react, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'
import ProfilePage from './pages/Profilepage'
import MediaUploadForm from './components/Media'
import UpdateProfilePage from './components/UpdateProfile'
import UpdateProfilePhotoPage from './components/UpdateProfilePhoto'
import Subdetails from './components/Subdetails'
import { ToastContainer } from 'react-toastify'
import UpdateProfileForm from './pages/UpdatePofile'
import MediaDetailPage from './pages/mediaDetails'
import SearchResultsPage from './pages/SearchPage'
import { AnimatePresence } from 'framer-motion'

function App () {
  // const [category ,setCategory] = useState("")

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <AnimatePresence mode='wait'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            <Route path='/media' element={<MediaUploadForm />} />
            {/* <Route path="/update-profile" element={<UpdateProfilePage />} /> */}
            <Route
              path='/update-profile/:userid'
              element={<UpdateProfileForm />}
            />
            <Route path='/subdetails' element={<Subdetails />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
            <Route path='/media/:id' element={<MediaDetailPage />} />
            <Route path='/search' element={<SearchResultsPage />} />
            <Route
              path='/update-profile-photo'
              element={<UpdateProfilePhotoPage />}
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </Router>
    </>
  )
}

export default App
