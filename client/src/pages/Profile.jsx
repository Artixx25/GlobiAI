import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Current from "./Current";
import User from "./User";


const Profile = () => {
  const { id } = useParams();
  const [fetchedUser, setFecthedUser] = useState(null);
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/users/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setFecthedUser(data);
  };


  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!fetchedUser) return null;

  return (
    <>
      {currentUser._id === id ? <Current {...currentUser} /> : <User {...fetchedUser}/>}
    </>
  );
};

export default Profile;
