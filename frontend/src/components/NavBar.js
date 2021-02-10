import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function logout() {
    // remove the token from localstorage
    localStorage.removeItem("token");
    // clear the user from state
    setUser(null);
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
