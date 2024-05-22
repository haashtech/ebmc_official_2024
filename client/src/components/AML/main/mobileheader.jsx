import React from 'react'

function mobileheader() {
  return (
    <>
  <div
    className="mobile-header mobile-header-4 d-block d-lg-none homepagesmall"
    style={{
      backgroundColor: "rgba(237, 237, 237, 0.978)",
      backdropFilter: "blur(10px)",
      position: "relative"
    }}
  >
    <div className="container-fluid">
      <div className="col-12">
        <div className="mobile-header-elements">
          <div className="mobile-logo">
            <a href="/ndex.html">
              <img
                className="img-fluid p-1"
                style={{ height: 56 }}
                src="/asset/images/logo/pnglogo-02-01.png"
                alt=""
              />
            </a>
          </div>
          <div
            style={{ borderColor: "black" }}
            className="mobile-nav-icon dots-menu"
          >
            <i style={{ color: "black" }} className="fa-solid fa-bars" />
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
          alt=""
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
          <iconify-icon className="pe-3" icon="radix-icons:dashboard" />
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
          <iconify-icon className="pe-3" icon="healthicons:ui-user-profile" />
          Profile
        </div>
      </button>
      <hr className="m-0" />
      <button
        className="btnremove1 menu-close1 nav-link align-items-center d-flex py-4 pe-0"
        id="v-pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#v-pills-messages"
      >
        <div
          type="button"
          role="tab"
          aria-controls="v-pills-profile"
          aria-selected="false"
          className="d-flex align-items-center"
          style={{ textDecoration: "none", fontWeight: 500 }}
          href="/"
        >
          <iconify-icon className="pe-3" icon="ic:round-plus" />
          New Check
        </div>
      </button>
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
          href="/"
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
          href="/"
        >
          <iconify-icon className="pe-3" icon="mi:notification" />
          Notifications
        </div>
      </button>
      <hr className="m-0" />
    </div>
    <div className="col logout p-4" id="logout" style={{ paddingTop: 40 }}>
      <a href="/">
        <img src="/asset/images/icons/logout_icon.svg" alt="" />
        logout
      </a>
    </div>
  </div>
</>

  )
}

export default mobileheader