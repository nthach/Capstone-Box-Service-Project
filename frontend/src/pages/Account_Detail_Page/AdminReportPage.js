import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Chart} from "react-google-charts";

  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage



const AdminReportPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate ();
  const [subscription, setSubscription] = useState([]);
  const [account_detail, setAccountDetail] = useState([]);
  const [authentication, setUser] = useState([]);
  const [subscriptionCount, setSubcriptionCount] = useState([]);
  const [skinCare, setSkinCare] = useState([]);
  const [cosmetics, setCosmetics] = useState([]);
  const [fragrance, setfragrance] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState([]);
  const [mostPopular, setAdminReportPage] = useState([]);

  useEffect(() => {
    if(user==null) {
      navigate("/login");

    }
    const fetchSubscription = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/subscription/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        let subCount=0;
        let skinCareCount=0;
        let cosmeticsCount=0;
        let fragranceCount=0;
      
        console.log(response.data)

      for(let i = 0; i < response.data.length; i++) {
        subCount++;
        if(response.data[i].skin_care_product=="yes"){skinCareCount++}
        if(response.data[i].cosmetic_product=="yes"){cosmeticsCount++}
        if(response.data[i].fragrance_product=="yes"){fragranceCount++}
    
      }
      setSubcriptionCount(subCount)
      setSkinCare(skinCareCount)
      setCosmetics(cosmeticsCount)
      setfragrance(fragranceCount)

        //console.log(fetchSubscription)
        //setAdminReportPage([["makeup", "fragrance", "skincare"],...fetchSubscription])

  //user count -------------------------------------------------------------------------------------
  let response_user = await axios.get("http://127.0.0.1:8000/api/user/" , {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
        
  let account=0;
  console.log(response_user.data)
  for(let i = 0; i < response_user.data.length; i++) {
    if(response_user.data[i].is_superuser==false){account++}
    console.log(response_user.data[i].is_superuser)
    //account++;

  }

  setUser(account);
  //------------------------------------------------------------------------------------------------

  //pie chart---------------------------------------------------------------------------------------
  let data = [
    ["Subscription Type", "Count"],
    ["Skin Care", skinCareCount],
    ["Cosmetics", cosmeticsCount],
    ["Fragrance", fragranceCount],
  ];

  setChartData(data)

  let options = {
    title: "Anlytic Chart",
  };

  setChartTitle(options)
  
  //------------------------------------------------------------------------------------------------


         //total_cost -------------------------------------------------------------------------------------
        let response_accountDetail = await axios.get("http://127.0.0.1:8000/api/account_detail/" , {
          headers: {
            Authorization: "Bearer " + token,
          }
        })
        
        let cost=0;
        for(let i = 0; i < response_accountDetail.data.length; i++) {
          cost += response_accountDetail.data[i].total_amount;
        }

        setAccountDetail(cost);
        //------------------------------------------------------------------------------------------------

        setSubscription(response.fetchSubscription);

      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchSubscription();
  }, [token]);
  return (
    <div className="container">
      <h1>Admin Report</h1>
     
      <br/><br/>

Total Monthly Subscriptions: ${account_detail}<br/><br/>
Total Count of Active Accounts: {authentication}<br/><br/>
<Chart
      chartType="PieChart"
      data={chartData}
      options={chartTitle}
      width={"100%"}
      height={"400px"}
    />
    </div>
    
  );
  
};

export default AdminReportPage;