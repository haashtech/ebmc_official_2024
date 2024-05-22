import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineSpeed } from "react-icons/md";
import { IoLaptopOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";

function AdminSideBar({ toggle, handleSidebar }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const sidebarLinks = [
    {
      id: 1,
      title: "Dashboard",
      icon: <MdOutlineSpeed />,
      color: "text-success",
      path: "/admin",
    },
    {
      id: 2,
      title: "Etihad",
      icon: <IoLaptopOutline />,
      color: "text-primary",
      subLinks: [
        { id: 1, subtitle: "News management", subPath: "adminnewsmanagement" },
        {
          id: 2,
          subtitle: "Career management",
          subPath: "admincareermanagement",
        },
      ],
    },
    {
      id: 3,
      title: "AML",
      icon: <IoLaptopOutline />,
      color: "text-warning",
      subLinks: [
        {
          id: 1,
          subtitle: " User Management",
          subPath: "adminusermanagement",
        },
        {
          id: 2,
          subtitle: " Notification",
          subPath: "adminnotificationmanagement",
        },
      ],
    },
  ];

  const handleDropdown = (id) => {
    if (toggle) {
      setOpenDropdownId(openDropdownId === id ? null : id);
    } else {
      setOpenDropdownId(null);
      handleSidebar();
    }
  };

  return (
    <nav
      className={`${
        toggle ? "lg:w-72 w-fullres" : "lg:w-20 w-0 bg-[#2b313f]"
      } bg-[#191C24] shadow duration-500 z-50 shadow-sm-light resfixed`}
    >
      <div className="py-3 flex items-center justify-center">
        <a href="/" className="d-flex w-full justify-center items-center">
          <img
            src="/admin/assets/images/logoforabinoragearrowetihad.svg"
            alt="logo"
            width={"50%"}
            className=""
          />
        </a>

        <CiMenuFries
          className="cursor-pointer d-lg-none d-block mr-5 fs-1"
          onClick={handleSidebar}
        />
      </div>
      <div>
        <ul className="list-unstyled">
          {sidebarLinks.map((link) => (
            <React.Fragment key={link.id}>
              <li
                className="py-3 px-6 hover:bg-black rounded-e-full font-bold me-3 rounded-end cursor-pointer"
                onClick={() => handleDropdown(link.id)}
              >
                <div className="cursor-pointer d-flex align-items-center justify-content-between">
                  <div className="d-flex gap-2 align-items-center">
                    <span
                      className={`p-2 d-lg-block d-none bg-slate-300 rounded-circle ${link.color} text-xl`}
                    >
                      {link.icon}
                    </span>
                    <span
                      className={`p-2 d-lg-none d-block bg-slate-300 rounded-circle ${
                        link.color
                      } text-xl ${
                        !toggle && "scale-0"
                      } origin-left duration-100`}
                    >
                      {link.icon}
                    </span>
                    {link.id === 1 ? (
                      <Link
                        to={link.path}
                        className={`text-white text-decoration-none ${
                          !toggle && "scale-0"
                        } origin-left duration-100`}
                      >
                        {link.title}
                      </Link>
                    ) : (
                      <span
                        className={`${
                          !toggle && "scale-0"
                        } origin-left duration-300`}
                      >
                        {link.title}
                      </span>
                    )}
                  </div>
                  {link.subLinks && (
                    <RiArrowDropDownLine
                      className={`${
                        openDropdownId === link.id ? "rotate-180" : "rotate-0"
                      } duration-300 transition-all ms-auto`}
                    />
                  )}
                </div>
              </li>
              {toggle && openDropdownId === link.id && link.subLinks && (
                <ul className="pl-4 py-2 list-unstyled">
                  {link.subLinks.map((sub) => (
                    <li key={sub.id} className="py-1">
                      <Link
                        to={sub.subPath}
                        className="d-block text-white"
                        onClick={handleSidebar}
                      >
                        {sub.subtitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default AdminSideBar;
