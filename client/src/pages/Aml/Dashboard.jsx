import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chart } from "react-google-charts";
import authStore from "../../store/user/authStore";
import NewcheckButton from "./NewcheckButton";
import { useSidebar } from "../../ContextApi/SidebarContext";

function Dashboard() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  function closeSidebar() {
    if (isSidebarOpen) {
      toggleSidebar();
    }
  }

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

  const [apiUsage, setApiUsage] = useState(null);
  const [apiLimit, setApiLimit] = useState(null);

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

  const [notification, setNotification] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/user/viewnotifications");

      const notificationData = response.data.notifications;
      // console.log(notificationData);
      setNotification(notificationData);
    } catch (error) {
      console.error("Error in fetching notifications", error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchApiUsage();
    fetchNotifications();
  }, []);

  const data = [
    ["Task", "Value"],
    ["Used checks", apiUsage !== null ? apiUsage : 0],
    [
      "Remaining checks",
      apiLimit !== null ? apiLimit - (apiUsage !== null ? apiUsage : 0) : 0,
    ],
  ];

  const options = {
    title: "My AML Screening checks",
    backgroundColor: "transparent",
    pieHole: 0.4,
    is3D: false,
    tooltip: { textStyle: { color: "black" }, trigger: "selection" },

    titleTextStyle: {
      marginLeft: 60, // 'out' moves the title outside of the chart area
      // Other properties for the title text style can be added here
    },
  };

  const store = authStore();

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
        <div className="row vh-100">
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
                        <span />
                        <i class="fa-solid fa-fingerprint"></i>
                      </div>
                    </div>
                  </Link>
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
                  className="col-12 show active container-fluid px-0"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                  tabIndex={0}
                  style={{ height: "100%", position: "relative" }}
                >
                  {/* <h1>Welcome <span style="color: var(--orange);"><b>“ABIN”</b></span></h1> */}
                  <div className="row "  style={{ height: "100%" }}>
                    <div
                      className="col-lg-6"
                      style={{ display: "flex", alignItems: "end" }}
                    >
                     <div className="welcome">
  <h2>
    Welcome
    <span
                            style={{ color: "var(--orange)", fontSize: "40px" }}
                          >
                            <b> {store.user?.companyName}</b>
                          </span>
  </h2>
  <p className="textGreetings pb-4 fw-semibold text-body text-justify">
    <b>Greetings! We're glad to see you here.</b> The Portal is a powerful platform that allows you to interact with various Products. Feel free to start out by checking out the <a href="/newcheckaml">Products menu</a> by clicking the link or the menu item at the top of the screen. We hope that with the use of Portal, your day-to-day workload will become a breeze!
  </p>
  {/* graph_start */}
  <div className="p-4 border bg-light" style={{ borderRadius: "20px" }}>
    <div className="container-fluid">
      <div className="row pt-0 mt-0 justify-content-center">
        <div className="col-auto" style={{ marginTop: "-60px" }}>
          <Chart
            chartType="PieChart"
            width="100%" // Make width responsive
            height="500px" // Optionally, make height responsive too
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  </div>
</div>

                    </div>
                    <div
                      className="col-lg-6 newsmobile"
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "end",
                      }}
                    >
                      <div
                        className="dashboard_tab"
                        style={{
                          backgroundColor: "var(--gray)",
                          borderRadius: 20,
                          maxHeight: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="px-4 pt-3"
                          style={{
                            backgroundColor: "var(--capsule)",
                            height: "100%",
                          }}
                        >
                          <ul
                            style={{ border: "none" }}
                            className="nav nav-tabs btn_tab"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active btn_dashnews"
                                id="home-tab1"
                                data-bs-toggle="tab"
                                data-bs-target="#home-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="home-tab-pane"
                                aria-selected="true"
                              >
                                News
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link btn_dashnews"
                                id="home-tab2"
                                data-bs-toggle="tab"
                                data-bs-target="#profile-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="profile-tab-pane"
                                aria-selected="false"
                              >
                                Updates
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          style={{
                            height: 600,
                            overflow: "auto",
                            overflowX: "hidden",
                          }}
                          className="tab-content pt-3 px-sm-3"
                          id="myTabContent"
                        >
                          <div
                            className="tab-pane fade show active row g-2 capsules"
                            id="home-tab-pane"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                            tabIndex={0}
                          >
                            <section className="row g-2">
                              {news &&
                                news.length > 0 &&
                                news
                                  .slice()
                                  .map((newsItem) => (
                                    <div className="p-3">
                                      {newsItem.description}
                                    </div>
                                  ))}
                            </section>
                          </div>
                          <div
                            className="tab-pane fade show active row g-2 capsules"
                            id="profile-tab-pane"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                            tabIndex={0}
                          >
                            {notification &&
                              notification.length > 0 &&
                              notification
                                .slice()
                                .map((notItem) => (
                                  <div className="p-3">
                                    {notItem.description}
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Dashboard;
