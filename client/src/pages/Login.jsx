import React, { useState, useEffect } from "react";
import { Input, Loader, TileGrid } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../state";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import jwt_decode from 'jwt-decode';
import { motion } from "framer-motion";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('') 

  const loginGoogleSubmit = async () => {
    setLoading(true);
    try {
      const GloggedInResponse = await fetch("http://localhost:8080/auth/Glogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const GloggedIn = await GloggedInResponse.json();
      if (GloggedInResponse.ok) {
        dispatch(
          setLogin({
            user: GloggedIn.user,
            token: GloggedIn.token,
          })
        );
        toast.success('Logged In')
        navigate("/");
      } else {
        setErrorMessage(`User: ${form.username} registered without google auth or not registered at yet.`)
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleAuth(res) {
    const userObj = jwt_decode(res.credential)
    form.username = userObj.given_name,
    form.email = userObj.email,
    form.google = true;
    delete form.password;
    loginGoogleSubmit()
  }


  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "341141979493-ppp7jm8l2lbjofjvtigag8luc4q1gjv4.apps.googleusercontent.com",
      callback: handleGoogleAuth
    });

    google.accounts.id.renderButton(
      document.getElementById("GoogleSignInBtn"),
      { theme: 'outline', size: 'large'}
    );
  }, [])

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedInResponse = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const loggedIn = await loggedInResponse.json();
      if (loggedInResponse.ok) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        toast.success('Logged In')
        navigate("/");
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
          className="w-full max-w-[600px] h-max rounded-3xl flex flex-col items-center justify-center gap-7 relative py-6 z-[5] bg-black"
          onSubmit={handleSubmit}
        >
          <h1 className="font-extrabold text-[#ffffff] text-[32px] z-[5] text-center">
            Login
          </h1>
          <div id="GoogleSignInBtn"></div>
          <div className="flex text-white items-center gap-2">
            <div className="line-1"></div>
            OR
            <div className="line-2"></div>
          </div>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={form.name}
            handleChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.name}
            handleChange={handleChange}
          />
          {errorMessage !== '' && <p className="text-[#ff5454] text-sm font-light">{errorMessage}</p>}
          <button
            type="submit"
            className="w-[200px] bg-200% g-left bg-gradient-to-r from-[#53a717] to-[#88945f] hover:bg-right text-white rounded-md transition-all flex items-center h-[48px] justify-center relative"
          >
            {loading ? (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          <p className="text-white opacity-100 font-light font-inter z-[5]">
            First time using GlobiAI?{" "}
            <Link
              to="/register"
              className="opacity-70 underline-offset-2 underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </motion.div>
  );
};

export default Login;
