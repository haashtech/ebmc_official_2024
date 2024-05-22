import React, { useEffect, useState } from "react";
import adminAuthStore from "../store/admin/adminAuthStore";
import { useNavigate, Link } from "react-router-dom";



import Loader from "./Loader";
export default function AdminRequireauth(props) {

  const navigate = useNavigate();
  const store = adminAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await store.checkAuth();

      if (store.loggedIn === null) {
      } else if (store.loggedIn === false) {
        navigate("loginadmin");
       
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!store.loggedIn) {
    return (
      <div style={{ textAlign: "center", padding: "20px", marginTop: "250px" }}>
        <h2 style={{ color: "red" }}>Protected Page</h2>
        <p style={{ fontSize: "18px" }}>
          This is a protected page. Only authenticated users can access it.
        </p>
        <p style={{ textAlign: "center" }}>
          Please{" "}
          <Link
            to="loginadmin"
            style={{ color: "blue", fontFamily: "monospace" }}
          >
            login
          </Link>{" "}
          with correct credentials to access this page.
        </p>
      </div>
    );
  }

  return <div>{props.children}</div>;
}
