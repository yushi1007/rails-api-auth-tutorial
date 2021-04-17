import React, { useState } from "react";

function Profile({ user, setUser }) {
  const [formData, setFormData] = useState({
    // pre fill the form with current user info
    image: user.image,
    bio: user.bio,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: update the user's profile
        const token = localStorage.getItem("token");
        fetch("http://localhost:3000/me", {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        })
          .then(r => r.json())
          .then(userProfile => {
            setUser(userProfile);
          });
  }

  const { image, bio } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <h1>{user.username}'s Profile</h1>

      <label>Profile Image</label>
      <input
        type="text"
        name="image"
        autoComplete="off"
        value={image}
        onChange={handleChange}
      />
      <img
        src={
          image.length
            ? image
            : "https://cdn.iconscout.com/icon/free/png-512/account-profile-avatar-man-circle-round-user-30452.png"
        }
        alt={"Username"}
      />

      <label>Bio</label>
      <textarea name="bio" value={bio} onChange={handleChange} />

      <input type="submit" value="Update" />
    </form>
  );
}

export default Profile;
