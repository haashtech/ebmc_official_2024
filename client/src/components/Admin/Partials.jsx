import React, { useState } from 'react';

function Partials() {
    
    const [isEtihadExpanded, setEtihadExpanded] = useState(false);
  const [isAMLExpanded, setAMLExpanded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleEtihadDropdown = () => {
    setEtihadExpanded(!isEtihadExpanded);
    setAMLExpanded(false); // Close the AML dropdown when Etihad is clicked
  };

  const toggleAMLDropdown = () => {
    setAMLExpanded(!isAMLExpanded);
    setEtihadExpanded(false); // Close the Etihad dropdown when AML is clicked
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
   <>
   <div className="container-scroller">
  {/* partial:partials/_sidebar.html */}
  <nav className="sidebar sidebar-offcanvas" id="sidebar">
    <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
      <a className="sidebar-brand brand-logo" href="index.html"><img src="assets/admin/images/logoforabinoragearrowetihad.svg" alt="logo" /></a>
      <a className="sidebar-brand brand-logo-mini" href="index.html"><img src="assets/admin/images/logoforabinoragearrowetihad.svg" alt="logo" /></a>
    </div>
    <ul className="nav">
      <li className="nav-item profile">
        {/* Profile dropdown */}
        <div className="profile-desc">
          <div className="profile-pic">
            {/* Profile picture goes here */}
          </div>
          {/* Profile dropdown menu */}
          <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
            {/* Profile dropdown items */}
            <a href="#" className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <div className="preview-icon bg-dark rounded-circle">
                  <i className="mdi mdi-settings text-primary" />
                </div>
              </div>
              <div className="preview-item-content">
                <p className="preview-subject ellipsis mb-1 text-small">
                  Account settings
                </p>
              </div>
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <div className="preview-icon bg-dark rounded-circle">
                  <i className="mdi mdi-onepassword text-info" />
                </div>
              </div>
              <div className="preview-item-content">
                <p className="preview-subject ellipsis mb-1 text-small">
                  Change Password
                </p>
              </div>
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item preview-item">
              <div className="preview-thumbnail" />
            </a>
          </div>
        </div>
      </li>
      <li className="nav-item menu-items">
        {/* Dashboard link */}
        <a className="nav-link" href="index.html">
          <span className="menu-icon">
            <i className="mdi mdi-speedometer" />
          </span>
          <span className="menu-title">Dashboard</span>
        </a>
      </li>
      {/* Etihad dropdown */}
     {/* Etihad dropdown */}
     <li className="nav-item menu-items">
        <a className="nav-link" onClick={toggleEtihadDropdown} aria-expanded={isEtihadExpanded ? 'true' : 'false'}>
          <span className="menu-icon">
            <i className="mdi mdi-laptop" />
          </span>
          <span className="menu-title">Etihad</span>
          <i className="menu-arrow" />
        </a>
        <div className={`collapse ${isEtihadExpanded ? 'show' : ''}`} id="ui-etihad">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              <a className="nav-link" href="#">News management</a>
            </li>
          </ul>
        </div>
      </li>

      {/* AML dropdown */}
      <li className="nav-item menu-items">
        <a className="nav-link" onClick={toggleAMLDropdown} aria-expanded={isAMLExpanded ? 'true' : 'false'} aria-controls="">
          <span className="menu-icon">
            <i className="mdi mdi-laptop" />
          </span>
          <span className="menu-title">AML</span>
          <i className="menu-arrow" />
        </a>
        <div className={`collapse ${isAMLExpanded ? 'show' : ''}`} id="ui-aml">
          <ul className="nav flex-column sub-menu">
            <li className="nav-item">
              <a className="nav-link" href="#">User Management</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Notification</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
  {/* partial */}
  <div className="container-fluid page-body-wrapper">
    {/* partial:partials/_navbar.html */}
    <nav className="navbar p-0 fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
        <a className="navbar-brand brand-logo-mini" href="index.html"><img src="assets/admin/images/logoforabinoragearrowetihad.svg" alt="logo" /></a>
      </div>
      <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span className="mdi mdi-menu" />
        </button>
        <ul className="navbar-nav w-100" />
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown d-none d-lg-block">
            {/* <a class="nav-link btn btn-success create-new-button" id="createbuttonDropdown" data-toggle="dropdown" aria-expanded="false" href="#">+ Create New Project</a> */}
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="createbuttonDropdown">
              <h6 className="p-3 mb-0">Projects</h6>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-file-outline text-primary" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Software Development
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-web text-info" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    UI Development
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-layers text-danger" />
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject ellipsis mb-1">
                    Software Testing
                  </p>
                </div>
              </a>
              <div className="dropdown-divider" />
              <p className="p-3 mb-0 text-center">See all projects</p>
            </div>
          </li>
          <li className="nav-item nav-settings d-none d-lg-block">
            <a className="nav-link" href="#">
              <i className="mdi mdi-view-grid" />
            </a>
          </li>
          <li className="nav-item dropdown border-left">
            <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
              <i className="mdi mdi-email" />
              <span className="count bg-success" />
            </a>
          </li>
          <li className="nav-item dropdown border-left">
            <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
              <i className="mdi mdi-bell" />
              <span className="count bg-danger" />
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
              <div className="dropdown-divider" />
            </div></li>
            <li className={`nav-item dropdown ${isDropdownOpen ? 'show' : ''}`}>
      <a
        className="nav-link"
        id="profileDropdown"
        href="#"
        onClick={handleDropdownToggle}
      >
        <div className="navbar-profile">
          <img
            className="img-xs rounded-circle"
            src="assets/admin/images/faces/download.png"
            alt=""
          />
          <p className="mb-0 d-none d-sm-block navbar-profile-name">Admin</p>
          <i className="mdi mdi-menu-down d-none d-sm-block" />
        </div>
      </a>
      <div
        className={`dropdown-menu dropdown-menu-right navbar-dropdown preview-list ${
          isDropdownOpen ? 'show' : ''
        }`}
        aria-labelledby="profileDropdown"
      >
        <h6 className="p-3 mb-0">Profile</h6>
        <div className="dropdown-divider" />
        <a className="dropdown-item preview-item">
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-settings text-success" />
            </div>
          </div>
          <div className="preview-item-content">
            <p className="preview-subject mb-1">Settings</p>
          </div>
        </a>
        <div className="dropdown-divider" />
        <a className="dropdown-item preview-item">
          <div className="preview-thumbnail">
            <div className="preview-icon bg-dark rounded-circle">
              <i className="mdi mdi-logout text-danger" />
            </div>
          </div>
          <div className="preview-item-content">
            <p className="preview-subject mb-1">Log out</p>
          </div>
        </a>
        {/* Add more dropdown items as needed */}
      </div>
    </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span className="mdi mdi-format-line-spacing" />
        </button>
      </div>
    </nav>
    {/* partial */}
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          <div className="col-12 grid-margin stretch-card" />
        </div>
      </div>
      {/* <div class="row">
<div class="col-md-4 grid-margin stretch-card">
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Transaction History</h4>
      <canvas
        id="transaction-history"
        class="transaction-chart"
      ></canvas>
      <div
        class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
      >
        <div class="text-md-center text-xl-left">
          <h6 class="mb-1">Transfer to Paypal</h6>
          <p class="text-muted mb-0">07 Jan 2019, 09:12AM</p>
        </div>
        <div
          class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0"
        >
          <h6 class="font-weight-bold mb-0">$236</h6>
        </div>
      </div>
      <div
        class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3"
      >
        <div class="text-md-center text-xl-left">
          <h6 class="mb-1">Tranfer to Stripe</h6>
          <p class="text-muted mb-0">07 Jan 2019, 09:12AM</p>
        </div>
        <div
          class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0"
        >
          <h6 class="font-weight-bold mb-0">$593</h6>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="col-md-8 grid-margin stretch-card">
  <div class="card">
    <div class="card-body">
      <div class="d-flex flex-row justify-content-between">
        <h4 class="card-title mb-1">Open Projects</h4>
        <p class="text-muted mb-1">Your data status</p>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="preview-list">
            <div class="preview-item border-bottom">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-primary">
                  <i class="mdi mdi-file-document"></i>
                </div>
              </div>
              <div class="preview-item-content d-sm-flex flex-grow">
                <div class="flex-grow">
                  <h6 class="preview-subject">
                    Admin dashboard design
                  </h6>
                  <p class="text-muted mb-0">
                    Broadcast web app mockup
                  </p>
                </div>
                <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                  <p class="text-muted">15 minutes ago</p>
                  <p class="text-muted mb-0">30 tasks, 5 issues</p>
                </div>
              </div>
            </div>
            <div class="preview-item border-bottom">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-success">
                  <i class="mdi mdi-cloud-download"></i>
                </div>
              </div>
              <div class="preview-item-content d-sm-flex flex-grow">
                <div class="flex-grow">
                  <h6 class="preview-subject">
                    Wordpress Development
                  </h6>
                  <p class="text-muted mb-0">Upload new design</p>
                </div>
                <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                  <p class="text-muted">1 hour ago</p>
                  <p class="text-muted mb-0">23 tasks, 5 issues</p>
                </div>
              </div>
            </div>
            <div class="preview-item border-bottom">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-info">
                  <i class="mdi mdi-clock"></i>
                </div>
              </div>
              <div class="preview-item-content d-sm-flex flex-grow">
                <div class="flex-grow">
                  <h6 class="preview-subject">Project meeting</h6>
                  <p class="text-muted mb-0">
                    New project discussion
                  </p>
                </div>
                <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                  <p class="text-muted">35 minutes ago</p>
                  <p class="text-muted mb-0">15 tasks, 2 issues</p>
                </div>
              </div>
            </div>
            <div class="preview-item border-bottom">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-danger">
                  <i class="mdi mdi-email-open"></i>
                </div>
              </div>
              <div class="preview-item-content d-sm-flex flex-grow">
                <div class="flex-grow">
                  <h6 class="preview-subject">Broadcast Mail</h6>
                  <p class="text-muted mb-0">
                    Sent release details to team
                  </p>
                </div>
                <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                  <p class="text-muted">55 minutes ago</p>
                  <p class="text-muted mb-0">35 tasks, 7 issues</p>
                </div>
              </div>
            </div>
            <div class="preview-item">
              <div class="preview-thumbnail">
                <div class="preview-icon bg-warning">
                  <i class="mdi mdi-chart-pie"></i>
                </div>
              </div>
              <div class="preview-item-content d-sm-flex flex-grow">
                <div class="flex-grow">
                  <h6 class="preview-subject">UI Design</h6>
                  <p class="text-muted mb-0">
                    New application planning
                  </p>
                </div>
                <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                  <p class="text-muted">50 minutes ago</p>
                  <p class="text-muted mb-0">27 tasks, 4 issues</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div> */}
      {/* <div class="row">
  <div class="col-sm-4 grid-margin">
    <div class="card">
      <div class="card-body">
        <h5>Revenue</h5>
        <div class="row">
          <div class="col-8 col-sm-12 col-xl-8 my-auto">
            <div class="d-flex d-sm-block d-md-flex align-items-center">
              <h2 class="mb-0">$32123</h2>
              <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
            </div>
            <h6 class="text-muted font-weight-normal">11.38% Since last month</h6>
          </div>
          <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
            <i class="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
          </div>
        </div>
      </div>
    </div>
  </div> */}
      {/* <div class="col-sm-4 grid-margin">
    <div class="card">
      <div class="card-body">
        <h5>Sales</h5>
        <div class="row">
          <div class="col-8 col-sm-12 col-xl-8 my-auto">
            <div class="d-flex d-sm-block d-md-flex align-items-center">
              <h2 class="mb-0">$45850</h2>
              <p class="text-success ml-2 mb-0 font-weight-medium">+8.3%</p>
            </div>
            <h6 class="text-muted font-weight-normal"> 9.61% Since last month</h6>
          </div>
          <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
            <i class="icon-lg mdi mdi-wallet-travel text-danger ml-auto"></i>
          </div>
        </div>
      </div>
    </div>
  </div> */}
      {/* <div class="col-sm-4 grid-margin">
    <div class="card">
      <div class="card-body">
        <h5>Purchase</h5>
        <div class="row">
          <div class="col-8 col-sm-12 col-xl-8 my-auto">
            <div class="d-flex d-sm-block d-md-flex align-items-center">
              <h2 class="mb-0">$2039</h2>
              <p class="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
            </div>
            <h6 class="text-muted font-weight-normal">2.27% Since last month</h6>
          </div>
          <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
            <i class="icon-lg mdi mdi-monitor text-success ml-auto"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}
      {/* <div class="row">
<div class="col-12 grid-margin">
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">USERS</h4>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>
                <div class="form-check form-check-muted m-0"></div>
              </th>
              <th>Client Name</th>
              <th>Order No</th>
              <th>Product Cost</th>
              <th>Project</th>
              <th>Payment Mode</th>
              <th>Start Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <img
                  src="assets/admin/images/faces/face1.jpg"
                  alt="image"
                />
                <span class="pl-2">Henry Klein</span>
              </td>
              <td>02312</td>
              <td>$14,500</td>
              <td>Dashboard</td>
              <td>Credit card</td>
              <td>04 Dec 2019</td>
              <td>
                <div class="badge badge-outline-success">
                  Approved
                </div>
              </td>
            </tr>
            <tr>
              <td>
               
              </td>
              <td>
                <img
                  src="assets/admin/images/faces/face2.jpg"
                  alt="image"
                />
                <span class="pl-2">Estella Bryan</span>
              </td>
              <td>02312</td>
              <td>$14,500</td>
              <td>Website</td>
              <td>Cash on delivered</td>
              <td>04 Dec 2019</td>
              <td>
                <div class="badge badge-outline-warning">
                  Pending
                </div>
              </td>
            </tr>
            <tr>
              <td>
            
              </td>
              <td>
                <img
                  src="assets/admin/images/faces/face5.jpg"
                  alt="image"
                />
                <span class="pl-2">Lucy Abbott</span>
              </td>
              <td>02312</td>
              <td>$14,500</td>
              <td>App design</td>
              <td>Credit card</td>
              <td>04 Dec 2019</td>
              <td>
                <div class="badge badge-outline-danger">
                  Rejected
                </div>
              </td>
            </tr>
            <tr>
              <td>
            
              </td>
              <td>
                <img
                  src="assets/admin/images/faces/face3.jpg"
                  alt="image"
                />
                <span class="pl-2">Peter Gill</span>
              </td>
              <td>02312</td>
              <td>$14,500</td>
              <td>Development</td>
              <td>Online Payment</td>
              <td>04 Dec 2019</td>
              <td>
                <div class="badge badge-outline-success">
                  Approved
                </div>
              </td>
            </tr>
            <tr>
              <td>
               
              </td>
              <td>
                <img
                  src="assets/admin/images/faces/face4.jpg"
                  alt="image"
                />
                <span class="pl-2">Sallie Reyes</span>
              </td>
              <td>02312</td>
              <td>$14,500</td>
              <td>Website</td>
              <td>Credit card</td>
              <td>04 Dec 2019</td>
              <td>
                <div class="badge badge-outline-success">
                  Approved
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div> */}
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted d-block text-center text-sm-left d-sm-inline-block" />
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">© 2024 Etihad Business and Managment Consultancy LLC. All
            Rights Reserved Designed with ❤️<a href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">
              HAASH Technologies</a>
          </span>
        </div>
      </footer>
      {/* partial */}
    </div>
    {/* main-panel ends */}
  </div>
  {/* page-body-wrapper ends */}
</div>
<head>

<link
      rel="stylesheet"
      href="assets/admin/vendors/mdi/css/materialdesignicons.min.css"
    />
    <link rel="stylesheet" href="assets/admin/vendors/css/vendor.bundle.base.css" />
   
  
    <link
      rel="stylesheet"
      href="assets/admin/vendors/jvectormap/jquery-jvectormap.css"
    />
    <link
      rel="stylesheet"
      href="assets/admin/vendors/flag-icon-css/css/flag-icon.min.css"
    />
    <link
      rel="stylesheet"
      href="assets/admin/vendors/owl-carousel-2/owl.carousel.min.css"
    />
    <link
      rel="stylesheet"
      href="assets/admin/vendors/owl-carousel-2/owl.theme.default.min.css"
    />
 
    <link rel="stylesheet" href="assets/admin/css/style.css" />
</head>
   </>
  )
}

export default Partials