import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

let initialValues = {
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: "",
}

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate ();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues,postNewUser);

  
    
       async function postNewUser() {




        try {
          let response = await axios.post("http://127.0.0.1:8000/api/auth/register/", formData, {})

          navigate("/login")
        } catch (error) {
          console.log(error.message);
        }
      }
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <p style={{ fontSize: "12px" }}>
          NOTE: Make this an uncommon password with characters, numbers, and
          special characters!
        </p>
        
        <button>Register</button>
        


      </form>
    </div>
  );
};

export default RegisterPage;
