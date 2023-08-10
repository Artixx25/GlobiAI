import React, { useState, useEffect } from "react";
import { Card, Loader } from "../components";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

const RenderCards = ({ data, page, tiltle }) => {
  if (data?.length > 0)
    return (
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 relative mt-5">
        {data.map((post) => (
          <Card key={post._id} {...post} page={page} />
        ))}
      </div>
    );
  else
    return (
      <div className="flex w-full h-max justify-center relative">
        <p className="text-[#ffffff79] text-center mt-20 text-xl font-inter font-light">
          {tiltle}
        </p>
      </div>
    );
};

const User = ({ username, email, userImage, coverImage, _id, google }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("Posts");
  const [posts, setPosts] = useState(null);
  const [userLikes, setUserLikes] = useState(null);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/post/${_id}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setPosts(data.reverse());
  };

  const getLikes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/post/${_id}/liked`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setUserLikes(data.reverse());
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLikes();
    getPosts();
  }, []);

  return (
    <>
      {!loading ? (
        <motion.div
          initial={{ opacity: 0, display: "none" }}
          animate={{ opacity: 1, display: "block" }}
          exit={{ opacity: 0, transition: { duration: 1 }, display: "none" }}
          className="w-full max-w-[85vw] min-h-[100vh] h-full mx-auto"
        >
          <div className="w-full h-[350px] flex flex-col justify-center relative object-cover">
            <img
              src={
                coverImage === undefined || coverImage === ""
                  ? "https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg"
                  : coverImage
              }
              alt=""
              className="object-cover h-full w-full mx-auto rounded-bl-2xl rounded-br-2xl relative select-none"
            />
            <img
              src={userImage}
              alt=""
              className="w-[200px] h-[200px] pointer-events-none absolute object-cover -bottom-16 left-[50%] -translate-x-2/4 rounded-full border-4 border-[#080808] z-[3]"
            />
          </div>

          <div className="flex w-max mx-auto relative items-end">
            {google && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
                alt="google user"
                title="google user"
                width="28"
                className=" absolute -left-[34px] bottom-[5px] select-none"
              />
            )}
            <h2 className="text-white text-4xl font-bold font-inter relative text-center mt-20">
              {username}
            </h2>
          </div>

          <div className="w-full h-auto relative overflow-hidden">
            <div className="flex items-start w-full h-max justify-between relative">
              <button
                className="text-white w-[10vw] py-3 text-xl font-inter font-semibold"
                type="button"
                onClick={() => setContent("Posts")}
              >
                Posts
              </button>
              <p className="text-[#ffffff8b] text-lg font-light font-inter relative text-center">
                {email}
              </p>
              <button
                className="text-white w-[10vw] py-3  text-xl font-inter font-semibold"
                type="button"
                onClick={() => setContent("Liked")}
              >
                Liked
              </button>
              <div
                className={`active_bottom ${
                  content == "Posts" ? "left" : "right"
                }`}
              ></div>
            </div>
          </div>

          {content === "Posts" ? (
            <RenderCards
              data={posts}
              page="Profile"
              tiltle="This guy doesn't has any posts created yet =(."
            />
          ) : (
            <RenderCards
              data={userLikes}
              page="Profile"
              tiltle="This guy doesn't like anything yet =(."
            />
          )}
        </motion.div>
      ) : (
        <div className="fixed top-1/2 left-1/2 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg -translate-y-1/2 -translate-x-1/2">
          <Loader />
        </div>
      )}
    </>
  );
};

export default User;
