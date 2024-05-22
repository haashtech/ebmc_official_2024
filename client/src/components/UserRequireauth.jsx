import React, { useEffect, useState } from "react";
import authStore1 from "../store/user/authStore";
import { Navigate, useNavigate } from "react-router-dom";

export default function UserRequireAuth(props) {
  const navigate = useNavigate();
  const store = authStore1();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await store.checkAuth();

      if (store.loggedIn === null) {
      } else if (store.loggedIn === false) {
        navigate("/loginaml");
      }

      setLoading(false);
    };

    checkAuth();
  }, [store, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!store.loggedIn) {
    return <div>Please Login</div>;
  }

  return <div>{props.children}</div>;
}
