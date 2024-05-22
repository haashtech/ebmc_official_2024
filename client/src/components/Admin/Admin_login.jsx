import React from "react";
import Swal from "sweetalert2";
import "./Admin_login.css";
import adminAuthStore from "../../store/admin/adminAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Admin_login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const store = adminAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await store.login();
      // console.log("successfully login");
      navigate("/admin");
      window.location.reload();
    } catch (err) {
      // console.log("Login failed", err);
     
      setErrorMessage("Invalid username or password please try again");
    }
  };

  return (
    <>
      <div className="bgimage"></div>
      <div className="main">
        <form className="box" onSubmit={handleLogin}>
          <a href="/">
            <div className="logo">
              <img
                style={{ height: 26 }}
                src="/assets/images/logo/mobilesidelogo.svg"
                alt=""
              />
            </div>
          </a>
          <h3>Admin</h3>
          <input
            onChange={store.updateLoginForm}
            value={store.loginForm.username}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="off"
          />
          <input
            onChange={store.updateLoginForm}
            value={store.loginForm.password}
            type="password"
            name="password"
            id="pass"
            placeholder="Password"
            autoComplete="off"
          />
          <button id="login" disabled={loading}>
            {loading ? "Logging in ..." : "Login"}
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </div>
    </>
  );
}

export default Admin_login;
