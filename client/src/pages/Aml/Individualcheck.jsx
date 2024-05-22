import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import authStore from "../../store/user/authStore";
import Loader from "../../components/Loader";
import Printbutton from "./Printbutton";
import handlePrint from "./Printbutton";

import { useSidebar } from "../../ContextApi/SidebarContext";
import { useRef } from "react";

function Individualcheck() {

  const [isButtonExpanded, setIsButtonExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsButtonExpanded(!isButtonExpanded);
  };

  const PrintNosanction = () => {
    window.print();
  };

  const printRef = useRef();

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  function closeSidebar() {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const store = authStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await store.logout();
      // console.log("User logged out successfully");
      navigate("/loginaml");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      console.log("fetch data clicked");
      setLoading(true);
      const apiUrl = `/user/viewIndividualresult`;
      const webhookUrl = `/user/webhook/zignsec`;

      const dobValue = formData.tab2.dob || formData.tab2.yob;

      const requestBody = {
        metadata: {
          Type: "individual",
          address: "string",
          blank_address: "Ignore",
          close_match_rate_threshold: formData.tab2.matchrate,
          dob: dobValue,
          exclude_deceased_persons: "No",
          first_name: formData.tab1.firstName,
          full_name: formData.tab1.fullName,
          gender: formData.tab2.gender,
          include_result_entities: "Yes",
          include_web_search: "No",
          last_name: formData.tab1.lastName,
          match_type: "Close",
          middle_name: formData.tab1.middleName,
          pep_jurisdiction: "Apply",
          residence: "Ignore",
          update_monitoring_list: "Yes",
          whitelist: "Ignore",
        },

        webhook: webhookUrl,
      };

      Object.keys(requestBody.metadata).forEach((key) => {
        if (!requestBody.metadata[key]) {
          delete requestBody.metadata[key];
        }
      });

      // console.log("Request Payload:", JSON.stringify(requestBody, null, 2));

      const response = await axios.post(apiUrl, requestBody);
      // console.log("Server Response Data:", response.data);
      setResult(response.data);
      setError(null);

      // console.log(response.data);
      setLoading(false);
      handleNextTab();
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setError("Check limit exceeded . please try again later");
      } else {
        setError("Error fetching  data. Please try again later.");
      }

      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    tab1: { firstName: "", middleName: "", lastName: "", fullName: "" },
    tab2: {
      dob: "",
      yob: "",
      gender: "",
      matchTypeInput: "close",
      matchrate: 80,
      resultEntity: "yes",
    },
    tab3: { label: "", comment: "", relayState: "", webhook: "" },
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (tab, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [tab]: {
        ...prevData[tab],
        [key]: value,
      },
    }));
  };

  const handleNextTab = () => {
    const { firstName, lastName, fullName } = formData.tab1;

    // Check if either fullName is empty or both firstName and lastName are empty
    if (
      (!fullName && (!firstName || !lastName)) ||
      (!fullName && !firstName && !lastName)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          "Please fill in either both First Name and Last Name, or Full Name to proceed.",
      });
      // Here, the function will exit if the required fields aren't filled,
      // thus preventing the user from proceeding to the next tab.
    } else {
      // If validation passes, move to the next tab
      setActiveTab(activeTab + 1);
    }
  };

  const handlePreviousTab = () => {
    // Move to the previous tab
    setActiveTab(activeTab - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    // console.log("Form Data:", formData);
  };

  return (
    <div className="main_container">
      <div className="container-fluid">
        <div className="row vh-100" style={{ position: "relative" }}>
          {/* mobile_header */}
          <div
            className="mobile-header mobile-header-4 d-block d-lg-none homepagesmall"
            style={{
              backgroundColor: "rgba(237, 237, 237, 0.978)",
              backdropFilter: "blur(10px)",
              position: "relative",
            }}
          >
            <div className="container-fluid">
              <div className="col-12">
                <div className="mobile-header-elements">
                  <div className="mobile-logo">
                    <a href="index.html">
                      <img
                        className="img-fluid p-1"
                        style={{ height: "56px", width: "160px" }}
                        src="assets/images/logo/white_bglogo.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div
                    style={{ borderColor: "black", cursor: "pointer" }}
                    className="mobile-nav-icon dots-menu"
                    onClick={toggleSidebar}
                  >
                    <i
                      style={{ color: "black" }}
                      className="fa-solid fa-bars"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mobile-sidebar pt-3 px-0 vh-100  ${
              isSidebarOpen ? "mobile-menu-active" : ""
            }`}
          >
            <div className="logoicons-area px-4">
              <div className="logos">
                <img
                  className="img-fluid p-1"
                  style={{ height: 56 }}
                  src="/asset/images/logo/pnglogo-02-01.png"
                  alt=""
                />
              </div>
              <div onClick={closeSidebar}>
                <i className="fa-solid fa-xmark" />
              </div>
            </div>
            <div className="nav flex-column mt-5 pt-5 nav-pills btn_sidebar">
              <hr className="m-0" />
              <Link to="/dashboardaml" className="m-0">
                <button
                  className="meeem nav-link align-items-center d-flex py-4 pe-0 m-0 menu-close5"
                  style={{
                    color: "var(--orange)",
                    backgroundColor: "#3c3c3c",
                    width: "100%",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i className="pe-3 fa-solid fa-dashboard" />
                    Dashboard
                  </div>
                </button>
              </Link>
              <hr className="m-0" />
              <Link to="/profileaml" onClick={closeSidebar} className="m-0">
                <button
                  className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                  style={{ width: "100%" }}
                >
                  <div className="d-flex align-items-center">
                    <i className="pe-3 fa-solid fa-user" />
                    Profile
                  </div>
                </button>
              </Link>
              <hr className="m-0" />
              <Link to="/newcheckaml" onClick={closeSidebar} className="m-0">
                <button
                  className="btnremove menu-close1 nav-link align-items-center d-flex py-4 pe-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  style={{ width: "100%", color: "white" }}
                >
                  <div className="d-flex align-items-center">
                    <i className="pe-3 fa-solid fa-plus" />
                    New Check
                  </div>
                </button>
              </Link>
              <hr className="m-0" />
              <Link
                to="/checkhistoryaml"
                onClick={closeSidebar}
                className="m-0"
              >
                <button
                  className="meeem menu-close2 nav-link align-items-center d-flex py-4 pe-0"
                  style={{ width: "100%" }}
                >
                  <div className="d-flex align-items-center">
                    <i className="pe-3 fa-solid fa-history" />
                    Check History
                  </div>
                </button>
              </Link>
              <hr className="m-0" />
              <Link
                to="/notificationaml"
                onClick={closeSidebar}
                className="m-0"
              >
                <button
                  className="meeem menu-close3 nav-link align-items-center d-flex py-4 pe-0"
                  style={{ width: "100%" }}
                >
                  <div className="d-flex align-items-center">
                    <i className="pe-3 fa-solid fa-bell" />
                    Notifications
                  </div>
                </button>
              </Link>
              <hr className="m-0" />
            </div>
            <div
              className="col logout p-4"
              id="logout"
              style={{ paddingTop: 40 }}
            >
              <button class="btn btn-primary" onClick={handleLogout}>
                {/* <img src="/asset/images/icons/logout_icon.svg" alt="" /> */}
                Logout
              </button>
            </div>
          </div>
          {/* sidebar_start */}
          <div
            style={{ position: "relative" }}
            className="col-sm-2 bg1 p-0 container-fluid overflow-hidden sidebarmain"
          >
            <div className="row m-0">
              <div className="py-5 m-0 d-flex justify-content-center align-items-start logo_section1">
                <img
                  style={{ height: 140 }}
                  src="https://haashtech.github.io/etihadAMLfrontend/Echeck%20Final%20Logo-01.svg"
                  alt=""
                />
              </div>
              <div className="logo_section2 pe-0 container-fluid p-0">
                <div className="row m-0">
                  <div className="p-0 m-0">
                    <div className="text-white py-4">
                      <div
                        style={{ width: "100%" }}
                        className="d-flex align-items-start"
                      >
                        <div
                          style={{ width: "100%", boxSizing: "border-box" }}
                          className="nav flex-column nav-pills btn_sidebar"
                          id="v-pills-tab1"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <hr className="m-0" />

                          <Link to="/dashboardaml">
                            <button
                              className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                              id="v-pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-profile"
                              type="button"
                              role="tab"
                              aria-controls="v-pills-profile"
                              aria-selected="false"
                              style={{ width: "100%" }}
                            >
                              <div
                                id="btn_profile_tab "
                                style={{ color: "black" }}
                              >
                                <iconify-icon
                                  className="pe-3"
                                  icon="radix-icons:dashboard"
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  Dashboard
                                </span>
                              </div>
                            </button>
                          </Link>

                          <hr className="m-0" />
                          <Link to="/profileaml">
                            <button
                              className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                              id="v-pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-profile"
                              type="button"
                              role="tab"
                              aria-controls="v-pills-profile"
                              aria-selected="false"
                              style={{ width: "100%" }}
                            >
                              <div
                                id="btn_profile_tab "
                                style={{ color: "black" }}
                              >
                                <iconify-icon
                                  className="pe-3"
                                  icon="healthicons:ui-user-profile"
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  Profile
                                </span>
                              </div>
                            </button>
                          </Link>
                          <hr className="m-0" />
                          <Link to="/newcheckaml">
                            <button
                              className="btnremove menu-close1 nav-link align-items-center d-flex py-4 pe-0"
                              title="Choose Your action"
                              data-bs-html="true"
                              data-bs-content="
                           <a href='newcheck_individual.html' class='btn btn-success'>individual</a>
                            <a href='newcheck_corporate.html' class='btn btn-danger'>corporate</a>
                             "
                              id="newcheck_sidebar"
                              data-bs-toggle="tooltip"
                              data-bs-placement="right"
                              style={{ width: "100%", color: "white" }}
                            >
                              <div
                                type="button"
                                role="tab"
                                aria-controls="v-pills-profile"
                                aria-selected="false"
                                className="d-flex align-items-center"
                                style={{
                                  textDecoration: "none",
                                  fontWeight: 500,
                                  color: "black",
                                }}
                              >
                                <iconify-icon
                                  className="pe-3"
                                  icon="ic:round-plus"
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  New Check
                                </span>
                              </div>
                            </button>
                          </Link>
                          <hr className="m-0" />
                          <Link to="/checkhistoryaml">
                            <button
                              className="meeem menu-close2 nav-link align-items-center d-flex py-4 pe-0"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-checkHistory"
                              type="button"
                              role="tab"
                              aria-controls="v-pills-profile"
                              aria-selected="false"
                              id="v-pills-home-tab"
                              style={{ width: "100%", color: "black" }}
                            >
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  textDecoration: "none",
                                  fontWeight: 500,
                                }}
                                href="#"
                              >
                                <iconify-icon
                                  className="pe-3"
                                  icon="material-symbols:history-rounded"
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  Check History
                                </span>
                              </div>
                            </button>
                          </Link>
                          <hr className="m-0" />
                          <Link to="/notificationaml">
                            <button
                              className="meeem menu-close3 nav-link align-items-center d-flex py-4 pe-0"
                              data-bs-toggle="pill"
                              data-bs-target="#v-pills-notifications"
                              type="button"
                              role="tab"
                              aria-controls="v-pills-profile"
                              aria-selected="false"
                              id="v-pills-home-tab"
                              style={{ width: "100%", color: "black" }}
                            >
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  textDecoration: "none",
                                  fontWeight: 500,
                                }}
                                href="#"
                              >
                                <iconify-icon
                                  className="pe-3"
                                  icon="mi:notification"
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  Notifications
                                </span>
                              </div>
                            </button>
                          </Link>
                          <hr className="m-0" />
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "20px",
                          }}
                        >
                          <button
                            style={{
                              padding: "10px",
                              backgroundColor: "#3498db", // Add your desired background color
                              color: "#ffffff", // Add your desired text color
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",

                              // Add a subtle box shadow
                            }}
                            onClick={handleLogout}
                          >
                            <img
                              src="/asset/images/icons/logout_icon.svg"
                              alt=""
                            />
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* sidebar_end */}
          <div
            className="col-sm-10 bg2 container-fluid"
            style={{ position: "relative" }}
          >
            <div className="row">
              {/* header */}
              <div
                className="col-12 bg2_1 container-fluid backhomeheader"
                style={{ height: "10vh" }}
              >
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-between px-3 py-3">
                    <Link to="/dashboardaml">
                      <div
                        style={{
                          textDecoration: "none",
                          color: "var(--black)",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 600,
                        }}
                      >
                        <iconify-icon icon="iconamoon:arrow-left-2" />
                        Back to home
                      </div>
                    </Link>

                    <div className="d-flex align-items-center">
                      <h4 className="pe-2 m-0">
                        <b>{store.user?.companyName}</b>
                      </h4>
                      <span />
                      <i class="fa-solid fa-fingerprint"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-content d-flex align-items-end pb-3"
                id="v-pills-tabContent"
                style={{ height: "60vh" }}
              >
                <div
                  className="myList container-fluid p-2 pb-0"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                  tabIndex={0}
                  style={{ width: "100%", height: "100%" }}
                >
                  <section className="row p-0">
                    <div className="container p-0">
                      <form
                        className="card card-wizard"
                        style={{ width: "auto", position: "relative" }}
                      >
                        {!result && (
                          <div
                            className="card-header"
                            id="card-header"
                            style={{ backgroundColor: "var(--capsule)" }}
                          >
                            <nav className="nav nav-pills nav-fill">
                              <div
                                // onClick={() => handleTabChange(1)}
                                className={`nav-link tab-pills ${
                                  activeTab === 1 ? "active" : ""
                                }`}
                              >
                                <span className="me-2 wizard_number"></span>
                                <b>Provide target name</b>
                              </div>
                              <Link
                                // onClick={() => handleTabChange(2)}
                                className={`nav-link tab-pills ${
                                  activeTab === 2 ? "active" : ""
                                }`}
                              >
                                <span className="me-2 wizard_number"></span>
                                <b>Provide target data</b>
                              </Link>
                              <Link
                                // onClick={() => handleTabChange(3)}
                                className={`nav-link tab-pills ${
                                  activeTab === 3 ? "active" : ""
                                }`}
                              >
                                <span className="me-2 wizard_number"></span>
                                <b>Additional session data</b>
                              </Link>
                              <Link
                                // onClick={() => handleTabChange(4)}
                                className={`nav-link tab-pills ${
                                  activeTab === 4 ? "active" : ""
                                }`}
                              >
                                <span className="me-2 wizard_number"></span>
                                <b>Review and confirm</b>
                              </Link>
                            </nav>
                          </div>
                        )}
                        <div
                          className="card-body"
                          style={{
                            backgroundColor: "var(--gray)",
                            zIndex: 0,
                            overflow: "auto",
                            position: "relative",
                          }}
                        >
                          {activeTab === 1 && (
                            <div>
                              <div className="input_padd">
                                <div className="mb-3 mt-lg-3 mt-sm-0">
                                  <input
                                    type="text"
                                    value={formData.tab1.firstName}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab1",
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    placeholder="First Name (Required)"
                                  />
                                </div>
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    value={formData.tab1.middleName}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab1",
                                        "middleName",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    id="email"
                                    placeholder="Middle Name "
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={formData.tab1.lastName}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab1",
                                        "lastName",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    id="email"
                                    placeholder="Last Name (Required)"
                                  />
                                </div>
                                <div className="OR text-center py-3">
                                  <b>OR</b>
                                </div>
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    value={formData.tab1.fullName}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab1",
                                        "fullName",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    name="email"
                                    placeholder="Full Name (Required) "
                                  />
                                </div>
                                <div></div>
                              </div>
                            </div>
                          )}

                          {activeTab === 2 && (
                            <div id="tab-2">
                              <div
                                id="individualContent1"
                                style={{
                                  height: "50vh",
                                  overflowY: "scroll",
                                  overflowX: "hidden",
                                }}
                              >
                                <div className="row pt-lg-3 pt-sm-0">
                                  <div className="mb-3 col-md-5">
                                    <div className="col">
                                      <div
                                        className="input-group date dob"
                                        id="datepicker1"
                                      >
                                        <div className="input-group-prepend">
                                          <span
                                            style={{
                                              borderRight: "none",
                                              backgroundColor: "white",
                                            }}
                                            className="input-group-text p-lg-4 pe-lg-0 dob_span"
                                          >
                                            <img
                                              src="/asset/images/icons/calender.svg"
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                        <input
                                          style={{
                                            borderLeft: "none",
                                            boxShadow: "none",
                                          }}
                                          type="text"
                                          value={formData.tab2.dob}
                                          onChange={(e) =>
                                            handleInputChange(
                                              "tab2",
                                              "dob",
                                              e.target.value
                                            )
                                          }
                                          className="form-control p-lg-3 p-sm-2 ps-lg-2 dob_input"
                                          id="date"
                                          placeholder="Date of birth(mm/dd/yyyy)"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="col-md-2 d-flex justify-content-center align-items-center pb-3 or_area"
                                    style={{ fontWeight: 600 }}
                                  >
                                    OR
                                  </div>
                                  <div className="mb-3 col-md-5">
                                    <form className="row">
                                      <div className="col">
                                        <div
                                          className="input-group date dob"
                                          id="datepicker2"
                                        >
                                          <div className="input-group-prepend">
                                            <span
                                              style={{
                                                borderRight: "none",
                                                backgroundColor: "white",
                                              }}
                                              className="input-group-text p-lg-4 pe-lg-0 dob_span"
                                            >
                                              <img
                                                src="/asset/images/icons/calender.svg"
                                                alt=""
                                              />
                                            </span>
                                          </div>
                                          <input
                                            style={{
                                              borderLeft: "none",
                                              boxShadow: "none",
                                            }}
                                            type="text"
                                            value={formData.tab2.yob}
                                            onChange={(e) =>
                                              handleInputChange(
                                                "tab2",
                                                "yob",
                                                e.target.value
                                              )
                                            }
                                            className="form-control p-lg-3 p-sm-2 ps-lg-2 dob_input"
                                            id="date"
                                            placeholder="Year of birth(yyyy)"
                                          />
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <select
                                    className="form-select p-lg-3 p-sm-2"
                                    name="gender"
                                    id="gender"
                                    required=""
                                    value={formData.tab2.gender}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab2",
                                        "gender",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="" disabled>
                                      Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>
                                <div className="d-flex py-lg-3 py-sm-0">
                                  <div className="form-check p-0">
                                    <input
                                      className="form-check-input1"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault1"
                                      checked={
                                        formData.tab2.matchTypeInput === "exact"
                                      }
                                      onChange={() => {
                                        handleInputChange(
                                          "tab2",
                                          "matchTypeInput",
                                          "exact"
                                        );
                                        handleInputChange(
                                          "tab2",
                                          "matchrate",
                                          100
                                        ); // Set match rate to 100 for exact match
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault1"
                                    >
                                      Exact match
                                    </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <input
                                      className="form-check-input1"
                                      type="radio"
                                      name="flexRadioDefault"
                                      id="flexRadioDefault2"
                                      checked={
                                        formData.tab2.matchTypeInput === "close"
                                      }
                                      onChange={() => {
                                        handleInputChange(
                                          "tab2",
                                          "matchTypeInput",
                                          "close"
                                        );
                                        handleInputChange(
                                          "tab2",
                                          "matchrate",
                                          70
                                        ); // Set match rate to 70 for close match
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexRadioDefault2"
                                    >
                                      Close match
                                    </label>
                                  </div>
                                </div>

                                <div className="py-3">
                                  <span
                                    className="matchrate"
                                    style={{ fontWeight: 600 }}
                                  >
                                    Match rate :
                                  </span>
                                  <output id="outputaa">
                                    {formData.tab2.matchrate}
                                  </output>
                                  <input
                                    style={{ width: "100%" }}
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={formData.tab2.matchrate}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab2",
                                        "matchrate",
                                        e.target.value
                                      )
                                    }
                                    name="progress_value[]"
                                    data-rangeslider=""
                                    disabled={
                                      formData.tab2.matchTypeInput === "exact"
                                    } // Disable input for exact match
                                  />
                                  <p style={{ fontWeight: 300 }}>
                                    Indicates how closely the name being checked
                                    matches the name on the matching watchlist
                                    profile, with 1 being not close and 100
                                    being very close
                                  </p>
                                </div>

                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    style={{ borderRadius: 50 }}
                                    type="checkbox"
                                    value={formData.tab2.resultEntity}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab2",
                                        "resultEntity",
                                        e.target.checked
                                      )
                                    }
                                    id="flexSwitchCheckDefault2t_padd"
                                    required=""
                                    defaultChecked="true"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexSwitchCheckDefault2"
                                  >
                                    Include result entities
                                  </label>
                                  <div className="form-text">
                                    Include full profile information of all
                                    matched entities. Default: Yes
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === 3 && (
                            <div id="tab-3">
                              <div id="individualContent2">
                                <div className="mb-3 mt-lg-3 mt-sm-0">
                                  {/* <label for="name" class="form-label">Address 1</label> */}
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    value={formData.tab3.label}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab3",
                                        "label",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Label (optional) e.g.John Doe, ..."
                                  />
                                </div>
                                <div className="mb-3">
                                  <textarea
                                    className="form-control p-lg-3 p-sm-2"
                                    name="company_address"
                                    id="company_address"
                                    value={formData.tab3.comment}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab3",
                                        "comment",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Comment"
                                    defaultValue={""}
                                  />
                                </div>
                                <hr className="my-4" />
                                {/* <div
                                  className="advanced-options-container"
                                  style={{ width: "100%" }}
                                  >
                                  <input
                                    style={{ width: "100%", outline: "none" }}
                                    type="text"
                                    value={formData.tab3.relayState}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab3",
                                        "relayState",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Relay state (optional)"
                                  />
                                </div> */}
                                {/* <div
                                  className="advanced-options-container"
                                  style={{ width: "100%" }}
                                  >
                                  <input
                                    style={{ width: "100%", outline: "none" }}
                                    type="text"
                                    value={formData.tab3.webhook}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab3",
                                        "webhook",
                                        e.target.value
                                      )
                                    }
                                    id="advancedOptionsInput"
                                    placeholder="Webhook target URL (optional)"
                                  />
                                </div> */}
                              </div>
                            </div>
                          )}
                          {loading && <Loader />}

                          {activeTab === 4 && (
                            <div id="tab-4" className="">
                              <div
                                id="individualContent3"
                                style={{
                                  height: "50vh",
                                  overflowY: "scroll",
                                  overflowX: "hidden",
                                }}
                              >
                                <div className="mb-3 mt-lg-3 mt-sm-0">
                                  <form className="form_reviwConfirm">
                                    <div className="form-group row">
                                      <label
                                        htmlFor="firstName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        First Name
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{" "}
                                          {formData.tab1.firstName || "(empty)"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Last Name
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{formData.tab1.lastName || "(empty)"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Middle Name
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :
                                          {formData.tab1.middleName ||
                                            "(empty)"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Full Name
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{formData.tab1.fullName || "(empty)"}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Date of Birth
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{formData.tab2.dob || "(empty)"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Gender
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{formData.tab2.gender || "(empty)"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Match type
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :
                                          {formData.tab2.matchTypeInput ||
                                            "(empty)"}
                                        </span>
                                      </div>

                                      {/* Additional input and onChange function */}
                                    </div>
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Match rate
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :
                                          {formData.tab2.matchrate || "(empty)"}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="form-group row">
                                      <label
                                        htmlFor="includeResultEntities"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Include result entities
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{formData.tab2.resultEntity}
                                        </span>
                                        {/* {console.log(
                                          "formData.tab2.resultEntity:",
                                          formData.tab2.resultEntity
                                        )} */}
                                      </div>
                                    </div>

                                    <div className="form-group row">
                                      <label
                                        htmlFor="comment"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Comment
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{formData.tab3.comment || "(empty)"}
                                        </span>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          )}

                          <div
                            style={{
                              paddingBottom: "50px",
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: "20px",
                            }}
                          >
                            {result && result.data && result.data.id && (
                              <React.Fragment>
                                <h4>Id: {result.data.id}</h4>
                                <div
                                  style={{
                                    position: "sticky",
                                    top: "0",
                                    zIndex: "100",
                                    background: "#ffffff",
                                  }}
                                >
                                  {/* <Printbutton /> */}
                                </div>
                              </React.Fragment>
                            )}
                          </div>
                          <div>
                            {result &&
                            result.data &&
                            result.data.result &&
                            result.data.result.matchedEntities === null ? (
                              <div style={{ marginLeft: "130px", marginTop: "80px" }}>
                <div>
                  <div>
                    <img
                      className="img-fluid p-1"
                      style={{ height: "58px", width: "160px" }}
                      src="assets/images/logo/pnglogo-02-01 1.png"
                      alt=""
                    />
                    <span>
                      <img
                        className="img-fluid p-1"
                        style={{
                          height: "50px",
                          width: "150px",
                          marginLeft: "70%",
                        }}
                        src="assets/images/logo/powered by zain sec.png"
                        alt=""
                      />
                    </span>
                    <div style={{ paddingBottom: "20px" }}>
                      <b style={{ marginLeft: "32%", fontSize: "25px" }}>
                        Individual PEP sanction screening report
                      </b>
                    </div>
                  </div>
                </div>
                <h4 style={{ marginBottom: "50px" }}>
                  No match found for PEP and Sanctions.
                </h4>
                <button
                  type="button"
                  class="btn btn-dark"
                  onClick={() => PrintNosanction()}
                >
                  Print Report
                </button>
              </div>
                            ) : null}
                          </div>

                          <div
                            ref={printRef}
                            style={{
                              height:
                                result &&
                                result.data &&
                                result.data.result &&
                                result.data.result.matchedEntities != null
                                  ? "100vh"
                                  : ".8vh",
                              overflow: "auto",
                            }}
                          >
                            {result &&
                            result.data &&
                            result.data.result &&
                            result.data.result.matchedEntities != null ? (
                              result.data.result.matchedEntities.map(
                                (entity, index) => (
                                  <div key={index}
                    id={`print-section-${index}`}
                    >
                      <div>
                      {isButtonExpanded && <div>
                        <img
                          className="img-fluid p-1"
                          style={{ height: "58px", width: "160px" }}
                          src="assets/images/logo/pnglogo-02-01 1.png"
                          alt=""
                        />
                        <span >
                          <img
                            className="img-fluid p-1"
                            style={{ height: "50px", width: "150px", marginLeft:'70%' }}
                            src="assets/images/logo/powered by zain sec.png"
                            alt=""
                          />
                        </span>
                      <div style={{ paddingBottom:'20px'}}>
                      <b style={{marginLeft:'32%', fontSize:'25px'}}>
                       Individual PEP sanction screening report

                         </b>
                      </div>
                      </div>}
                 
                    </div>
                      
                                    <div
                                      className="accordion-item mb-2"
                                      style={{
                                        border: "2px solid grey ",
                                        borderRadius: "15px",
                                      }}
                                    >
                                      <button
                                        style={{
                                          justifyContent: "space-between",
                                          borderRadius: 16,
                                          display: "flex",
                                          alignItems: "center",
                                          
                                        }}
                                        className={`accordion-button ${
                                          isButtonExpanded ? "expanded" : "collapsed"
                                        } d-flex`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${index}`}
                                        aria-expanded={isButtonExpanded}
                                        aria-controls={`collapse-${index}`}
                                        onClick={handleButtonClick}
                                        >
                                        <div
                                          style={{ color: "var(--orange)" }}
                                        >{`Match ${index + 1}`}</div>
                                        <div
                                          className="svgResult"
                                          style={{ width: "400px" }}
                                        >
                                         
                                          {entity.firstName} {entity.lastName}
                                        </div>
                                        <div className="svgResult">
                                         
                                        </div>

                                        <div
                                          className="svgResult"
                                          style={{ marginLeft: "400px" }}
                                        >
                                         {isButtonExpanded && (
                      //  <Button  onClick={() => handlePrint(`print-section-${index}`)}>Print Report</Button>
                       <button type="button" class="btn btn-dark" onClick={() => handlePrint(`print-section-${index}`)}>Print Report</button>


                          )}
                                        </div>
                                        <div className="svgResult"></div>
                                      </button>

                                      <div
                                        id={`collapse-${index}`}
                                        className="accordion-collapse collapse"
                                        aria-labelledby={`heading-${index}`}
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body p-lg-5">
                                          <div>
                                            {entity.resultEntity.images &&
                                              entity.resultEntity.images
                                                .length > 0 &&
                                              entity.resultEntity.images.map(
                                                (image, index) => (
                                                  <img
                                                    key={index}
                                                    src={image}
                                                    alt={`profile image ${
                                                      index + 1
                                                    }`}
                                                    style={{
                                                      maxWidth: "10%",
                                                      marginBottom: "10px",
                                                    }}
                                                  />
                                                )
                                              )}
                                          </div>

                                          <div className="row mb-2 accordion-row">
                                            <div className="col-sm-4">
                                              <h3
                                                className="mb-3"
                                                style={{ fontWeight: 600 }}
                                              >
                                                {entity.firstName}{" "}
                                                {entity.middleName}{" "}
                                                {entity.lastName}
                                              </h3>
                                              <div
                                                style={{
                                                  fontWeight: 500,
                                                  color: "var(--text)",
                                                }}
                                              >
                                                <p className="p-0 m-0">
                                                  First name: {entity.firstName}
                                                </p>
                                                <p className="p-0 m-0">
                                                  Middle name:{" "}
                                                  {entity.middleName}
                                                </p>
                                                <p className="p-0 m-0">
                                                  Middle name: {entity.lastName}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="col-sm-4">
                                              <p>
                                                <svg
                                                  width={15}
                                                  height={15}
                                                  viewBox="0 0 15 15"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M13.5304 1.62134L9.93872 1.62136V0.727371C9.93872 0.47954 9.73799 0.278809 9.49016 0.278809C9.24233 0.278809 9.0416 0.47954 9.0416 0.727371V1.62113H5.4531V0.727371C5.4531 0.47954 5.25237 0.278809 5.00454 0.278809C4.7567 0.278809 4.55597 0.47954 4.55597 0.727371V1.62113H0.970612C0.475174 1.62113 0.0734863 2.02282 0.0734863 2.51826V13.7323C0.0734863 14.2277 0.475174 14.6294 0.970612 14.6294H13.5304C14.0258 14.6294 14.4275 14.2277 14.4275 13.7323V2.51826C14.4275 2.02303 14.0258 1.62134 13.5304 1.62134ZM13.5304 13.7323H0.970612V2.51826H4.55597V2.97018C4.55597 3.218 4.7567 3.41875 5.00454 3.41875C5.25237 3.41875 5.4531 3.218 5.4531 2.97018V2.51848H9.0416V2.97041C9.0416 3.21824 9.24233 3.41897 9.49016 3.41897C9.73799 3.41897 9.93872 3.21824 9.93872 2.97041V2.51848H13.5304V13.7323ZM10.3904 7.45266H11.2876C11.5352 7.45266 11.7361 7.2517 11.7361 7.00409V6.10697C11.7361 5.85936 11.5352 5.65841 11.2876 5.65841H10.3904C10.1428 5.65841 9.94186 5.85936 9.94186 6.10697V7.00409C9.94186 7.2517 10.1428 7.45266 10.3904 7.45266ZM10.3904 11.0409H11.2876C11.5352 11.0409 11.7361 10.8402 11.7361 10.5924V9.69525C11.7361 9.44764 11.5352 9.24668 11.2876 9.24668H10.3904C10.1428 9.24668 9.94186 9.44764 9.94186 9.69525V10.5924C9.94186 10.8404 10.1428 11.0409 10.3904 11.0409ZM7.69905 9.24668H6.80193C6.55432 9.24668 6.35336 9.44764 6.35336 9.69525V10.5924C6.35336 10.8402 6.55432 11.0409 6.80193 11.0409H7.69905C7.94666 11.0409 8.14761 10.8402 8.14761 10.5924V9.69525C8.14761 9.44786 7.94666 9.24668 7.69905 9.24668ZM7.69905 5.65841H6.80193C6.55432 5.65841 6.35336 5.85936 6.35336 6.10697V7.00409C6.35336 7.2517 6.55432 7.45266 6.80193 7.45266H7.69905C7.94666 7.45266 8.14761 7.2517 8.14761 7.00409V6.10697C8.14761 5.85914 7.94666 5.65841 7.69905 5.65841ZM4.11055 5.65841H3.21342C2.96582 5.65841 2.76486 5.85936 2.76486 6.10697V7.00409C2.76486 7.2517 2.96582 7.45266 3.21342 7.45266H4.11055C4.35816 7.45266 4.55911 7.2517 4.55911 7.00409V6.10697C4.55911 5.85914 4.35816 5.65841 4.11055 5.65841ZM4.11055 9.24668H3.21342C2.96582 9.24668 2.76486 9.44764 2.76486 9.69525V10.5924C2.76486 10.8402 2.96582 11.0409 3.21342 11.0409H4.11055C4.35816 11.0409 4.55911 10.8402 4.55911 10.5924V9.69525C4.55911 9.44786 4.35816 9.24668 4.11055 9.24668Z"
                                                    fill="#0E0E0E"
                                                  />
                                                </svg>
                                                Date of birth:{entity.dob}
                                              </p>
                                            </div>

                                            <div className="col-sm-4">
                                              {entity.resultEntity?.gender && (
                                                <p>
                                                  Gender:{" "}
                                                  {entity.resultEntity.gender}{" "}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                          <div className="row mb-3">
                                            <div className="col-sm-4">
                                              <form className="formAccordings">
                                                <div className="form-group row">
                                                  <label
                                                    htmlFor="firstName"
                                                    className="col col-form-label"
                                                  >
                                                    Category:{entity.category}
                                                  </label>

                                                  <div className="col">
                                                    <span
                                                      style={{
                                                        fontWeight: 500,
                                                      }}
                                                      className="form-control-plaintext"
                                                    ></span>
                                                  </div>
                                                </div>

                                                <div className="form-group row">
                                                  <label
                                                    htmlFor="firstName"
                                                    className="col col-form-label"
                                                  >
                                                    Categories:
                                                  </label>

                                                  <div className="col">
                                                    {entity.resultEntity
                                                      ?.categories && (
                                                      <span
                                                        style={{
                                                          fontWeight: 500,
                                                        }}
                                                      >
                                                        {entity.resultEntity.categories
                                                          .split(", ")
                                                          .map(
                                                            (
                                                              category,
                                                              subIndex
                                                            ) => (
                                                              <li
                                                                key={subIndex}
                                                              >
                                                                {category}
                                                              </li>
                                                            )
                                                          )}
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>

                                                <div className="form-group row">
                                                  <label
                                                    htmlFor="lastName"
                                                    className="col col-form-label"
                                                  >
                                                    {/* Category */}
                                                  </label>
                                                  <div className="col">
                                                    <span
                                                      style={{
                                                        fontWeight: 500,
                                                      }}
                                                      className="form-control-plaintext"
                                                    >
                                                      :
                                                    </span>
                                                  </div>
                                                </div>
                                              </form>
                                            </div>
                                            <div
                                              className="col-sm-4"
                                              style={{ fontSize: 14 }}
                                            >
                                              <p>
                                                Nationality:{" "}
                                                {entity.resultEntity
                                                  ?.nationalities && (
                                                  <span
                                                    style={{ fontWeight: 500 }}
                                                  >
                                                    {entity.resultEntity.nationalities.map(
                                                      (
                                                        nationality,
                                                        subIndex
                                                      ) => (
                                                        <span key={subIndex}>
                                                          {nationality}
                                                        </span>
                                                      )
                                                    )}
                                                  </span>
                                                )}
                                              </p>
                                            </div>
                                            <div className="col-sm-4">
                                              <form style={{ fontSize: 14 }}>
                                                <div className="form-group row">
                                                  <div className="col"></div>
                                                </div>

                                                <div className="form-group row">
                                                  <label
                                                    htmlFor="firstName"
                                                    className="col col-form-label"
                                                  >
                                                    Descriptions:
                                                  </label>
                                                  <div>
                                                    {entity.resultEntity
                                                      ?.descriptions && (
                                                      <ul
                                                        style={{
                                                          fontWeight: 500,
                                                        }}
                                                      >
                                                        {Object.keys(
                                                          entity.resultEntity
                                                            .descriptions[0]
                                                        ).map(
                                                          (key, subIndex) =>
                                                            entity.resultEntity
                                                              .descriptions[0][
                                                              key
                                                            ] && (
                                                              <li
                                                                key={subIndex}
                                                              >
                                                                {key}:{" "}
                                                                {
                                                                  entity
                                                                    .resultEntity
                                                                    .descriptions[0][
                                                                    key
                                                                  ]
                                                                }
                                                              </li>
                                                            )
                                                        )}
                                                      </ul>
                                                    )}
                                                  </div>
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                          <div className="accordion-item">
                                            <h5
                                              className="accordion-header"
                                              id="gThree"
                                            >
                                              Other names :
                                            </h5>
                                            <div
                                              id="eThree"
                                              aria-labelledby="gThree"
                                            >
                                              <div className="accordion-body">
                                                FirstName: {entity.firstName}
                                              </div>
                                              <div className="accordion-body">
                                                MiddleName: {entity.middleName}
                                              </div>
                                              <div className="accordion-body">
                                                lastName: {entity.lastName}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-sm-4">
                                            <form className="linked-companies-form">
                                              <div className="form-group row">
                                                <div className="col"></div>
                                              </div>

                                              <div className="form-group row">
                                                <label
                                                  htmlFor="firstName"
                                                  className="col col-form-label"
                                                  style={{
                                                    fontFamily:
                                                      "Arial, sans-serif",
                                                    fontWeight: "normal",
                                                    fontSize: "0.8em", // Adjusted font size
                                                  }}
                                                >
                                                  Linked Companies:
                                                </label>
                                                <div>
                                                  {entity.resultEntity
                                                    ?.linkedCompanies &&
                                                  entity.resultEntity
                                                    .linkedCompanies.length >
                                                    0 ? (
                                                    <ul className="linked-companies-list">
                                                      {entity.resultEntity.linkedCompanies.map(
                                                        (company, index) => (
                                                          <li
                                                            key={index}
                                                            className="linked-company-item"
                                                            style={{
                                                              fontFamily:
                                                                "Arial, sans-serif",
                                                              fontWeight:
                                                                "normal",
                                                              fontSize: "0.8em", // Adjusted font size
                                                            }}
                                                          >
                                                            <div className="linked-company-info">
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Category:{" "}
                                                                {
                                                                  company.category
                                                                }
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Id :{" "}
                                                                {company.id}
                                                                {/* ID: {company.id} */}
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Description:{" "}
                                                                {
                                                                  company.description
                                                                }
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                CompanyName :{" "}
                                                                {company.name}
                                                                {/* ID: {company.id} */}
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.2em",
                                                                }}
                                                              >
                                                                Name:{" "}
                                                                {company.name}
                                                              </p>
                                                              {company.lastReviewed && (
                                                                <p
                                                                  style={{
                                                                    margin: "0",
                                                                    fontSize:
                                                                      "0.8em",
                                                                  }}
                                                                >
                                                                  Last Reviewed:{" "}
                                                                  {
                                                                    company.lastReviewed
                                                                  }
                                                                </p>
                                                              )}
                                                              {company.defaultingYear && (
                                                                <p
                                                                  style={{
                                                                    margin: "0",
                                                                    fontSize:
                                                                      "0.8em",
                                                                    marginTop:
                                                                      "8px",
                                                                  }}
                                                                >
                                                                  Defaulting
                                                                  Year:{" "}
                                                                  {
                                                                    company.defaultingYear
                                                                  }
                                                                </p>
                                                              )}
                                                            </div>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  ) : (
                                                    <p
                                                      className="no-linked-companies-message"
                                                      style={{
                                                        fontSize: "0.8em",
                                                      }}
                                                    >
                                                      No linked companies
                                                      available.
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                              <div className="form-group row">
                                                <label
                                                  htmlFor="firstName"
                                                  className="col col-form-label"
                                                  style={{
                                                    fontFamily:
                                                      "Arial, sans-serif",
                                                    fontWeight: "normal",
                                                    fontSize: "0.8em", // Adjusted font size
                                                  }}
                                                >
                                                  Linked Individuals:
                                                </label>
                                                <div>
                                                  {entity.resultEntity
                                                    ?.linkedIndividuals &&
                                                  entity.resultEntity
                                                    .linkedIndividuals.length >
                                                    0 ? (
                                                    <ul className="linked-companies-list">
                                                      {entity.resultEntity.linkedIndividuals.map(
                                                        (individual, index) => (
                                                          <li
                                                            key={index}
                                                            className="linked-company-item"
                                                            style={{
                                                              fontFamily:
                                                                "Arial, sans-serif",
                                                              fontWeight:
                                                                "normal",
                                                              fontSize: "0.8em", // Adjusted font size
                                                            }}
                                                          >
                                                            <div className="linked-company-info">
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Category:{" "}
                                                                {
                                                                  individual.category
                                                                }
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Description:{" "}
                                                                {
                                                                  individual.description
                                                                }
                                                                {/* ID: {company.id} */}
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Firstname:{" "}
                                                                {
                                                                  individual.first_name
                                                                }
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Id :{" "}
                                                                {individual.id}
                                                                {/* ID: {company.id} */}
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.2em",
                                                                }}
                                                              >
                                                                LastName:{" "}
                                                                {
                                                                  individual.last_name
                                                                }
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.2em",
                                                                }}
                                                              >
                                                                MiddleName:{" "}
                                                                {
                                                                  individual.middle_name
                                                                }
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.2em",
                                                                }}
                                                              >
                                                                Subcategories:{" "}
                                                                {
                                                                  individual.subcategories
                                                                }
                                                              </p>
                                                            </div>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  ) : (
                                                    <p
                                                      className="no-linked-companies-message"
                                                      style={{
                                                        fontSize: "0.8em",
                                                      }}
                                                    >
                                                      No linked Individuals
                                                      available.
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                              <div className="form-group row">
                                                <label
                                                  htmlFor="firstName"
                                                  className="col col-form-label"
                                                  style={{
                                                    fontFamily:
                                                      "Arial, sans-serif",
                                                    fontWeight: "normal",
                                                    fontSize: "0.8em", // Adjusted font size
                                                  }}
                                                >
                                                  Sources:
                                                </label>
                                                <div>
                                                  {entity.resultEntity
                                                    ?.sources &&
                                                  entity.resultEntity.sources
                                                    .length > 0 ? (
                                                    <ul className="linked-companies-list">
                                                      {entity.resultEntity.sources.map(
                                                        (sources, index) => (
                                                          <li
                                                            key={index}
                                                            className="linked-company-item"
                                                            style={{
                                                              fontFamily:
                                                                "Arial, sans-serif",
                                                              fontWeight:
                                                                "normal",
                                                              fontSize: "0.8em", // Adjusted font size
                                                            }}
                                                          >
                                                            <div className="linked-company-info">
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                cached_url:{" "}
                                                                {
                                                                  sources.cached_url
                                                                }
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Categories:{" "}
                                                                {
                                                                  sources.categories
                                                                }
                                                                {/* ID: {company.id} */}
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                dates:{" "}
                                                                {sources.dates}
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Url :{" "}
                                                                <a
                                                                  href={
                                                                    sources.url
                                                                  }
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                >
                                                                  {sources.url}
                                                                </a>
                                                              </p>
                                                            </div>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  ) : (
                                                    <p
                                                      className="no-linked-companies-message"
                                                      style={{
                                                        fontSize: "0.8em",
                                                      }}
                                                    >
                                                      No Sources available.
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                            </form>
                                          </div>

                                          <div></div>

                                          <div className="col-sm-4">
                                            <form style={{ fontSize: 14 }}>
                                              <div className="form-group row">
                                                <div className="col"></div>
                                              </div>
                                            </form>
                                          </div>

                                          <div className="col-sm-4">
                                            <form className="linked-companies-form">
                                              <div className="form-group row">
                                                <div className="col"></div>
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            ) : (
                              <h1>No result found</h1>
                            )}
                          </div>

                          <div
                            className="d-flex justify-content-between card-footer text-end"
                            style={{
                              border: "none",
                              zIndex: -1,
                              position: "absolute",
                              bottom: 0,
                              width: "-webkit-fill-available",
                            }}
                          >
                            <div className="btn-wizard d-flex justify-content-end">
                              {activeTab > 1 && !result && (
                                <button
                                  style={{
                                    boxShadow: "none",
                                    zIndex: 1,
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    color: "orange",
                                    borderRadius: 10,
                                    padding: "0 10px",
                                    marginRight: "10px",
                                  }}
                                  type="button"
                                  id="back1_button"
                                  className="btn btn-link py-3 btn_back"
                                  onClick={handlePreviousTab}
                                >
                                  BACK
                                  <span className="iconamoon--arrow-right-2-duotone" />
                                </button>
                              )}

                              {activeTab < 4 && (
                                <button
                                  style={{
                                    boxShadow: "none",
                                    fontWeight: 500,
                                    backgroundColor: "#FF5428",
                                    Color: "white",
                                    textDecoration: "none",
                                    borderRadius: 10,
                                    // marginLeft: "950px",
                                  }}
                                  type="button"
                                  id="next_button"
                                  className="btn py-3 btn_continue"
                                  onClick={handleNextTab}
                                >
                                  CONTINUE
                                </button>
                              )}

                              {activeTab === 4 && (
                                <button
                                  style={{
                                    boxShadow: "none",
                                    fontWeight: 500,
                                    backgroundColor: error ? "red" : "green",
                                    color: "white",
                                    textDecoration: "none",
                                    borderRadius: 10,
                                    marginLeft: "auto",
                                  }}
                                  type="button"
                                  id="next_button"
                                  className="btn py-3 btn_continue ml-auto"
                                  onClick={fetchData}
                                  disabled={error}
                                >
                                  {error ? "Check Limit Exceeded" : "Submit"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                      <Link to="/dashboardaml">
                        <button
                          style={{ textDecoration: "none", fontSize: 14 }}
                          type="button"
                          id="back_button"
                          className="btn btn-link ps-0 p-3"
                        >
                          Cancel
                        </button>
                      </Link>
                    </div>
                  </section>
                </div>

                {/* end */}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Individualcheck;
