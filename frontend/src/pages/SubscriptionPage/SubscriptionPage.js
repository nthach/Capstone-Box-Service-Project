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
  const navigate = useNavigate ()
  const [tiers, setTiers] = useState([]);
  // const [userSubscriptions, setUserSubscription]= useState([]);
  const [userSubscriptions, setUserSubscription]= useState([]);
  const [holdIsSuperUser, setholdIsSuperUser]= useState();
  const [isNoRecords, setisNoRecords]= useState(false);

  let isSuperUser=false;
  useEffect(() => {
    if(user==null) {
      navigate("/login");

    }
    const fetchSubscription = async () => {
      try {

//get tier data-----------------------------------------------------------------------------------

  let response_tier = await axios.get("http://127.0.0.1:8000/api/tiers/", {
    headers: {
      Authorization: "Bearer " + token,
    },

  });
//------------------------------------------------------------------------------------------------
      //check for superuser -------------------------------------------------------------------------------------
      let response_user = await axios.get("http://127.0.0.1:8000/api/user/" , {
        headers: {
        Authorization: "Bearer " + token,
      },
        });
        
  for(let i = 0; i < response_user.data.length; i++) {
    if(response_user.data[i].is_superuser===true && response_user.data[i].username===user.username){
   
      isSuperUser=true;

      break;
    }

  }

  setholdIsSuperUser(isSuperUser);

  let response;
  let SubscriptionData



  if(isSuperUser===true){
    response = await axios.get("http://127.0.0.1:8000/api/subscription/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    

    
    if(response.data.length == 0){
      setisNoRecords(true)
    }

    SubscriptionData = response.data;

    console.log(SubscriptionData);   


    let oldUserSubscriptions = userSubscriptions;
    let updateUserSubscriptions;

    for(let i = 0; i < SubscriptionData.length; i++){

      let new_tier_name;
      let new_tier_amount;
     
      for(let t = 0; t < response_tier.data.length; t++) {
        if(t+1 == SubscriptionData[i].tier ){
          new_tier_name = response_tier.data[t].tier_name;
          new_tier_amount = response_tier.data[t].tier_price;
          break;
        }
      }

      updateUserSubscriptions = [
        ...oldUserSubscriptions,{
        id : i,
        user_full_name: SubscriptionData[i].user.first_name + ' ' + SubscriptionData[i].user.last_name,
        skin_care_product :SubscriptionData[i].skin_care_product,
        cosmetic_product : SubscriptionData[i].cosmetic_product,
        fragrance_product : SubscriptionData[i].fragrance_product,
        tier_name : new_tier_name,
        tier_amount : new_tier_amount
       } ]
      
       oldUserSubscriptions = updateUserSubscriptions;
      
      };

      
     
      setUserSubscription(updateUserSubscriptions);
  } else{
    response = await axios.get("http://127.0.0.1:8000/api/subscription/subscription_details/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
       

        
        if(response.data.length == 0){
          setisNoRecords(true)
        }

          SubscriptionData = response.data;

          let oldUserSubscriptions = userSubscriptions;
          let updateUserSubscriptions;
      
          for(let i = 0; i < SubscriptionData.length; i++){

            let new_tier_name;
            let new_tier_amount;
            for(let t = 0; t < response_tier.data.length; t++) {
              if(t+1 == SubscriptionData[i].tier){
                
                new_tier_name = response_tier.data[t].tier_name;
                new_tier_amount = response_tier.data[t].tier_price;
                break;
              }
            }
      
            updateUserSubscriptions = [
              ...oldUserSubscriptions,{
              id : i,
              user_full_name: SubscriptionData[i].user.first_name + ' ' + SubscriptionData[i].user.last_name,
              skin_care_product :SubscriptionData[i].skin_care_product,
              cosmetic_product : SubscriptionData[i].cosmetic_product,
              fragrance_product : SubscriptionData[i].fragrance_product,
              tier_name : new_tier_name,
              tier_amount : new_tier_amount
                                      

             } ]
             oldUserSubscriptions = updateUserSubscriptions;
            
            };
         
         
         

         setUserSubscription(updateUserSubscriptions);

  }



  

  //------------------------------------------------------------------------------------------------
  

      } catch (error) {
        console.log(error);
      }
    };

    fetchSubscription();
  }, [token]);
  return (
    
    <div className="container">
      <h1>Subscription Page for {user==null? "": user.username}!</h1>


      {    holdIsSuperUser == false?
          <span><Link to="/addsubscription">Add New Subscription</Link><br></br></span>
                :
                <span></span>
              
              } 


      
      <div className="Table_Container">
      <div className="Table_Row">

{    holdIsSuperUser == true? <div className="Table_Column">
                  <h4>User Name</h4>
                </div>
                :
                <span></span>
              
              } 

                <div className="Table_Column">
                  <h4>Skin Care</h4>
                </div> 
                <div className="Table_Column">
                <h4>Cosmetics</h4>
                </div>
                <div className="Table_Column">
                  <h4>Frangrance</h4>
                  </div>
                <div className="Table_Column">
                  <h4>Tier</h4>
                </div>
             
                </div>

      {isNoRecords == false ? userSubscriptions.map(userSubscription => { return(
          <div key={userSubscription.id}>
              <div className="Table_Row">
              {    holdIsSuperUser == true? <div className="Table_Column">
                  {userSubscription.user_full_name}
                </div>  :
                <span></span>
              
              } 
                <div className="Table_Column">
                  {userSubscription.skin_care_product}
                </div> 
                <div className="Table_Column">
                {userSubscription.cosmetic_product}
                </div> 
                <div className="Table_Column">
                  {userSubscription.fragrance_product}
                  </div>
                <div className="Table_Column">
                   {userSubscription.tier_name} ${userSubscription.tier_amount}
                </div>
            </div>
          </div>)
}

) : <p>No Records Found</p> }
       </div>
    </div>
  );
};

export default SubscriptionPage;


