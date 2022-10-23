import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm"


  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage


const TiersPage = () => {
  const [user, token] = useAuth();
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/tiers/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTiers(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchTiers();
  }, [token]);
  return (
    <div className="container">
      <h1>Tiers Page for {user.username}!</h1>
      {tiers &&
        tiers.map((tiers) => (
          <p key={tiers.id}>
            {tiers.tier_name} {tiers.tier_price} {tiers.id}
          </p>
        ))}
    </div>
  );
};

export default TiersPage;