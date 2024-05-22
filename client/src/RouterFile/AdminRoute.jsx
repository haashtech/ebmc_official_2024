import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Admincredentialmanagement from '../pages/admin/Admincredentialmanagement';
import Adminnotificationmanagement from '../pages/admin/Adminnotificationmanagement';
import AdminRequireauth from '../components/AdminRequireauth';
import Admincareermanagement from '../pages/admin/Admincareermanagement';
import Adminusermanagement from '../pages/admin/Adminusermanagement';
import Admin from '../pages/admin/Admin';
import Adminnewsmanagement from '../pages/admin/Adminnewsmanagement';
import AdminLogin from '../pages/admin/AdminLogin';
import ErrorPage from '../pages/ErrorPage';
import AdminSideBar from '../pages/admin/AdminSideBar';
import { IoIosNotifications, IoMdMailUnread } from 'react-icons/io';
import SettingsDropdown from '../pages/admin/SettingsDropdown';
import { CiMenuFries } from 'react-icons/ci';
import axios from 'axios';

function AdminRoute() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  // const [isAdminLoggin, setIsAdminLoggin] = useState(false);

  const adminLogout = async () => {
    try {
      await axios.get("/admin/logout");
      navigate("loginadmin");
    } catch (err) {
      console.error("error in logout", err);
    }
  };

  const handleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <div className="lg:flex min-h-[100vh]">
     <AdminSideBar toggle={toggle} handleSidebar={handleSidebar} />
      <div className="flex-1">
        <nav className="py-3 w-full flex justify-end shadow">
          <ul className="d-flex list-unstyled justify-center items-center gap-4 text-2xl me-10">
            <li className="border-r border-gray-300 pr-3 cursor-pointer">
              <IoMdMailUnread />
            </li>
            <li className="pr-3 cursor-pointer">
              <IoIosNotifications />
            </li>
            <li>
              <SettingsDropdown adminLogout={adminLogout} />
            </li>
            <li className="cursor-pointer" onClick={handleSidebar}>
              <CiMenuFries />
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="loginadmin" element={<AdminLogin />} />
          <Route
            path=""
            element={
              <AdminRequireauth >
                <Admin />
              </AdminRequireauth>
            }
          />
          <Route
            path="adminnewsmanagement"
            element={
              <AdminRequireauth>
                <Adminnewsmanagement />
              </AdminRequireauth>
            }
          />
          <Route
            path="admincareermanagement"
            element={
              <AdminRequireauth>
                <Admincareermanagement />
              </AdminRequireauth>
            }
          />
          <Route
            path="adminusermanagement"
            element={
              <AdminRequireauth>
                <Adminusermanagement />
              </AdminRequireauth>
            }
          />
          <Route
            path="adminnotificationmanagement"
            element={<Adminnotificationmanagement />}
          />
          <Route
            path="admincredentialmanagement"
            element={
              <AdminRequireauth>
                <Admincredentialmanagement />
              </AdminRequireauth>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminRoute;
