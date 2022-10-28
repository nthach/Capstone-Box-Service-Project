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



const SubscriptionPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate ();
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/subscription/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setSubscription(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchSubscription();
  }, [token]);
  return (
    <div className="container">
      <h1>Subscription Page for {user.username}!</h1>
      <Link to="/addsubscription">Add Subscription</Link>
      {subscription &&
        subscription.map((subscription) => (
          <p key={subscription.id}>
            {subscription.skin_care_product} {subscription.cosmetic_product} {subscription.fragrance_product} {subscription.tier}
          </p>
        ))}
    </div>
  );
};

export default SubscriptionPage;


