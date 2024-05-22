import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";
// react icons
import {RiSettings2Fill} from "react-icons/ri";
import { IoLogOut } from 'react-icons/io5';


const SettingsDropdown = ({adminLogout}) => {
    const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (action) => {
    if (action === 'settings') {
      // Navigate to settings or perform settings action
      navigate("admincredentialmanagement")
    } else if (action === 'logout') {
      // Perform logout action
      adminLogout();
    }
    setIsOpen(false);
  };

  return (
    <div className="position-relative d-inline-block text-left" ref={dropdownRef}>
      <div>
      <Tooltip content="settings">
         <img
          src="/admin/assets/images/faces/download.png" // Replace with your avatar image URL
          alt="User Avatar"
          className="h-8 w-8 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
      </Tooltip>
       
      </div>

      {isOpen && (
        <div
          className="origin-top-right position-absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white border border-1 border-dark  focus-outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1 " role="none">
            <button
              className="text-gray-700 hover-overlay  border-0 outline-none md:text-[1.3rem] group text-[1rem] d-flex items-center gap-2 px-4 py-3  text-sm w-full text-left bg-white "
              role="menuitem"
              onClick={() => handleSelect('settings')}
            >
              <RiSettings2Fill className='settings-icon transform transition-transform duration-300 group-hover:rotate-180'/>
              Settings
            </button>
            <button
              className="text-gray-700 md:text-[1.3rem]  bg-white border-0 outline-none text-[1rem] d-flex items-center gap-2 px-4 py-3 text-sm w-full text-left  hover:bg-gray-100"
              role="menuitem"
              onClick={() => handleSelect('logout')}
            >
              <IoLogOut/>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
