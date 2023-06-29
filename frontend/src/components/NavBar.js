import React from "react";

import { NavLink } from "react-router-dom";

const NavBar = ({ isAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("isAuthenticated : ", isAuthenticated);
    return (
        isAuthenticated ? (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <div >
            <NavLink to="/" className={"nav-link"}>Home</NavLink>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className={"nav-link"} to="/CreateContact">Create Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={"nav-link"} to="/logout">LogOut</NavLink>
          </li>


          <li className="nav-item">
            <NavLink className={"nav-link"} to={`/profile/${user.id}`}>Profile</NavLink>
          </li>
        </ul>
        </div>
      </nav>
      
        ) : (
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={"nav-link"} to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={"nav-link"} to="/register">Register</NavLink>
            </li>
          </ul>
          </nav>
          
        )
    )
}

export default NavBar;
