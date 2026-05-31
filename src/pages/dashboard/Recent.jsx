import React from 'react'
import { LuActivity } from "react-icons/lu";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import mountain from "../../assets/groups/mountain.jpg"
import beach from "../../assets/groups/Sea.jpg"
import concert from "../../assets/groups/concert.jpg"
import Restaurant from "../../assets/groups/Restaurant.jpg"
import Other from "../../assets/groups/default.jpg"
import { IoPersonAddSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { HiMiniLanguage } from "react-icons/hi2";
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import { RiHistoryLine } from "react-icons/ri";
import { pageContainerVariants, cardVariants, headerVariants } from "../../utils/animation";
import { TbActivityHeartbeat } from "react-icons/tb";
import { motion } from "framer-motion";
export const Recent = ({ h ,d }) => {
    const recentActivites = []
    const groupiconConfig = [
        {
            label: "Credit Card",
            svg: <BsFillCreditCardFill className='text-white size-7' />,
            backgroundColor: "#f68340"
        },
        {
            label: "Money",
            svg: <FaMoneyBillWave className='text-white size-7' />,
            backgroundColor: "#4caf50"
        },
        {
            label: "Handshake",
            svg: <FaHandshakeSimple className='text-white size-7' />,
            backgroundColor: "#2196f3"
        },
        {
            label: "Member Left",
            svg: <IoPersonRemoveSharp className='text-white size-7' />,
            backgroundColor: "#e53935"
        },
        {
            label: "Member Joined",
            svg: <IoPersonAddSharp className='text-white size-7' />,
            backgroundColor: "#4caf50"
        },
    ];
    const friendiconConfig = [
        <IoPersonAddSharp className='text-[#4caf50] size-5' />,
        <FaImages className='text-[#f68340] size-5' />,
        <IoPersonRemoveSharp className='text-[#e53935] size-5' />,
        <HiMiniLanguage className='text-[#2196f3] size-5' />
    ]
    // const recentActivities = [
    //     {
    //         id: "activity1",
    //         about: "group",
    //         title: "Daud joined the group",
    //         date: "2025-11-18",
    //         time: "8:33 PM",
    //         logo: groupiconConfig[4],
    //         group: {
    //             img: beach,
    //             name: "trip to Sea View",
    //         }
    //     },
    //     {
    //         id: "activity2",
    //         about: "friend",
    //         title: "You removed Sheda as a friend",
    //         date: "2024-10-04",
    //         time: "6:10 PM",
    //         friendImg: sheda,
    //         description: "Friendship Ended",
    //         svg: friendiconConfig[2],
    //     },
    //     {
    //         id: "activity3",
    //         about: "group",
    //         title: "You paid Rs.500 to Saad",
    //         date: "2024-10-01",
    //         time: "2:30 PM",
    //         logo: groupiconConfig[0],
    //         group: {
    //             img: mountain,
    //             name: "Trip to Murree",
    //         }
    //     },
    //     {
    //         id: "activity4",
    //         about: "friend",
    //         title: "Awazii changed there profile pic",
    //         date: "2024-10-04",
    //         time: "5:45 PM",
    //         friendImg: awazii,
    //         description: "Old Photo replaced",
    //         svg: friendiconConfig[1],
    //     },
    //     ,
    //     {
    //         id: "activity5",
    //         about: "friend",
    //         title: "daud changed their name",
    //         date: "2024-10-04",
    //         time: "7:30 PM",
    //         friendImg: daud,
    //         description: "from 'daud' to 'Adv.Daud'",
    //         svg: friendiconConfig[3],
    //     },
    //     {
    //         id: "activity6",
    //         about: "group",
    //         title: "Arshman has been removed",
    //         date: "2024-10-03",
    //         time: "4:15 PM",
    //         logo: groupiconConfig[3],
    //         group: {
    //             img: Restaurant,
    //             name: "Dinner at Skyline Grills",
    //         }
    //     },
    //     {
    //         id: "activity7",
    //         about: "friend",
    //         title: "You added Saad as a Friend",
    //         date: "2025-11-18",
    //         time: "8:33 PM",
    //         friendImg: saad,
    //         description: "New friend added",
    //         svg: friendiconConfig[0],
    //     },
    //     {
    //         id: "activity8",
    //         about: "group",
    //         title: "You settled up with Daud",
    //         date: "2024-10-04",
    //         time: "5:45 PM",
    //         logo: groupiconConfig[2],
    //         group: {
    //             img: Other,
    //             name: "Weekend Hangout",
    //         }
    //     },
    //     {
    //         id: "activity9",
    //         about: "group",
    //         title: "Alice added a new expense",
    //         date: "2024-10-02",
    //         time: "3:00 PM",
    //         logo: groupiconConfig[1],
    //         group: {
    //             img: concert,
    //             name: "Live Concert Night",
    //         }
    //     },
    // ];
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
            {recentActivites.length > 0 ? "Last 10 Activities" : "No Recent Activity"}
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={pageContainerVariants}
        initial="hidden"
        animate="visible"
        className={`activities space-y-3 grid place-items-center ${h} overflow-auto`}
      >
        {recentActivites.length > 0 ? (
          recentActivites.map((activity, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="activity w-115 shadow-md h-22 rounded-lg flex gap-2 p-2 flex-row-reverse bg-white"
            >
              <div className="logo-container m-2 col-span-1 center-flex justify-start">
                {activity.about === "group" ? (
                  <div
                    className="logo rounded-xl size-14 center-flex shadow-lg"
                    style={{ backgroundColor: activity.logo.backgroundColor }}
                  >
                    {activity.logo.svg}
                  </div>
                ) : (
                  <div className='logo rounded-xl size-14 center-flex shadow-lg'>
                    <img className='rounded-lg Img-c' src={activity.friendImg} alt="friend-img" />
                  </div>
                )}
              </div>
              <div className="Date-time-container w-22 flex flex-col items-center justify-center">
                <h2 className='font-semibold'>{activity.time}</h2>
                <p className='text-sm text-text-secondary'>{activity.date}</p>
              </div>
              <div className="content col-span-4 flex-1 p-2">
                <h3 className='text-md font-semibold'>{activity.title}</h3>
                {activity.about === "group" ? (
                  <div className="group mt-1 center-flex w-fit gap-1">
                    <div className="logo size-8 rounded-full">
                      <img src={activity.group.img} className='Img-c' alt="" />
                    </div>
                    <div className="info">
                      <p className='text-sm text-text-secondary'>{activity.group.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className='about-expense mt-1 center-flex w-fit gap-1'>
                    <div className="logo size-8 rounded-full center-flex">
                      {activity.svg}
                    </div>
                    <div className="info">
                      <p className='text-sm'>{activity.description}</p>
                    </div>
                  </div>
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
