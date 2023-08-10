import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FiLogOut } from 'react-icons/fi'
import { useDispatch } from "react-redux";
import { setLogout, setUser } from "../state";

const ProfileWidget = ({ userId }) => {
  const [fetchedUser, setFetchedUser] = useState(null);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setFetchedUser(data);
    dispatch(setUser({user: data}))
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!fetchedUser) return null;

  return (
    <div className='w-max h-full flex items-center gap-2'>
      <Link to={`/profile/${userId}`} className='block w-max h-full'>
        <img src={fetchedUser.userImage} alt="logout" className='w-10 h-10 pointer-events-none object-cover rounded-full' />
      </Link>
      <div className='w-max items-center hidden sm:block'>
        <h2 className='text-white font-semibold font-inter'>{fetchedUser.username}</h2>
        <p className='text-[#ffffff72] font-light font-inter text-xs'>{fetchedUser.email}</p>
      </div>

      <button type='button' className='w-max h-full block relative ml-2' onClick={() => dispatch(setLogout())}>
        <FiLogOut className='text-white'/>
      </button>

    </div>
  )
}

export default ProfileWidget