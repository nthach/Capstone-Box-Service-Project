import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
<link rel="stylesheet" href="style.css"></link>

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const searchInput = document.getElementById("searchInput");
  const namesFromDOM = document.getElementsByClassName("name");
  
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Nikki's Box Subscription</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>

      <div className ="navlinks">
      <Link to="/home">Home</Link> <br/>
        <Link to="/Subscription">Subscriptions</Link> <br/>
        <Link to="/products">Products</Link><br/>
        <Link to="/tiers">Tiers</Link><br/>
        <Link to="/home">About</Link><br/>
        <Link to="/home">Contact</Link>
      </div>

      <div className="search-container">
        <form>
          <div id="search">
            <input id="searchInput" type="text" name="q" placeholder="Search"/>
          </div>
        </form>  
      </div>
    
    </div>  
    
  
  );
};




export default Navbar;
