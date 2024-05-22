import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NewcheckButton from "./NewcheckButton";
import authStore from "../../store/user/authStore";
import { useSidebar } from "../../ContextApi/SidebarContext";
import axios from "axios";
function Profile() {

const[apiUsage,setApiUsage] = useState(null)
const[apilimit,setApiLimit]=useState(null)

const fetchApiUsage = async () => {
  try {
    const response = await axios.get("/user/viewApiusage");

    // console.log(response.data.apiUsage);
    // console.log(response.data.apilimit);

    setApiUsage(response.data.apiUsage);
    setApiLimit(response.data.apilimit);
  } catch (error) {
    console.error("Error in fetching API usage ", error);
  }
};

useEffect(()=>{
  fetchApiUsage();
},[])




  const { isSidebarOpen, toggleSidebar } = useSidebar();

  function closeSidebar() {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  }

  const store = authStore();
  // console.log("store", store);

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
                        style={{ height: '56px', width:'160px' }}
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
                  src="/assets/images/logo/black_bg logo.jpg"
                  
                  alt="logo"
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
                    backgroundColor: "white",
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
                  style={{ width: "100%",
                  color: "var(--orange)",
                 }}
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
                  style={{ width: "100%",   color: "var(--orange)",   }}
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
                  style={{ width: "100%" ,   color: "var(--orange)",}}
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
                  style={{ width: "100%",   color: "var(--orange)", }}
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
                  <Link
                    to="/dashboardaml"
                    style={{ textDecoration: "none", color: "var(--black)" }}
                  >
                    <div className="col-sm-12 d-flex justify-content-between px-3 py-3">
                      <a
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
                      </a>
                      <div className="d-flex align-items-center">
                        <h2 className="pe-2 m-0">
                          <b>{store.user?.companyName}</b>
                        </h2>
                        <span
                        
                        />
                        <i class="fa-solid fa-fingerprint"></i>

                      </div>
                    </div>
                  </Link>
                  {/* vvvvvvvvvvvvvvvvvv */}
                </div>
              </div>
              <div
                className="col-12 removediv"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  height: "10vh",
                }}
              >
                <NewcheckButton />
              </div>
              <div
                className="tab-content d-flex align-items-end pb-3"
                id="v-pills-tabContent"
                style={{ height: "80vh" }}
              >
                <div
                  className=" container-fluid"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                  tabIndex={0}
                  style={{ height: "100%" }}
                >
                  <div className="row pb-5" style={{ width: "auto" }}>
                    <form>
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
                            : {store.user?.companyName}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          eMAIL
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : {store.user?.email}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Country
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : {store.user?.country}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Emirate
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : {store.user?.emirate}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Address
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : Street -{store.user?.street}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        ></label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : City: {store.user?.city}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        ></label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : Zipcode : {store.user?.zipCode}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          TRN
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : {store.user?.trn}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Check Limit
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : {apilimit}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Used checks
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : {apiUsage}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Remaining
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500, color: "red" }}
                            className="form-control-plaintext"
                          >
                            : {apilimit - apiUsage}
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
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

export default Profile;
