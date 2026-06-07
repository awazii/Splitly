import React, { useState } from 'react'
import { UniversalEmptyState } from './UniversalEmptyState';
import { RiHistoryLine } from "react-icons/ri";
import { pageContainerVariants, cardVariants, headerVariants } from "../utils/animation";
import { TbActivityHeartbeat } from "react-icons/tb";
import { IoPersonAddSharp, IoPersonRemoveSharp } from "react-icons/io5";
import { FaImages, FaBan, FaMoneyBillWave, FaSnowflake } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { HiMiniLanguage } from "react-icons/hi2";
import { TbFeather, TbEdit, TbUserCheck } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdGroupAdd, MdGroupRemove } from "react-icons/md";
import { motion } from "framer-motion";
import { CategoryExtrator } from '../utils/CategoryExtractor';
import { useSelector } from 'react-redux';
import { selectGroupById } from "../store/GroupSlice"
import { selectFriendById } from '../store/FriendsSlice';
import { HiChevronDown } from "react-icons/hi2";
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { Memberdetails } from '../utils/Memberdetails';
export const Recent = ({ h, d, activities, location }) => {
    const { Friend } = useParams();
  const [expandedId, setExpandedId] = useState(null);
  console.log(activities)
  const DescIconConfig = {
    add: <IoPersonAddSharp className="text-[#4caf50] size-5" />,
    image: <FaImages className="text-[#f68340] size-5" />,
    remove: <IoPersonRemoveSharp className="text-[#e53935] size-5" />,
    name: <HiMiniLanguage className="text-[#2196f3] size-5" />,
    bio: <TbFeather className="text-[#9c27b0] size-5" />,
    edit: <TbEdit className="text-[#607d8b] size-5" />,
    ban: <FaBan className="text-[#dd131d] size-5" />,
    unban: <TbUserCheck className="text-[#059669] size-5" />,
    transaction: <GrTransaction className="text-[#795548] size-5" />
  };
  const IconConfig = {
    transaction: {
      label: "Transaction",
      svg: <BsFillCreditCardFill className="text-white size-7" />,
      backgroundColor: "#f68340"
    },
    expense: {
      label: "Expense",
      svg: <FaMoneyBillWave className="text-white size-7" />,
      backgroundColor: "#4caf50"
    },
    settled: {
      label: "Settled",
      svg: <FaHandshakeSimple className="text-white size-7" />,
      backgroundColor: "#2196f3"
    },
    memberJoined: {
      label: "Member Joined",
      svg: <IoPersonAddSharp className="text-white size-7" />,
      backgroundColor: "#4caf50"
    },
    groupAdd: {
      label: "Group Added",
      svg: <MdGroupAdd className="text-white size-7" />,
      backgroundColor: "#4caf50"
    },
    groupRemoved: {
      label: "Group Removed",
      svg: <MdGroupRemove className="text-white size-7" />,
      backgroundColor: "#e53935"
    },
    frozen: {
      label: "Group Frozen",
      svg: <FaSnowflake className="text-white size-7" />,
      backgroundColor: "#00bcd4"
    },
    groupUpdate: {
      label: "Group Updated",
      svg: <TbEdit className="text-white size-7" />,
      backgroundColor: "#2196f3"
    }
  };
  return (
    <div className='recent-container w-full h-full'>
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="recent-header px-6 py-4 flex items-center justify-between flex-row-reverse"
      >
        <div className="logo w-fit rounded-lg p-2">
          <TbActivityHeartbeat className='text-primary size-9' />
        </div>
        <div className="headings">
          <h2 className='text-2xl font-semibold'>Recent Activities</h2>
          <p className='text-text-secondary text-sm'>
            {activities?.length > 0 ? `Last ${location === "dashboard" ? 20 : 10} Activities` : "No Recent Activity"}
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
        className={`activities space-y-3 grid place-items-center ${h} overflow-auto auto-rows-min`}
      >
        {activities?.length > 0 ? (
          activities.map((activity, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="activity w-[90%] h-fit rounded-lg flex gap-2 p-2 flex-row-reverse bg-white border-l"
            >
              <div className="logo-container m-2 col-span-1 center-flex justify-start">
                {activity.category !== "friend" ? (
                  <div
                    className="logo rounded-xl size-14 center-flex shadow-lg"
                    style={{ backgroundColor: (activity.selfTitle && location ==="friendpage")? IconConfig["memberJoined"]?.backgroundColor : IconConfig[activity.icon]?.backgroundColor }}
                  >
                    {(activity.selfTitle && location ==="friendpage") ? IconConfig["memberJoined"]?.svg :IconConfig[activity.icon]?.svg }
                  </div>
                ) : (
                  <div className='logo rounded-xl size-14 center-flex shadow-lg border-l'>
                    <img className='rounded-xl Img-c' src={activity.friendImages?.[activity.friends[0]]} alt="friend-img" />
                  </div>
                )}
              </div>
              <div className="Date-time-container w-22 flex flex-col items-center justify-center">
                <h2 className='font-semibold'>{dayjs(`${activity.Date} ${activity.Time}`, "YYYY-MM-DD HH:mm:ss").format("h:mm A")}</h2>
                <p className='text-sm text-text-secondary'>{activity.Date}</p>
              </div>
              <div className="content col-span-4 flex-1 p-2">
                <h3 className='font-semibold line-clamp-2 break-words'>{
                (activity.selfTitle && location ==="friendpage") ?`${Memberdetails(Friend)?.Name} joined the group`:
                activity.title}</h3>
                {activity.category === "group" ? (
                  <div className="group mt-1 center-flex w-fit gap-1">
                    <div className="logo size-8 rounded-full">
                      <img src={CategoryExtrator(activity.groupinfo)?.Img} className='Img-c' alt="" />
                    </div>
                    <div className="info">
                      <p className='text-sm text-text-secondary'>{activity.groupinfo.name}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className='about-expense mt-1 center-flex w-fit gap-1'>
                      <div className="logo size-8 rounded-full center-flex">
                        {DescIconConfig[activity.description.desIcon] || <TbActivityHeartbeat className="text-[#607d8b] size-5" />}
                      </div>
                      <div className="info">
                        <p className='text-sm'>{activity.description.title}</p>
                      </div>
                      {
                        activity.description.details && <button className='cursor-pointer ' onClick={() => setExpandedId(expandedId === activity.id ? null : activity.id)}>
                          <HiChevronDown className={`${expandedId===activity.id ? "rotate-360":"rotate-270"}`} />
                        </button>
                      }

                    </div>
                    {expandedId === activity.id && <div className='mt-1 border-t border-b-light w-fit '>          
                      {activity.description.details.map((des,index) => (

                        <div key={index} className='center-flex gap-2 w-full'>
                          <div className="logo size-8 rounded-full center-flex">
                            {DescIconConfig[des.desIcon] || <TbActivityHeartbeat className="text-[#607d8b] size-5" />}
                          </div>
                          <div className="info flex-1">
                            <p className='text-sm'>{des.title}</p>
                          </div>
                        </div>

                      ))}
                    </div>}
                  </>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div variants={cardVariants}>
            <UniversalEmptyState
              title="No Activity to Display"
              description={d}
              textsize="text-sm"
            >
              <div className="p-8 shadow-md border-l rounded-full">
                <RiHistoryLine className="size-8 text-primary" />
              </div>
            </UniversalEmptyState>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
