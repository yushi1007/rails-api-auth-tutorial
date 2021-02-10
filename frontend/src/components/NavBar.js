import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user }) {
  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button>Logout</button>
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
