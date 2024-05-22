import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
// react icons
import { IoIosNotifications, IoMdMailUnread } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
// import { RiLayoutGridFill} from "react-icons/ri";
import SettingsDropdown from "./SettingsDropdown";
import AmlTable from "./AmlTable";
import AmlTableAdmin from "./table/AmlTableAdmin";
import { MdOutlineScubaDiving } from "react-icons/md";

function Admin({handleSidebar}) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState([]);
  //  const [toggle,setToggle] = useState(false);

  const adminLogout = async () => {
    try {
      await axios.get("/admin/logout");
      navigate("/loginadmin");
      // console.log("admin logout successfully");
    } catch (err) {
      console.error("error in logout", err);
    }
  };

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

//  const handleSidebar = () => {
//   setToggle(!toggle)
//  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
     {/* <div className="lg:flex min-h-[100vh]">
    
      <AdminSideBar toggle={toggle} handleSidebar={handleSidebar}/> */}

      {/* 2nd block */}
      {/* <div className="flex-1 "> */}
        {/* <nav className="py-3  w-full flex justify-end shadow">
          <ul className="flex justify-center items-center gap-4 text-2xl me-10">
            
            <li className="border-r border-gray-300 pr-3 cursor-pointer">
              <IoMdMailUnread />
            </li>
            <li className=" pr-3 cursor-pointer">
              <IoIosNotifications />
            </li>
            <li className="">
             <SettingsDropdown adminLogout={adminLogout}/>
            </li>
            
            <li className="cursor-pointer" onClick={handleSidebar}>
            <CiMenuFries />
            </li>
          </ul>
        </nav> */}

        {/* AML USER TABLE  */}
        <div className="mt-5">
        <h1 className="text-center font-bold py-10 text-lg">AML USERS : {userCount}</h1>
          <AmlTableAdmin users={users}/>
        </div>
      {/* </div> */}
    {/* </div> */}
    </>
   
  );
}

export default Admin;
