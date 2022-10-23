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
  account_detail: "",
  products: "",
  subscription: "",
  tiers: "",
  user: "",


}

const SubscriptionPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate ();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues);
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
      <h1>Add a Subscription for {user.username}!</h1>
      <form>
        <label for="skin_care_product">Skin Care Product</label> &nbsp;
        <input type="checkbox" name="skin_care_product" value="skin_care_product" />
        <br />
        <label for="cosmetic_product">Cosmetic Product</label> &nbsp;
        <input type="checkbox" name="cosmetic_product" value="cosmetic_product" />
        <br />
        <label for="fragrance_product">Fragrance Product</label> &nbsp;
        <input type="checkbox" name="fragrance_product" value="fragrance_product" />
        <br />
        <label for="tier">Tier</label> &nbsp;
        <input type="textbox" name="tier" value="" />
        <br />
        <input type="submit" name="submit" value="Submit" />

      </form>

    </div>
  );
};

export default SubscriptionPage;