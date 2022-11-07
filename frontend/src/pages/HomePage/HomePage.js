import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useHref, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";







const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  console.log(user);
  const navigate = useNavigate ();
  

  useEffect(() => {
    if(user==null) {
      navigate("/login");
  
    }

 
    const fetchCars = async () => {
      try {
        //user count -------------------------------------------------------------------------------------
        let response_user = await axios.get("http://127.0.0.1:8000/api/user/" , {
        headers: {
        Authorization: "Bearer " + token,
      },
        });
        let isSuperUser=false;
        
  for(let i = 0; i < response_user.data.length; i++) {
    console.log(response_user.data[i]);
    console.log("Super User:" + response_user.data[i].is_superuser)
    console.log("User ID: " + response_user.data[i].username)
    console.log("Auth USer:" + user.id)
    if(response_user.data[i].is_superuser===true && response_user.data[i].username===user.username){
      console.log("You are the super user...");
      isSuperUser=true;
      break;
    }

  }
  if(isSuperUser===true){
    navigate("/adminreport/");

  }
  //------------------------------------------------------------------------------------------------
        
        // let response = await axios.get("http://127.0.0.1:8000/api/HomePage", {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   },
        // });
        //setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars();
  }, [token]);
  return (
    <div className="container">
      <h1>Welcome { user==null? "": user.username}!</h1>
      <Link to="/Subscription">Subscriptions</Link> <br/>
      <Link to="/products">Products</Link><br/>
      <Link to="/tiers">Tiers</Link>
    </div>
  );
};

export default HomePage;

