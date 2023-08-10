import React, { useEffect, useState } from "react";
import { Card, Loader, Edit } from "../components";
import { AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const RenderCards = ({ data, page, title }) => {
  if (data?.length > 0)
    return (
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 mt-5 pb-10">
        {data.map((post, index) => (
          <Card key={post._id} {...post} page={page} index={index} />
        ))}
      </div>
    );
  else
    return (
      <div className="flex w-full h-max justify-center relative">
        <p className="text-[#ffffff79] text-center mt-20 text-xl font-inter font-light">
          {title}
        </p>
      </div>
    );
};

const Current = ({ username, email, userImage, coverImage, _id, google }) => {
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("Posts");
  const [posts, setPosts] = useState(null);
  const [userLikes, setUserLikes] = useState(null);
  const currentUser = { username, email, _id, userImage, google, coverImage };
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/post/${currentUser._id}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setPosts(data.reverse());
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const getLikes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/post/${currentUser._id}/liked`,
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
        >
          <div className="w-full max-w-[85vw] min-h-[100vh] h-full mx-auto z-[5]">
            <div className="w-full h-[350px] flex flex-col justify-center relative object-cover">
              <img
                src={
                  currentUser.coverImage === "" ||
                  currentUser.coverImage === undefined
                    ? "https://www.eslc.org/wp-content/uploads/2019/08/placeholder-grey-square-600x600.jpg"
                    : currentUser.coverImage
                }
                alt=""
                className="object-cover h-full w-full mx-auto rounded-bl-2xl rounded-br-2xl relative select-none"
              />
              <img
                src={currentUser.userImage}
                alt=""
                className="w-[200px] h-[200px] pointer-events-none absolute object-cover -bottom-16 left-[50%] -translate-x-2/4 rounded-full border-4 border-[#080808] z-[3]"
              />
            </div>

            <div className="flex w-max mx-auto relative items-end">
              {currentUser.google == true && (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
                  alt="google user"
                  title="google user"
                  width="28"
                  className=" absolute -left-8 bottom-[5px] select-none"
                />
              )}
              <h2 className="text-white text-4xl font-bold font-inter relative text-center mt-20 z-[5]">
                {username}
              </h2>
              <button
                type="button"
                className="bg-[#fff] p-[5.5px] rounded-full left-2 -top-2 relative"
                onClick={() => setIsModal(true)}
              >
                <AiOutlineEdit className="text-black" />
              </button>
            </div>

            <div className="w-full h-auto relative overflow-hidden">
              <div className="flex items-start w-full h-max justify-between relative">
                <button
                  className="text-white sm:w-[10vw] w-max py-3 text-xl font-inter font-semibold relative top-2 z-[5]"
                  type="button"
                  onClick={() => setContent("Posts")}
                >
                  Posts
                </button>
                <p className="text-[#ffffff8b] text-lg font-light font-inter relative text-center z-[5]">
                  {email}
                </p>
                <button
                  className="text-white sm:w-[10vw] w-max py-3 text-xl font-inter font-semibold relative top-2 z-[5]"
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
                title="You don't have any posts created yet =(."
              />
            ) : (
              <RenderCards
                data={userLikes}
                page="Profile"
                title="You don't like anything yet =(."
              />
            )}
          </div>

          {isModal && <Edit closeModal={setIsModal} {...currentUser} />}
        </motion.div>
      ) : (
        <div className="fixed top-1/2 left-1/2 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg -translate-y-1/2 -translate-x-1/2">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Current;
