import React,{useState} from 'react'
import { motion } from "framer-motion";
import { MdOutlineDateRange } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { indicators } from '../../../pages/friends/Friendslist';
import { headerVariants, pageContainerVariants, cardVariants } from "../../../utils/animation";
import {Basemodel} from '../../basemodel'
import {selectAllGroups} from '../../../store/GroupSlice'
import { useSelector } from 'react-redux';
import { Groupinvolved } from './Groupinvolved';
import { FaBan } from "react-icons/fa";
export const Aboutf = ({ CurrentFriend }) => {
  const groups = useSelector(selectAllGroups);
  const friendGroups = groups.filter(group => CurrentFriend.crews.groups.includes(group.id));
 const [isopen, setisopen] = useState(false)
 const Openmodel = () => setisopen(true)
 const Closemodel = () => setisopen(false)
  const overvuewData = [
    {
      label: "Net Balance",
      icon: FaMoneyBillTransfer,
      textColor: indicators[CurrentFriend.netBalance.indicatorid].balancetextClass,
      Netbalance: CurrentFriend.netBalance.total,
    },
    {
      label: "Total Spending",
      value: `Rs. ${CurrentFriend.spendings.toLocaleString()}`,
      icon: IoCard,
      textColor: "text-green-600",
    },
    {
      label: "Groups Involved",
      value: CurrentFriend.crews.groupCount,
      icon: MdGroup,
      textColor: "text-primary",
    },
    {
      label: "Joined Date",
      value: CurrentFriend.joinedDate,
      icon: MdOutlineDateRange,
      textColor: "text-sky-600",
    },
  ];

  return (
    <div className='size-full card-b rounded-lg p-4 shadow'>
      <motion.h2
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className='text-2xl font-semibold'
      >
        About Friend
      </motion.h2>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="about-f center-flex flex-col gap-2"
      >
        <div className={`logo rounded-full size-34 center-flex ${CurrentFriend.isBanned ? "border-red-500" : "border-primary"} border-3 relative`}>
          <img src={CurrentFriend.Image} className='Img-c p-1' alt="profile-image" />
          <div className={`absolute top-9/12 left-1 p-3 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${CurrentFriend.isBanned ? "block" : "hidden"}`}>
                              <FaBan className="size-4" />
                          </div>
        </div>
        <div className="info center-flex flex-col">
          <h3 className='font-semibold text-2xl'>
            {`${CurrentFriend.Name}`}{" "}
            <span className='text-text-secondary text-lg'>
              {CurrentFriend.id === "admin_01" ? " (Admin)" : ""}
            </span>
          </h3>
          <p className={`${CurrentFriend.isBanned ? "text-red-500 font-semibold" : "text-text-secondary"} text-lg`}>
            {CurrentFriend.isBanned ? "(Banned)" : CurrentFriend.Bio}
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
        className='overview-data p-3 space-y-2 grid grid-cols-2 grid-rows-2 gap-x-3'
      >
        {overvuewData.map((data, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className='overview-item center-flex gap-3 bg-white rounded-lg shadow h-15'
          >
            <div className="icon size-11 rounded-full center-flex bg-lightest w-12">
              <data.icon className={`${data.textColor} size-7`} />
            </div>
            <div className="info flex-col flex-1">
              <h4 className='font-semibold'>{data.label}</h4>
              {data.label === "Groups Involved"  ? (
                <button className={`underline cursor-pointer text-sm text-primary font-semibold`} onClick={Openmodel}>
                  {data.value}
                </button>
              ) : (
                <p
                  className={`text-sm ${
                    data.Netbalance ? data.textColor : "text-text-secondary"
                  } font-semibold`}
                >
                  {data.value
                    ? data.value
                    : data.Netbalance !== 0
                    ? "Rs. " + Math.abs(data.Netbalance).toLocaleString()
                    : "Rs. " + Math.abs(data.Netbalance).toLocaleString() + " (settled)"}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <Basemodel isOpen={isopen} Closemodel={Closemodel} title={"Groups Involved"}>
       <Groupinvolved friendGroups={friendGroups} friend = {CurrentFriend} />
      </Basemodel>
    </div>
  );
};
