import React, { useState } from "react";
import Logo from "../assets/splitly.png";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiExpense } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";
import { FaCalculator } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { navbarVariants, navitemVariants } from "../utils/animation";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate()
  const [navlist] = useState([
    { icon: <MdSpaceDashboard />, label: "Dashboard", link: "/" },
    { icon: <FaUserFriends />, label: "Friends", link: "/Friends" },
    { icon: <HiMiniUserGroup />, label: "Groups", link: "/Groups" },
    { icon: <GiExpense />, label: "Expenses", link: "/Expenses" },
    { icon: <MdAnalytics />, label: "Analytics", link: "/Analytics" },
    { icon: <FaCalculator />, label: "Spliter", link: "/Spliter" },
  ]);

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <nav className="Navbar w-65 text-white">
        <div className="logo-contaniner m-6 flex justify-center items-start">
          <div className="logo w-60 h-15">
            <img
              src={Logo}
              alt="Logo"
              className="logo object-cover w-full h-full"
            />
          </div>
        </div>
        <motion.ul
          className="nav-list flex flex-col gap-4 m-6"
          variants={navbarVariants}
        >
          {navlist.map((item, index) => (
            <motion.li key={index} variants={navitemVariants}>
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "active" : ""} flex p-2 w-full gap-5 items-center rounded nav-item`
                }
                to={item.link}
              >
                <span className="icon text-2xl">{item.icon}</span>
                <span className="label text-md font-medium">{item.label}</span>
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
        <div className="settings absolute bottom-8 left-6">
          <button className="setting-icon size-10 blurred center-flex rounded-2xl cursor-pointer" onClick={()=>{
            navigate("/NewUser")
          }}>
            <IoSettingsSharp className="size-6  rounded-md p-1" />
          </button>
        </div>
      </nav>
    </motion.nav>
  );
};
