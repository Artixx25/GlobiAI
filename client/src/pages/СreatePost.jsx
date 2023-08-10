import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { preview } from "../assets";
import { getRandomPrompt, downloadImage } from "../utils";
import { FormField, Loader } from "../components";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const createPost = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [form, setForm] = useState({
    prompt: "",
    photo: "",
    postUserId: user._id,
    username: user.username,
    userImage: user.userImage,
    likes: {},
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/posts");
      } catch (e) {
        alert(e);
      } finally {
        toast.success("Post created");
        setLoading(false);
      }
    } else alert("Please enter a prompt and generate an image.");
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <motion.section
      initial={{ opacity: 0, display: "none" }}
      animate={{ opacity: 1, display: "block" }}
      exit={{ opacity: 0, transition: { duration: 1 }, display: "none" }}
      className="max-w-7xl mx-auto relative top-20"
    >
      <div>
        <h1 className="font-extrabold text-[#e9ffe9] text-[32px] text-center">
          Create
        </h1>
        <p className="mt-2 text-[#e7e7e7] text-[14px] max-w-[500px] text-center mx-auto">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form
        className="mt-16 max-w-3xl mx-auto z-10 relative"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-transparent border border-[#ffffff36] text-gray-900 text-sm rounded-lg focus:ring-[#53a717] focus:border-[#53a717] w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <div className="flex gap-2 items-end relative">
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() =>
                    downloadImage(Math.floor(Math.random() * 1000), form.photo)
                  }
                  className="border-[1px] border-white bg-transparent outline-none  w-10 h-10 rounded-lg absolute flex items-center justify-center shadow-md bottom-2 left-2 backdrop-blur-md"
                >
                  <img
                    src="https://icons.veryicon.com/png/o/miscellaneous/icon-pack/download-347.png"
                    alt="download"
                    className="w-7 h-7 object-contain invert"
                  />
                </button>
              </div>
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40 invert"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-black bg-white font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-left bg-gradient-to-r from-[#53a717] to-[#88945f] hover:bg-right font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
      <div className="circle"></div>
    </motion.section>
  );
};

export default createPost;
