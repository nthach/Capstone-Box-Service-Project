import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm"
import { Link } from "react-router-dom";



  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage



const NewSubscriptionPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate ();
  const [subscription, setSubscription] = useState([]);
  let [Tier, setTier] = useState([])
  let [SkinCare, setSkinCare] = useState([]);
  let [Cosmetics, setCosmetics] = useState([]);
  let [Fragrance, setFragrance] = useState([]);

  useEffect(() => {
    function GetURLParameter()
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
      console.log(sURLVariables[i]);
      console.log(sURLVariables[i].indexOf("SkinCare")!=-1);
       if(sURLVariables[i].indexOf("SkinCare")!=-1){
        setSkinCare(sURLVariables[i].split('=')[1]);

       }
       if(sURLVariables[i].indexOf("Cosmetics")!=-1){
        setCosmetics(sURLVariables[i].split('=')[1]);
       }   
       if(sURLVariables[i].indexOf("Fragrance")!=-1){
        setFragrance(sURLVariables[i].split('=')[1]);
       }
       if(sURLVariables[i].indexOf("Tier")!=-1){
        setTier(sURLVariables[i].split('=')[1]);
       }      


    }
};

GetURLParameter();

  }, [token]);
  return (
    <div className="container">
      <h1>Thank You for Subcribing!</h1>
      <Link to="/addsubscription">Add New Subscription</Link><br></br>
      skinCare: {SkinCare}<br/>
      cosmetics: {Cosmetics}<br/>
      fragrance: {Fragrance}<br/>
      tier: {Tier}<br/>

      <Link to="/subscription">View All Subscriptions</Link>
    </div>
  );
};

export default NewSubscriptionPage;


