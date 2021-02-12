import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignUp({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    image: "",
    bio: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/signup", formData)
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(user);
        history.push("/profile");
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  }

  const { username, image, bio, password } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>

      <label>Username</label>
      <input
        type="text"
        name="username"
        autoComplete="off"
        value={username}
        onChange={handleChange}
      />

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
        alt={username}
      />

      <label>Bio</label>
      <textarea name="bio" value={bio} onChange={handleChange} />

      <label>Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={handleChange}
      />

      {errors.map((error) => (
        <p style={{ color: "red" }} key={error}>
          {error}
        </p>
      ))}
      <input type="submit" value="Signup" />
    </form>
  );
}

export default SignUp;
