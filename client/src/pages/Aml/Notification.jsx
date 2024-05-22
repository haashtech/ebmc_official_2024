import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authStore from "../../store/user/authStore";
import NewcheckButton from "./NewcheckButton";
import axios from "axios";
import { useSidebar } from "../../ContextApi/SidebarContext";

function Notification() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  function closeSidebar() {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  }

  const [notification, setNotification] = useState([]);

  const store = authStore();
  const navigate = useNavigate();

  const fetchNotification = async (req, res) => {
    try {
      const Response = await axios.get("/user/viewnotifications");
      // console.log(Response.data.notifications);

      setNotification(Response.data.notifications);
    } catch (error) {
      console.error("Error in fetching notifications", error);
    }
  };

  const [news, setNews] = useState([]);
  const fetchNews = async () => {
    try {
      const response = await axios.get("/user/viewnewses");

      // console.log(response);
      const sortedNews = response.data.news.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );

      setNews(sortedNews);
    } catch (error) {
      console.error("Error in fetching news", error);
    }
  };

  useEffect(() => {
    fetchNotification();
    fetchNews();
  }, []);

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
                  style={{ width: "100%", color: "var(--orange)" }}
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
                  style={{ width: "100%", color: "var(--orange)" }}
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
                  style={{ width: "100%", color: "var(--orange)" }}
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
                  style={{ width: "100%", color: "var(--orange)" }}
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
                            bottom: "24px",
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
                        <span />
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
                {/* end */}
                <div
                  className=" mt-5"
                  id="v-pills-notifications"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                  tabIndex={0}
                >
                  <div className="col-sm-12 p-sm-0 pt-5">
                    <div
                      id="drpdown_notification"
                      style={{
                        backgroundColor: "var(--gray)",
                        borderRadius: 20,
                        maxHeight: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        className="pt-4 px-4"
                        style={{ backgroundColor: "var(--capsule)" }}
                      >
                        <ul
                          style={{ border: "none" }}
                          className="nav nav-tabs btn_tab pb-2"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item active" role="presentation">
                            <button
                              className="nav-link active"
                              id="home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#home-tab-pane2"
                              type="button"
                              role="tab"
                              aria-controls="home-tab-pane"
                              aria-selected="true"
                            >
                              Updates
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#profile-tab-pane1"
                              type="button"
                              role="tab"
                              aria-controls="profile-tab-pane"
                              aria-selected="false"
                            >
                              News
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div
                        style={{
                          height: "65vh",
                          overflow: "auto",
                          overflowX: "hidden",
                          paddingBottom: 60,
                        }}
                        className="tab-content pt-3 px-lg-4 px-sm-2"
                        id="myTabContent1"
                      >
                        <div
                          className="tab-pane fade show active row g-2 capsules"
                          id="home-tab-pane2"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                          tabIndex={0}
                        >
                          <section className="row g-2">
                            {notification &&
                              notification.length > 0 &&
                              notification
                                .slice()
                                .reverse()
                                .map((notItem) => (
                                  <div className="p-3">
                                    {notItem.description}
                                  </div>
                                ))}
                          </section>
                        </div>
                        <div
                          className="tab-pane fade row g-2 capsules"
                          id="profile-tab-pane1"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                          tabIndex={1}
                        >
                          <section className="row g-2">
                            {news &&
                              news.length > 0 &&
                              news
                                .slice()
                                .reverse()
                                .map((newsItem) => (
                                  <div className="p-3">
                                    {newsItem.description}
                                  </div>
                                ))}
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 footerpara">
              <div
                style={{
                  width: "100%",
                  justifyContent: "end",
                  alignItems: "end",
                  display: "flex",
                  height: "2vh",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  © 2024 Etihad Business and Managment Consultancy LLC. All
                  Rights Reserved Designed with ❤️ HAASH.tech
                </p>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
