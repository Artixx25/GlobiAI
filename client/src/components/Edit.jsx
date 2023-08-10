import React, {useState} from "react";
import { Input, Loader } from '../components'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import ImageUpload from "./ImageUpload";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";


const Edit = ({closeModal, username, email, userImage, coverImage, _id, google}) => {
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        "username": username,
        "email": email,
        "userImage": userImage,
        "coverImage": coverImage
      });

      const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

      const handleSubmit = async (e) => {
        e.preventDefault();

        if ((form.username !== username || form.email !== email) || (form.coverImage !== '' || form.userImage !== userImage)) {
          setLoading(true)
          try {
            const postsForm = {
              "username": form.username,
              "postUserId": _id,
              "userImage": form.userImage
            }
            const response = await fetch(`http://localhost:8080/users/${_id}/edit`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(form)
            })
            const edited = response.json();
            await edited;
            const responsePosts = await fetch(`http://localhost:8080/api/v1/post/${_id}/edit`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(postsForm)
            })
            const editedPosts = responsePosts.json();
            await editedPosts;
          } catch (e) {
            console.log(e)
          } finally {
            toast.success('Profile was edited')
            setLoading(false)
            closeModal(false)
            window.location.reload()
          }
        } else return;
      }

  return (
    <div className="w-full h-full fixed inset-0 bg-[#0e0e0e84] z-[20] flex items-center justify-center">
      <form className="w-full max-w-[800px] h-auto bg-[#101010ba] rounded-md py-3 px-4 backdrop-blur-xl border border-[#ffffff40] flex flex-col items-center gap-7 animaton_modal" onSubmit={handleSubmit}>
        <h2 className="text-white font-inter font-semibold text-3xl text-center mt-2 pb-2">
          Edit Profile
        </h2>
        <button type="button" className="absolute right-5 w-max h-max top-4" onClick={() => closeModal(false)}><AiOutlineCloseCircle className="text-[#ffffffd1] text-3xl" /></button>
        <div className="w-full flex items-center justify-center flex-col relative">
          <Input type="text" name="username" placeholder="Username" value={form.username} handleChange={handleChange} disabled={google === true ? true : false} />
          {google === true && <p className="text-[#ffffff7d] font-inter font-extralight text-center text-sm mt-1">You can't change username because it's will affect on google auth.</p> }
          <p className="text-[#ffffff7d] font-inter font-extralight text-center text-sm mt-1">If you change username it's will affect on auth username.</p>
        </div>
        <div className="w-full flex items-center justify-center flex-col relative">
          <Input type="email" name="email" placeholder="Email" value={form.email} handleChange={handleChange} disabled={google === true ? true : false} />
          {google === true && <p className="text-[#ffffff7d] font-inter font-extralight text-center text-sm mt-1">You can't change email because it's will affect on google auth.</p> }
        </div>

        <div className="w-[80%] block sm:flex items-center gap-5 justify-between">
          <div className="sm:w-[35%] w-full cursor-pointer relative">
            <ImageUpload value={userImage} disabled={loading} onChange={image => setForm({...form, ["userImage"]: image})} label="Upload profile image" />
          </div>
          <div className="w-full cursor-pointer relative">
            <ImageUpload value={coverImage} disabled={loading} onChange={image => setForm({...form, ["coverImage"]: image})} label="Upload cover image" />
          </div>
        </div>

        <button
          type="submit"
          className="w-[200px] bg-200% g-left bg-gradient-to-r from-[#53a717] to-[#88945f] hover:bg-right text-white rounded-md transition-all flex items-center h-[48px] justify-center relative"
        >
          {loading ? (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
};

export default Edit;
