import React, { useEffect, useState } from "react";
import { Input, Loader, TileGrid } from "../components";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { Dog1, Dog2, Dog3, Dog4 } from "../assets/avatars";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [googleUser, setGoogleUser] = useState(null)
  const [googleToken, setGoogleToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState("");
  const [googleMessage, setgoogleMessage] = useState("");

  // google auth



  function handleGoogleAuth(res) {
    const userObj = jwt_decode(res.credential)
    setGoogleUser({...userObj})
    setGoogleToken({...res.credential})
    form.username = userObj.given_name,
    form.email = userObj.email,
    form.userImage = userObj.picture;
    form.google = true;
    setgoogleMessage('Great! One more step, create your password and press "Sign Up" button.')
  }




  // end

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    userImage: "",
    coverImage: "",
    google: false
  });

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "341141979493-ppp7jm8l2lbjofjvtigag8luc4q1gjv4.apps.googleusercontent.com",
      callback: handleGoogleAuth
    });

    google.accounts.id.renderButton(
      document.getElementById("GoogleSignBtn"),
      { theme: 'outline', size: 'large'}
    );
  }, [])

  const [loading, setLoading] = useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.userImage === "")
      form.userImage =
        "https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/User_No-Frame.png";

    if (form.username.length < 4)
      return setErrorMessage(
        "Username is too short, it must be minimum 4 symbols."
      );

    setLoading(true);
    try {
      const registeredResponse = await fetch(
        "http://localhost:8080/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const registered = await registeredResponse.json();
      if (registered.message === 'User was successfully registered') {
        toast.success('Registered Successfully')
        navigate("/login");
      } else {
        setgoogleMessage('')
        setErrorMessage(registered.message)
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{opacity:0,display: 'none'}} animate={{opacity:1,display: 'block'}} exit={{opacity: 0, transition: {duration:1},display: 'none'}} className="form-bg">
      <TileGrid />
      <section className="max-w-7xl mx-auto absolute flex justify-center items-center h-[100vh] flex-col inset-0">
      <form
          className="w-full max-w-[600px] h-max rounded-3xl flex flex-col items-center justify-center sm:gap-7 gap-3 relative py-6 z-[5] bg-black sm:mt-0 mt-16"
          onSubmit={handleSubmit}
        >
          <h1 className="font-extrabold text-[rgb(255,255,255)] text-[32px] z-[5] text-center">
            Register
          </h1>
          <div id="GoogleSignBtn" className={`${googleToken !== null && 'opacity-30 pointer-events-none select-none'}`}></div>
          <div className="flex text-white items-center gap-2">
            <div className="line-1"></div>
            OR
            <div className="line-2"></div>
          </div>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            handleChange={handleChange}
            info="minimal length is 4 and maximal length is 10."
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            handleChange={handleChange}
          />
          <div className={`w-[80%] h-max relative ${googleToken !== null && 'opacity-30 pointer-events-none select-none'}`}>
            <p className="text-white">Choose avatar</p>
            <div className="flex w-full justify-between mt-2 items-center">
              <label htmlFor="avatar-1">
                <input
                  type="radio"
                  name="userImage"
                  id="avatar-1"
                  className="hidden inp-anim"
                  value={Dog1}
                  onChange={handleChange}
                />
                <img
                  src={Dog1}
                  alt=""
                  width="70"
                  height="70"
                  className="rounded-xl"
                />
              </label>
              <label htmlFor="avatar-2">
                <input
                  type="radio"
                  name="userImage"
                  id="avatar-2"
                  className="hidden inp-anim"
                  value={Dog2}
                  onChange={handleChange}
                />
                <img
                  src={Dog2}
                  alt=""
                  width="70"
                  height="70"
                  className="rounded-xl"
                />
              </label>
              <label htmlFor="avatar-3">
                <input
                  type="radio"
                  name="userImage"
                  id="avatar-3"
                  className="hidden inp-anim"
                  value={Dog3}
                  onChange={handleChange}
                />
                <img
                  src={Dog3}
                  alt=""
                  width="70"
                  height="70"
                  className="rounded-xl"
                />
              </label>
              <label htmlFor="avatar-4">
                <input
                  type="radio"
                  name="userImage"
                  id="avatar-4"
                  className="hidden inp-anim"
                  value={Dog4}
                  onChange={handleChange}
                />
                <img
                  src={Dog4}
                  alt=""
                  width="70"
                  height="70"
                  className="rounded-xl"
                />
              </label>
            </div>
            <p className="text-[#ffffff8d] font-inter font-extralight text-xs mt-3">
              ** You will be able to change it after creating an account. **
            </p>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            handleChange={handleChange}
            info="minimal length is 4 and maximal length is 10."
          />
          {errorMessage !== '' && <p className="text-[#ff5454] text-sm font-light">{errorMessage}</p>}
          {googleMessage !== '' && <p className="text-[#5aff54] text-sm font-light">{googleMessage}</p>}
          <button
            type="submit"
            className="w-[200px] bg-200% g-left bg-gradient-to-r from-[#53a717] to-[#88945f] hover:bg-right text-white rounded-md transition-all flex items-center h-[48px] justify-center relative"
          >
            {loading ? (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="text-white opacity-100 font-light font-inter z-[5]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="opacity-70 underline-offset-2 underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </motion.div>
  );
};

export default Register;
