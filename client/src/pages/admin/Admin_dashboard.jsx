import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";

function Admin_dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const adminLogout = async () => {
    try {
      await axios.get("/admin/logout");
      navigate("/loginadmin");
      // console.log("admin logout successfully");
    } catch (err) {
      console.error("error in logout", err);
    }
  };

  const [isDashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const [isEtihadDropdownOpen, setEtihadDropdownOpen] = useState(false);
  const [isAmlDropdownOpen, setAmlDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState([]);

  const fetchUserCount = async () => {
    try {
      const response = await axios.get("/admin/viewUsercount");
      // console.log("userCount-", response.data.count);
      setUserCount(response.data.count);
    } catch (error) {
      console.error("Error in fetching user Count", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/admin/viewusers");
      // console.log(response.data);
      setUsers(response.data.users);
      setIsLoading(false);
    } catch (err) {
      console.error("Error in fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserCount();
  }, []);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleDropdownToggle = (dropdown) => {
    switch (dropdown) {
      case "dashboard":
        setDashboardDropdownOpen(!isDashboardDropdownOpen);
        break;
      case "etihad":
        setEtihadDropdownOpen(!isEtihadDropdownOpen);
        break;
      case "aml":
        setAmlDropdownOpen(!isAmlDropdownOpen);
        break;
      default:
        break;
    }
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className="container-scroller">
      {/* partial:partials/_sidebar.html */}
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <div className="sidebar-brand brand-logo">
           <a href='/'>
           <img
              src="/admin/assets/images/logoforabinoragearrowetihad.svg"
              alt="logo"
            />
           </a>
          </div>
          <div className="sidebar-brand brand-logo-mini">
            <img
              src="/admin/assets/images/logoforabinoragearrowetihad.svg"
              alt="logo"
            />
          </div>
        </div>
        <ul className="nav">
          {/* Profile dropdown */}
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                {/* Profile picture goes here */}
              </div>
              <div
                className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list"
                aria-labelledby="profile-dropdown"
              >
                {/* Profile dropdown items */}
                <div className="dropdown-item preview-item">{/* ... */}</div>
                <div className="dropdown-divider" />
                <div className="dropdown-item preview-item">{/* ... */}</div>
                <div className="dropdown-divider" />
                <div className="dropdown-item preview-item">{/* ... */}</div>
              </div>
            </div>
          </li>

          {/* Dashboard dropdown */}
          <li className="nav-item menu-items">
            <Link to="/admin" className="nav-link">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer" />
              </span>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>

          {/* Etihad dropdown */}
          <li className="nav-item menu-items">
            <div
              className="nav-link"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="ui-etihad"
              onClick={() => handleDropdownToggle("etihad")}
            >
              <span className="menu-icon">
                <i className="mdi mdi-laptop" />
              </span>
              <span className="menu-title">Etihad</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={isEtihadDropdownOpen}>
              <div className="collapse">
                <div className="nav flex-column sub-menu">
                  <div className="nav-item">
                    <Link to="/adminnewsmanagement" className="nav-link">
                      News management
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link to="/admincareermanagement" className="nav-link">
                      {" "}
                      Career management{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </Collapse>
          </li>

          {/* AML dropdown */}
          <li className="nav-item menu-items">
            <div
              className="nav-link"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="ui-aml"
              onClick={() => handleDropdownToggle("aml")}
            >
              <span className="menu-icon">
                <i className="mdi mdi-laptop" />
              </span>
              <span className="menu-title">AML</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={isAmlDropdownOpen}>
              <div className="collapse" id="ui-aml">
                <div className="nav flex-column sub-menu">
                  <div className="nav-item">
                    <Link to="/adminusermanagement" className="nav-link">
                      {" "}
                      User Management
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link
                      to="/adminnotificationmanagement"
                      className="nav-link"
                    >
                      Notification
                    </Link>
                  </div>
                  {/* Add other AML dropdown items here */}
                </div>
              </div>
            </Collapse>
          </li>
        </ul>
      </nav>
      {/* partial */}
      <div className="container-fluid page-body-wrapper">
        {/* partial:partials/_navbar.html */}
        <nav className="navbar p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
            <a className="navbar-brand brand-logo-mini" href="index.html">
              <img
                src="/admin/assets/images/logoforabinoragearrowetihad.svg"
                alt="logo"
              />
            </a>
          </div>
          <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            {/* <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-toggle="minimize"
            >
              <span className="mdi mdi-menu" />
            </button> */}
            <ul className="navbar-nav w-100" />
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item dropdown d-none d-lg-block">
                {/* <a class="nav-link btn btn-success create-new-button" id="createbuttonDropdown" data-toggle="dropdown" aria-expanded="false" href="#">+ Create New Project</a> */}
                <div
                  className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                  aria-labelledby="createbuttonDropdown"
                >
                  <h6 className="p-3 mb-0">Projects</h6>
                  <div className="dropdown-divider" />

                  <div className="dropdown-divider" />

                  <div className="dropdown-divider" />

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
                <a
                  className="nav-link count-indicator dropdown-toggle"
                  id="messageDropdown"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-email" />
                  <span className="count bg-success" />
                </a>
              </li>
              <li className="nav-item dropdown border-left">
                <a
                  className="nav-link count-indicator dropdown-toggle"
                  id="notificationDropdown"
                  href="#"
                  data-toggle="dropdown"
                >
                  <i className="mdi mdi-bell" />
                  <span className="count bg-danger" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                  aria-labelledby="notificationDropdown"
                >
                  <div className="dropdown-divider" />
                </div>
              </li>
              <li className="nav-item dropdown">
                <div
                  className="nav-link"
                  id="profileDropdown"
                  href="#"
                  data-toggle="dropdown"
                  onClick={handleSettingsClick}
                >
                  <div className="navbar-profile" style={{ cursor: "pointer" }}>
                    <img
                      className="img-xs rounded-circle"
                      src="/admin/assets/images/faces/download.png"
                      alt=""
                    />
                    <p className="mb-0 d-none d-sm-block navbar-profile-name">
                      Admin
                    </p>
                    <i className="mdi mdi-menu-down d-none d-sm-block" />
                  </div>
                </div>
                <div
                  className={`dropdown-menu dropdown-menu-right navbar-dropdown preview-list ${
                    showSettings ? "show" : ""
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
                      <Link to="/admincredentialmanagement">
                        <p
                          className="preview-subject mb-1"
                          style={{ color: "white" }}
                        >
                          Settings
                        </p>
                      </Link>
                    </div>
                  </a>
                  <div className="dropdown-divider" />
                  <div className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-logout text-danger" />
                      </div>
                    </div>
                    <div onClick={adminLogout} className="preview-item-content">
                      <p className="preview-subject mb-1">Log out</p>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <p className="p-3 mb-0 text-center">Advanced settings</p>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <span className="mdi mdi-format-line-spacing" />
            </button>
          </div>
        </nav>
        {/* partial */}
        <div className="main-panel">
          <div className="row">
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card"></div>
            </div>
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">AML USERS : {userCount}</h4>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>{/* Table headers */}</thead>
                      <tbody>
                        {users && users.length > 0 ? (
                          <>
                            <tr>
                              <th>CompanyName</th>
                              <th>CheckLimit</th>
                              <th>Used Checks</th>
                              <th>Remaining Checks</th>
                              {/* Add more headings as needed */}
                            </tr>
                            {users.map((user) => (
                              <tr key={user._id}>
                                <td>{user.companyName}</td>
                                <td>{user.checkLimit}</td>
                                <td>{user.apiUsage}</td>
                                <td
                                  style={{
                                    color:
                                      user.checkLimit - user.apiUsage <= 5
                                        ? "red"
                                        : "inherit",
                                  }}
                                >
                                  {user.checkLimit - user.apiUsage}
                                </td>

                                <td></td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan="4">No users available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer
            style={{
              backgroundColor: "transparent",
              position: "fixed",
              bottom: 0,
              width: "55%",
            }}
            className="footer"
          >
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block" />
              <div className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                © 2024 Etihad Business and Management Consultancy LLC. All
                Rights Reserved Designed with ❤️ Haash Technplogies
              </div>
            </div>
          </footer>

          {/* partial */}
        </div>
        {/* news management start */}
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
}

export default Admin_dashboard;
