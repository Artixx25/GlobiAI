import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import {logo} from './assets'
import {Posts, CreatePost, Home, Login, Register, Profile} from './pages'
import { useSelector } from "react-redux";
import { ProfileWidget } from "./components";
import {BsFillImageFill} from 'react-icons/bs';


const App = () => {
  const isAuth = Boolean(useSelector(state => state.token))
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
    <header className="w-full flex justify-between items-center sm:px-8 z-10 px-4 py-4 fixed top-0 left-0 backdrop-blur-lg 2xl:backdrop-blur-none backgroundMenu">
      <Link to="/">
        <img src={logo} alt="logo" className="sm:w-40 w-[120px] object-contain" />
      </Link>
      {!isAuth ? (
        <div className="flex items-center gap-5">
        <Link to="/login" className="font-inter bg-transparent text-white px-4 py-2">
          Login
        </Link>
        <Link to="/register" className="font-inter font-medium bg-gradient-to-r from-[#53a717] to-[#abbb76] text-white px-4 py-2 rounded-md">
          Sign Up
        </Link>
        </div>
        ) : (
          <div className="flex items-center gap-5">
            <ProfileWidget userId={user._id} />
            <Link to="/create-post" className="font-inter hidden sm:block font-medium bg-gradient-to-r from-[#53a717] to-[#abbb76] text-white px-4 py-2 rounded-md">
              Create Image
            </Link>
            <Link to="/create-post" className="font-inter sm:hidden block font-medium bg-gradient-to-r from-[#53a717] to-[#abbb76] text-white px-4 py-2 rounded-md">
              <BsFillImageFill className="text-2xl" />
            </Link>
          </div>
        )}

    </header>
      <main className="w-full bg-[#080808] min-h-[100vh] h-full">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/posts" element={<Posts />}/>
          <Route path="/create-post" element={isAuth ? <CreatePost /> : <Navigate to="/login" />} />
          <Route path="/profile/:id" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
