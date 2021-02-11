import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import client from "../client";

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    client
      .post("/login", formData)
      .then((data) => {
        const { user, token } = data;
        localStorage.setItem("token", token);
        setUser(user);
        history.push("/profile");
      })
      .catch((error) => {
        setErrors(error.errors);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        {errors.map((error) => (
          <p style={{ color: "red" }} key={error}>
            {error}
          </p>
        ))}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
