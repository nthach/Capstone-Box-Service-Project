import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm"



  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage

let body={
  user_id:0,
  total_amount:0.00
  }

let initialValues = {
  skin_care_product: "no",
  cosmetic_product: "no",
  fragrance_product:"no",
  tier:1,
  user: 0,
  total_amount: 0.00
}

const AddSubscriptionPage = () => {
  const [user, token] = useAuth();
  initialValues.user=user.userid;
  const navigate = useNavigate ();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewSubcription)
  const [tiers, setTiers] = useState([]);
  
     async function postNewSubcription() {
      try {
        console.log("Cosmetics: " + FormData.cosmetic_product);
        
        console.log("Skin: " + FormData.skin_care_product);
        
        console.log("Fragrance: " + FormData.fragrance_product);
        
        console.log("Tier: " + FormData.tier);

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

        formData.total_amount=response_tierPrice.data[0].tier_price;
        let response_postAccountDetail = await axios.post("http://127.0.0.1:8000/api/account_detail/addAccountdetail/", formData,{
          headers: {
            Authorization: "Bearer " + token,
            
          }
          
        }
        
        )



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
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Skin Care Product
        <input type="checkbox" name="skin_care_product" value={formData.skin_care_product="Yes"} onChange={handleInputChange}/>
        </label>
        
        <label>Cosmetic Product
          <input type="checkbox" name="cosmetic_product" value={formData.cosmetic_product="Yes"} onChange={handleInputChange}/>
          </label>
        
        <label>Fragrance Product
        <input type="checkbox" name="fragrance_product" value={formData.fragrance_product="Yes"} onChange={handleInputChange}/>
        </label>
      
        <label>Tier
        <input type="radio" name="tier" value={formData.tier="1"} onChange={handleInputChange}/>24.99
        <input type="radio" name="tier" value={formData.tier="2"} onChange={handleInputChange}/>54.99
        <input type="radio" name="tier" value={formData.tier="3"} onChange={handleInputChange}/>84.99
        </label>

        <input type="submit" name="submit" value="Submit" onClick={handleSubmit}/>

      </form>

    </div>
  );
};

export default AddSubscriptionPage;