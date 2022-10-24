import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm"



  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage


let initialValues = {
  skin_care_product: "no",
  cosmetic_product: "no",
  fragrance_product:"no",
  tier:1,
  user: 0
}

const AddSubscriptionPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate ();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewSubcription)
  const [tiers, setTiers] = useState([]);

  
     async function postNewSubcription() {
      try {
        if (formData.tier>0 && (formData.skin_care_product != 'no'|| formData.cosmetic_product != 'no' || formData.fragrance_product != 'no')) {

        
        let response = await axios.post("http://127.0.0.1:8000/api/subscription/subscription_details/", formData, {
          headers: {
            Authorization: "Bearer " + token,
          }
        })

        let response_tierPrice = await axios.get("http://127.0.0.1:8000/api/tiers/tiers/?tier_id=" + formData.tier, {
          headers: {
            Authorization: "Bearer " + token,
          }
        })
        setTiers(response_tierPrice.data);
      
      }
        //navigate("/Subscription")
      
      } catch (error) {
        console.log(error.message);
      }
    }
  return (
    <div className="container">
      <h1>Add a Subscription for {user.username}!</h1>
      {tiers &&
        tiers.map((tiers) => (
          <p key={tiers.id}>
            {tiers.tier_name} {tiers.tier_price} {tiers.id}
          </p>
        ))}
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Skin Care Product
        <input type="textbox" name="skin_care_product" value={formData.skin_care_product} onChange={handleInputChange}/>
        </label>
        
        <label>Cosmetic Product
          <input type="textbox" name="cosmetic_product" value={formData.cosmetic_product} onChange={handleInputChange}/>
          </label>
        
        <label>Fragrance Product
        <input type="textbox" name="fragrance_product" value={formData.fragrance_product} onChange={handleInputChange}/>
        </label>
      
        <label>Tier
        <input type="textbox" name="tier" value={formData.tier} onChange={handleInputChange}/>
        </label>

        <input type="submit" name="submit" value="Submit" onClick={handleSubmit}/>

      </form>

    </div>
  );
};

export default AddSubscriptionPage;