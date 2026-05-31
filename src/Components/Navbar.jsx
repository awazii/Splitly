import React, { useState } from "react";
import Logo from "../../public/splitly.png";
import Logofull from "../assets/splitly.png";
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
import { Updatef } from "./friends/Frienddetails/Updatef";
import { Basemodel } from "./basemodel";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
export const Navbar = () => {
  const Openmodel = () => setpopup(true)
  const Closemodel = () => setpopup(false)
  const [popup, setpopup] = useState(false)
  const [iscollapsed, setiscollapsed] = useState(false)
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
      className="relative group"
    >
      <nav className={`{"Navbar ${iscollapsed ? "w-20" : "w-65"} text-white "} trans`}>
        <div className={`logo-contaniner transition-all duration-300  ${iscollapsed ? "w-16 my-6" : "w-55 my-4"} mx-3 center-flex`}>
          <div className={`logo w-full ${iscollapsed ? "h-9" : "h-15"} relative `}>
            <img
              src={iscollapsed ? Logo : Logofull}
              alt="Logo"
              className={`logo ${iscollapsed ? "object-contain" : "object-cover"}  size-full`}
            />
          </div>
        {!iscollapsed && (
          <button
            title="Collapse sidebar"
            className="cursor-pointer w-8 p-1 trans rounded translate-x-2 opacity-0 absolute top-8 right-1 group-hover:opacity-100 group-hover:translate-x-0 nav-item text-2xl"
            onClick={() => setiscollapsed(true)}
          >
            <TbLayoutSidebarLeftCollapseFilled />
          </button>)}
        </div>
        <motion.ul
          className={`nav-list flex flex-col gap-4 mx-6  ${iscollapsed?"my-8" : "my-4"}`}
          variants={navbarVariants}
        >
           {iscollapsed && (
          <button
            title="Expand sidebar"
            className="cursor-pointer w-10 center-flex p-2 trans rounded nav-item text-2xl"
            onClick={() => setiscollapsed(false)}
          >
            <TbLayoutSidebarLeftExpandFilled />
          </button>)}
          {navlist.map((item, index) => (
            <motion.li key={index} variants={navitemVariants}>
              <NavLink
              title={item.label}
                className={({ isActive }) =>
                  `${isActive ? "active" : ""} flex p-2 ${iscollapsed ? "justify-center w-10" : "justify-start gap-5  w-full"} items-center rounded nav-item`
                }
                to={item.link}
              >
                <span className="icon text-2xl">{item.icon}</span>
               {!iscollapsed && <span className="label text-md font-medium">{item.label}</span>}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
        <div className="settings absolute bottom-8 left-6">
          <button className="setting-icon size-10 blurred center-flex rounded-2xl cursor-pointer" onClick={Openmodel}>
            <IoSettingsSharp className="size-6  rounded-md p-1" />
          </button>
        </div>
      </nav>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Update Admin Info">
        <Updatef friendId={"admin_01"}  Closemodel={Closemodel}/>
      </Basemodel>
    </motion.nav>
  );
};
