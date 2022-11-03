// General Imports
//import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
//import { Chart} from "react-google-charts";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SubscriptionPage from "./pages/SubscriptionPage/SubscriptionPage";
import ProductPage from "./pages/Product/ProductPage";
import AccountDetailPage from "./pages/Account_Detail_Page/AccountDetailPage";
import TiersPage from "./pages/TiersPage/TiersPage";
import AddSubscriptionPage from "./pages/SubscriptionPage/AddSubscriptionPage";
import AdminReportPage from "./pages/Account_Detail_Page/AdminReportPage";
import { Link } from "react-router-dom";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/accountdetail" element={<AccountDetailPage />} />
        <Route path="/tiers" element={<TiersPage />} />
        <Route path="/addsubscription" element={<PrivateRoute><AddSubscriptionPage /></PrivateRoute>} />
        <Route path="/adminreport" element={<AdminReportPage />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
