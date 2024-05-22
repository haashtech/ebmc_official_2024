import React from "react";
import { Link } from "react-router-dom";
import authStore from "../store/user/authStore";
function Profileaml() {


const store=authStore();


  return (
    <div className="main_container">
      <div className="container-fluid">
        <div className="row vh-100" style={{ position: "relative" }}>
          {/* mobile_header */}
          <div>
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
                          style={{ height: 56 }}
                          src="/asset/images/logo/pnglogo-02-01.png"
                          alt
                        />
                      </a>
                    </div>
                    <div
                      style={{ borderColor: "black" }}
                      className="mobile-nav-icon dots-menu"
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
            <div className="mobile-sidebar pt-3 px-0 vh-100">
              <div className="logoicons-area px-4">
                <div className="logos">
                  <img
                    className="img-fluid p-1"
                    style={{ height: 56 }}
                    src="/asset/images/logo/pnglogo-02-01.png"
                    alt
                  />
                </div>
                <div className="menu-close">
                  <i className="fa-solid fa-xmark" />
                </div>
              </div>
              <div
                style={{ width: "100%" }}
                className="nav flex-column mt-5 pt-5 nav-pills btn_sidebar"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <hr className="m-0" />
                <button
                  className="meeem nav-link active align-items-center d-flex py-4 pe-0 m-0 menu-close5"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  <div
                    id="btn_dashboard_tab"
                    className=" "
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <iconify-icon
                      className="pe-3"
                      icon="radix-icons:dashboard"
                    />
                    Dashboard
                  </div>
                </button>
                <hr className="m-0" />
                <button
                  className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  <div id="btn_profile_tab ">
                    <iconify-icon
                      className="pe-3"
                      icon="healthicons:ui-user-profile"
                    />
                    Profile
                  </div>
                </button>
                <hr className="m-0" />

                <hr className="m-0" />
                <button
                  className="meeem menu-close2 nav-link align-items-center d-flex py-4 pe-0"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-checkHistory"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                  id="v-pills-home-tab"
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ textDecoration: "none", fontWeight: 500 }}
                    href="#"
                  >
                    <iconify-icon
                      className="pe-3"
                      icon="material-symbols:history-rounded"
                    />
                    Check History
                  </div>
                </button>
                <hr className="m-0" />
                <button
                  className="meeem menu-close3 nav-link align-items-center d-flex py-4 pe-0"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-notifications"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                  id="v-pills-home-tab"
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ textDecoration: "none", fontWeight: 500 }}
                    href="#"
                  >
                    <iconify-icon className="pe-3" icon="mi:notification" />
                    Notifications
                  </div>
                </button>
                <hr className="m-0" />
              </div>
              <div
                className="col logout p-4"
                id="logout"
                style={{ paddingTop: 40 }}
              >
                <a href="#">
                  <img src="/asset/images/icons/logout_icon.svg" alt />
                  logout
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ position: "relative" }}
            className="col-sm-2 bg1 p-0 container-fluid overflow-hidden sidebarmain"
          >
            {/* side_bar */}
            <div className="row m-0">
              <div className="py-5 m-0 d-flex justify-content-center align-items-start logo_section1">
                <img
                  style={{ height: 140 }}
                  src="/asset/images/logo/Echeck Final Logo-01.svg"
                  alt
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
                          <Link
                            to="/dashboardaml"
                            className="meeem nav-link  align-items-center d-flex py-4 pe-0 m-0 menu-close5"
                            role="tab"
                            aria-controls="v-pills-home"
                            style={{ color: "white" }}
                          >
                            <div
                              id="btn_dashboard_tab"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <iconify-icon
                                className="pe-3"
                                icon="radix-icons:dashboard"
                              />
                              Dashboard
                            </div>
                          </Link>

                          <hr className="m-0" />
                          <Link
  to="/profileaml"
  className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4 "
  role="tab"
  aria-controls="v-pills-profile"
  aria-selected="false"
  style={{ color: "white" }}
>
  <div id="btn_profile_tab">
    <iconify-icon
      className="pe-3"
      icon="healthicons:ui-user-profile"
    />
    Profile
  </div>
</Link>

                          <hr className="m-0" />
                          <Link
                            to="/newcheckaml"
                            className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                            role="tab"
                            aria-controls="v-pills-profile"
                            aria-selected="false"
                            style={{ color: "white" }}
                          >
                            <div id="btn_profile_tab">
                              <iconify-icon
                                className="pe-3"
                                icon="ic:round-plus"
                              />
                              New Check
                            </div>
                          </Link>
                          <hr className="m-0" />
                          <Link
                            to="/checkhistoryaml"
                            className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                            role="tab"
                            aria-controls="v-pills-profile"
                            aria-selected="false"
                            style={{ color: "white" }}
                          >
                            <div id="btn_profile_tab">
                              <iconify-icon
                                className="pe-3"
                                icon="material-symbols:history-rounded"
                              />
                              Check history
                            </div>
                          </Link>
                          <hr className="m-0" />
                          <Link
                            to="/amlnotifications"
                            className="meeem nav-link align-items-center d-flex py-4 pe-0 menu-close4"
                            role="tab"
                            aria-controls="v-pills-profile"
                            aria-selected="false"
                            style={{ color: "white" }}
                          >
                            <div id="btn_profile_tab">
                              <iconify-icon
                                className="pe-3"
                                icon="mi:notification"
                              />
                              Notifications
                            </div>
                          </Link>
                          <hr className="m-0" />
                        </div>
                        <div
                          className="col logout p-3"
                          id="logout"
                          style={{ position: "absolute", bottom: 0 }}
                        >
                          <a href="#">
                            <img
                              src="/asset/images/icons/logout_icon.svg"
                              alt
                            />
                            logout
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-sm-10 bg2 container-fluid"
            style={{ position: "relative" }}
          >
            <div className="row">
              <div
                className="col-12 bg2_1 container-fluid backhomeheader"
                style={{ height: "10vh" }}
              >
                {/* header  */}
                <div className="row">
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
                        <b>ABIN</b>
                      </h2>
                      <span
                        style={{
                          borderRadius: "50%",
                          height: 40,
                          width: 40,
                          backgroundColor: "var(--capsule)",
                        }}
                      />
                    </div>
                  </div>
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
                {/* new_check_button */}
                <div className="py-3">
                  <button
                    id="myButton"
                    style={{
                      /* position: 'absolute', */
                      backgroundColor: "var(--orange)",
                      border: "none",
                      padding: "15px 40px",
                      borderRadius: 5,
                      fontWeight: 600,
                      width: "fit-content",
                      color: "var(--white)",
                    }}
                    className="btn btn-primary"
                    onclick="switchToTab('v-pills-messages')"
                  >
                    NEW CHECK
                  </button>
                </div>
              </div>
              <div
                className="tab-content d-flex align-items-end pb-3"
                id="v-pills-tabContent"
                style={{ height: "80vh" }}
              >
                <div
                  className="col-12 tab-pane fade show active container-fluid px-0"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                  tabIndex={0}
                  style={{ height: "100%", position: "relative" }}
                >
                  {/* dashboard_tab */}
                
                </div>
                <div
                  className="tab-pane fade container-fluid"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                  tabIndex={0}
                  style={{ height: "100%" }}
                >
                  {/* profile_tab */}
                  

                  <div className="row pb-5" style={{ width: "auto" }}>
                    <form>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Customer Name
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
                            : abc@gmsil.com
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Contact Number
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : +7923 234 343
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Trade Name
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : 12345
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Trade License Number
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : 000000
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          Trade License Expiry
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : 00 / 00 / 0000
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
                            : abc
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
                            : 00000
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="firstName"
                          className="col-sm-2 col col-form-label"
                        >
                          User ID
                        </label>
                        <div className="col">
                          <span
                            style={{ fontWeight: 500 }}
                            className="form-control-plaintext"
                          >
                            : abinschandran
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="tab-pane fade myList container-fluid p-2 pb-0"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                  tabIndex={0}
                >
                  {/* new_check_tab */}
                </div>
                <div
                  className="tab-pane fade container-fluid"
                  style={{ width: "100%" }}
                  id="v-pills-checkHistory"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                  tabIndex={0}
                >
                  {/* check_History_tab */}
                </div>
                <div
                  className="tab-pane fade mt-5"
                  id="v-pills-notifications"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                  tabIndex={0}
                >
                  {/* notification_tab */}
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profileaml;
