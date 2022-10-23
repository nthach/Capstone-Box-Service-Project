import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm"


  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage


const Account_Detail_Page = () => {
  const [user, token] = useAuth();
  const [account_detail, setAccount_Detail] = useState([]);

  useEffect(() => {
    const fetchAccount_Detail = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/account_detail/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setAccount_Detail(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchAccount_Detail();
  }, [token]);
  return (
    <div className="container">
      <h1>Account Detail Page for {user.username}!</h1>
      {account_detail &&
        account_detail.map((account_detail) => (
          <p key={account_detail.id}>
            {account_detail.user.username} {account_detail.total_amount}
          </p>
        ))}
    </div>
  );
};

export default Account_Detail_Page;