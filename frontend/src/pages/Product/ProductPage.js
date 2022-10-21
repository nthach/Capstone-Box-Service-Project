import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage


const ProductPage = () => {
  const [user, token] = useAuth();
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/products/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchProduct();
  }, [token]);
  return (
    <div className="container">
      <h1>Product Page for {user.username}!</h1>
      {products &&
        products.map((product) => (
          <p key={product.id}>
            {product.product_name} {product.discription} {product.id}
          </p>
        ))}
    </div>
  );
};

export default ProductPage;