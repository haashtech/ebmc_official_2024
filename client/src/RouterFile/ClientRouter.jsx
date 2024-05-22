import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Services from "../pages/Services";
import LatestNews from "../pages/LatestNews";
import Career from "../pages/Career";
import ContactUs from "../pages/ContactUs";
import ErrorPage from "../pages/ErrorPage.jsx";
import Aml from "../pages/Aml_welcome";
import Aml_login from "../pages/Aml_login";
import UserRequireAuth from "../components/UserRequireauth";
import Dashboardaml from "../pages/Aml/Dashboard";
import Profileaml from "../pages/Profileaml";
import Newcheck from "../pages/Aml/Newcheck.jsx";
import Checkhistory from "../pages/Aml/Checkhistory.jsx";
import Notification from "../pages/Aml/Notification.jsx";
import Corporatecheck from "../pages/Aml/Corporatecheck.jsx";
import Individualcheck from "../pages/Aml/Individualcheck.jsx";

function ClientRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/news" element={<LatestNews />} />
      <Route path="/career" element={<Career />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/aml" element={<Aml />} />
      <Route path="/loginaml" element={<Aml_login />} />
      <Route
        path="/dashboardaml"
        element={
          <UserRequireAuth>
            <Dashboardaml />
          </UserRequireAuth>
        }
      />
      <Route
        path="/profileaml"
        element={
          <UserRequireAuth>
            <Profileaml />
          </UserRequireAuth>
        }
      />
      <Route
        path="/newcheckaml"
        element={
          <UserRequireAuth>
            <Newcheck />
          </UserRequireAuth>
        }
      />
      <Route
        path="/checkhistoryaml"
        element={
          <UserRequireAuth>
            <Checkhistory />
          </UserRequireAuth>
        }
      />
      <Route
        path="/notificationaml"
        element={
          <UserRequireAuth>
            <Notification />
          </UserRequireAuth>
        }
      />
      <Route
        path="/individualcheckaml"
        element={
          <UserRequireAuth>
            <Individualcheck />
          </UserRequireAuth>
        }
      />
      <Route
        path="/corporatecheckaml"
        element={
          <UserRequireAuth>
            <Corporatecheck />
          </UserRequireAuth>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default ClientRouter;
