import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import authStore from "../../store/user/authStore";
import Loader from "../../components/Loader";
// import Printbutton from "./Printbutton";
import handlePrint from "./Printbutton";
import { useSidebar } from "../../ContextApi/SidebarContext";
import { useRef } from "react";

function Corporatecheck() {

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

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = (e) => {
    e.preventDefault();

    setShowDetails(!showDetails);
  };

  const store = authStore();

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

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

  const fetchData = async () => {
    try {
      // console.log("fetch data clicked");
      setLoading(true);
      const apiUrl = `/user/viewcompanyresult`;
      const webhookUrl = `/user/webhook/zignsec`;

      const requestBody = {
        metadata: {
          Type: "corporate",
          address: formData.tab2.address,
          close_match_rate_threshold: formData.tab2.matchrate,
          company_name: formData.tab1.companyName,
          include_web_search: "No",
          match_type: formData.tab2.matchType,
          registration_number: formData.tab2.registrationNumber,
          update_monitoring_list: "Yes",
          whitelist: "Ignore",
        },
        relay_state: formData.tab3.relayState,
        webhook: webhookUrl,
      };

      Object.keys(requestBody.metadata).forEach((key) => {
        if (!requestBody.metadata[key]) {
          delete requestBody.metadata[key];
        }
      });

      // console.log("Request Payload:", JSON.stringify(requestBody, null, 2));

      const response = await axios.post(apiUrl, requestBody);
      // console.log("Corporate check result", response.data);
      setLoading(false);

      setResult(response.data);

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
    tab1: { companyName: "" },
    tab2: {
      address: "",
      registrationNumber: "",
      matchTypeInput: "close",
      matchrate: 80,
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
    const { companyName } = formData.tab1;

    if (!companyName) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Fill the Company Name to Continue",
      });
    } else {
      setActiveTab(activeTab + 1);
    }
  };
  const handlePreviousTab = () => {
    setActiveTab(activeTab - 1);
  };

  const handleSubmit = () => {
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
                        href="aml-home.html"
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
                className="col-12 removediv"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  height: "4vh",
                }}
              ></div>
              <div
                className="tab-content d-flex align-items-end pb-3"
                id="v-pills-tabContent"
                style={{ height: "80vh" }}
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
                              <Link
                                onClick={() => handleTabChange(1)}
                                className={`nav-link tab-pills ${
                                  activeTab === 1 ? "active" : ""
                                }`}
                              >
                                <span className="me-2 wizard_number"></span>
                                <b>Provide target name</b>
                              </Link>
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
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          {activeTab === 1 && (
                            <div>
                              <div className="input_padd">
                                <div className="mb-3 mt-lg-3 mt-sm-0">
                                  <input
                                    type="text"
                                    value={formData.tab1.companyName}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab1",
                                        "companyName",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    placeholder="Company Name (Required)"
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
                                <div className="mb-3 mt-lg-3 mt-sm-0">
                                  <input
                                    type="text"
                                    value={formData.tab2.address}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab2",
                                        "address",
                                        e.target.value
                                      )
                                    }
                                    className="form-control rounded"
                                    placeholder="Address"
                                  />
                                </div>
                                <div className="mb-3 mt-lg-3 mt-sm-0">
                                  <input
                                    type="text"
                                    value={formData.tab2.registrationNumber}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "tab2",
                                        "registrationNumber",
                                        e.target.value
                                      )
                                    }
                                    className="form-control rounded"
                                    placeholder="Registration number "
                                  />
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
                                <div
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
                                </div>
                                <div
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
                                </div>
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
                                        Company Name
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{" "}
                                          {formData.tab1.companyName ||
                                            "(empty)"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Address
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{formData.tab2.address || "(empty)"}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Registration Number
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :
                                          {formData.tab2.registrationNumber ||
                                            "(empty)"}
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
                                        htmlFor="lastName"
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
                                    <div className="form-group row">
                                      <label
                                        htmlFor="lastName"
                                        className="col-sm-2 col col-form-label"
                                      >
                                        Relay state
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :
                                          {formData.tab3.relayState ||
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
                                        Webhook URL
                                      </label>
                                      <div className="col">
                                        <span
                                          style={{ fontWeight: 500 }}
                                          className="form-control-plaintext"
                                        >
                                          :{formData.tab3.webhook || "(empty)"}
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
                                    position: "absolute",
                                    top: "0",
                                    right: "0",
                                    zIndex: "100",
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
                              <>
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
                          Corporate PEP sanction screening report
                        </b>
                      </div>
                    </div>
                  </div>

                  <h4 style={{ marginBottom: "50px" }}>
                  No match found for Sanctions and Adverse Media.
                  </h4>
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={() => PrintNosanction()}
                  >
                    Print Report
                  </button>
                </div>
                              </>
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
                                          {}
                                        </div>

                                        <div className="svgResult">
                                          {entity.name}
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
                                              {entity.resultEntity.locations &&
                                                entity.resultEntity.locations
                                                  .length > 0 && (
                                                  <div>
                                                    {entity.resultEntity.locations.map(
                                                      (location, index) => (
                                                        <div key={index}>
                                                          <div
                                                            style={{
                                                              fontWeight: 500,
                                                              color:
                                                                "var(--text)",
                                                            }}
                                                          >
                                                            <p className="p-0 m-0">
                                                              Address:{" "}
                                                              {location.address}
                                                            </p>
                                                            <p className="p-0 m-0">
                                                              City:{" "}
                                                              {location.city}
                                                            </p>
                                                            <p className="p-0 m-0">
                                                              Country:{" "}
                                                              {location.country}
                                                            </p>
                                                          </div>
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
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
                                                <div>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                      borderRadius: "5px",
                                                      backgroundColor:
                                                        "#f0f0f0",
                                                      display: "block",
                                                      width: "100%",
                                                    }}
                                                  >
                                                    General info
                                                  </span>
                                                  <div
                                                    style={{
                                                      marginTop: "20px",
                                                    }}
                                                  >
                                                    {entity.resultEntity
                                                      ?.generalInfo && (
                                                      <ul
                                                        style={{
                                                          fontWeight: 500,
                                                        }}
                                                      >
                                                        <li>
                                                          {entity.resultEntity
                                                            .generalInfo
                                                            .entityName && (
                                                            <span>
                                                              {
                                                                entity
                                                                  .resultEntity
                                                                  .generalInfo
                                                                  .entityName
                                                              }
                                                            </span>
                                                          )}
                                                        </li>

                                                        <li>
                                                          {entity.resultEntity
                                                            .generalInfo
                                                            .businessDescription && (
                                                            <p
                                                              style={{
                                                                maxWidth:
                                                                  "600px",
                                                              }}
                                                            >
                                                              Business
                                                              Description:{" "}
                                                              {
                                                                entity
                                                                  .resultEntity
                                                                  .generalInfo
                                                                  .businessDescription
                                                              }
                                                            </p>
                                                          )}
                                                        </li>

                                                        <li
                                                          style={{
                                                            marginTop: "20px",
                                                          }}
                                                        >
                                                          {entity.resultEntity
                                                            .generalInfo
                                                            .website && (
                                                            <p>
                                                              Website:{" "}
                                                              <a
                                                                href={
                                                                  entity
                                                                    .resultEntity
                                                                    .generalInfo
                                                                    .website
                                                                }
                                                              >
                                                                {
                                                                  entity
                                                                    .resultEntity
                                                                    .generalInfo
                                                                    .website
                                                                }
                                                              </a>
                                                            </p>
                                                          )}
                                                        </li>
                                                      </ul>
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
                                                    ></span>
                                                  </div>
                                                </div>
                                              </form>
                                            </div>
                                            <div
                                              className="col-sm-4"
                                              style={{ fontSize: 14 }}
                                            >
                                              {/* <p>
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
                                              </p> */}
                                            </div>
                                            <div className="col-sm-4">
                                              <form style={{ fontSize: 14 }}>
                                                <div className="form-group row">
                                                  <div className="col"></div>
                                                </div>

                                                <div className="form-group row">
                                                  <label
                                                    style={{
                                                      fontWeight: "bold",
                                                      borderRadius: "5px",
                                                      backgroundColor:
                                                        "#f0f0f0",
                                                      display: "block",
                                                      width: "100%",
                                                    }}
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
                                                        {entity.resultEntity.descriptions.map(
                                                          (
                                                            description,
                                                            index
                                                          ) => (
                                                            <li key={index}>
                                                              <ul>
                                                                {Object.entries(
                                                                  description
                                                                ).map(
                                                                  (
                                                                    [
                                                                      descriptionKey,
                                                                      descriptionValue,
                                                                    ],
                                                                    subIndex
                                                                  ) =>
                                                                    descriptionValue && (
                                                                      <li
                                                                        key={
                                                                          subIndex
                                                                        }
                                                                      >
                                                                        {
                                                                          descriptionKey
                                                                        }
                                                                        :{" "}
                                                                        {
                                                                          descriptionValue
                                                                        }
                                                                      </li>
                                                                    )
                                                                )}
                                                              </ul>
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

                                          <div>
                                            <button
                                              onClick={toggleDetails}
                                              style={{
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                                border: "1px solid #ccc",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                backgroundColor: "#f0f0f0",
                                                display: "block",
                                                width: "100%",
                                              }}
                                            >
                                              Other names
                                            </button>
                                            {showDetails &&
                                              entity.resultEntity
                                                ?.nameDetails && (
                                                <ul style={{ fontWeight: 500 }}>
                                                  {entity.resultEntity.nameDetails.map(
                                                    (description, index) => (
                                                      <li key={index}>
                                                        {description.entityName && (
                                                          <span>
                                                            {
                                                              description.entityName
                                                            }
                                                          </span>
                                                        )}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              )}
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
                                                                ID: {company.id}
                                                              </p>
                                                              <p
                                                                style={{
                                                                  margin: "0",
                                                                  fontSize:
                                                                    "0.8em",
                                                                }}
                                                              >
                                                                Name:
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
                                            </form>
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
                              <div>No result found</div>
                            )}

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
                                      marginRight: "10px", // Add marginRight for spacing
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
                                      textDecoration: "none",
                                      borderRadius: 10,
                                      marginRight: "10px", // Add marginRight for spacing
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
                                      marginLeft: "auto", // Use marginLeft:auto on the last button
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
                        </div>
                      </form>
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

export default Corporatecheck;
