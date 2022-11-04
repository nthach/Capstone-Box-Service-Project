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
  let [radioOption, handleOptionChange] = useState(0)
  let [checkboxSkin, handleSkinCareChange] = useState("no");
  let [checkboxCosmetics, handleCosmeticsChange] = useState("no");
  let [checkboxFragrance, handleFragranceChange] = useState("no");
  const [tiers, setTiers] = useState([]);
    

     async function postNewSubcription() {
      try {

        formData.tier = radioOption;
        formData.skin_care_product = checkboxSkin;
        formData.cosmetic_product = checkboxCosmetics;
        formData.fragrance_product = checkboxFragrance;

        console.log("Cosmetics: " + formData.cosmetic_product);
        
        console.log("Skin: " + formData.skin_care_product);
        
        console.log("Fragrance: " + formData.fragrance_product);
        
        console.log("Tier: " + formData.tier);

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
        navigate("/NewSubscription?Cosmetics=" + formData.cosmetic_product +"&SkinCare=" + formData.skin_care_product + "&Fragrance=" + formData.fragrance_product + "&Tier=" + formData.tier)
      
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
        <input type="checkbox" name="skin_care_product" value={formData.skin_care_product} onClick={()=>handleSkinCareChange(checkboxSkin= checkboxSkin=="no"? "yes": "no")}/>
        </label>
        
        <label>Cosmetic Product
          <input type="checkbox" name="cosmetic_product" value={formData.cosmetic_product} onClick={()=>handleCosmeticsChange(checkboxCosmetics= checkboxCosmetics=="no"? "yes": "no")}/>
          </label>
        
        <label>Fragrance Product
        <input type="checkbox" name="fragrance_product" value={formData.fragrance_product} onClick={()=>handleFragranceChange(checkboxFragrance= checkboxFragrance=="no"? "yes": "no")}/>
        </label>
      
        <label>Tier
        <input type="radio" name="tier" value="1" onClick={() => handleOptionChange(radioOption = 1)}/>24.99
        <input type="radio" name="tier" value="2"  onClick={() => handleOptionChange(radioOption = 2)}/>54.99
        <input type="radio" name="tier" value="3"  onClick={() => handleOptionChange(radioOption = 3)}/>84.99
        </label>

        <input type="submit" name="submit" value="Submit" onClick={handleSubmit}/>

      </form>

    </div>
  );
};

export default AddSubscriptionPage;