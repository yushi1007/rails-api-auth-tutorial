import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function responseGoogle(response) {
    if (response.tokenId) {
      axios
        .post("/login/google", null, {
          headers: {
            Authorization: `Bearer ${response.tokenId}`,
          },
        })
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
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/login", formData)
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
      <hr />
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Login;
