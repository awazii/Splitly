import React, { useRef, useEffect, useState } from 'react'
import Input from '../../Components/Common/Input'
import Button from '../../Components/Common/searchbtn'
import { TbPinnedFilled } from "react-icons/tb";
import { FaChevronDown, FaUserFriends } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import FriendCard from "../../Components/friends/FriendCard"
import { useSelector, useDispatch } from 'react-redux';
import { updateFriend, selectAllFriends, selectPinnedFriends } from '../../store/FriendsSlice';
import { motion } from "framer-motion";
import { pageContainerVariants, itemVariants, cardVariants } from "../../utils/animation";
import { FilterHeader } from '../../Components/filter';
import { Basemodel } from "../../Components/basemodel";
import {FaBan} from "react-icons/fa";
import {
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiCheckBadge,
  HiBarsArrowDown,
  HiBarsArrowUp,
} from "react-icons/hi2";

export const indicators = {
  settled: {
    balancetextClass: "text-text-secondary",
    balancebgClass: "bg-text-secondary",
  },
  debtor: {
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
  },
  creditor: {
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
  }
}
export const friendsSorts = [
  {
    label: "New to Old",
    icon: (
      <HiBarsArrowDown
        size={18}
        className="text-[#3b82f6]"
      />
    ),
  },

  {
    label: "Old to New",
    icon: (
      <HiBarsArrowUp
        size={18}
        className="text-[#a855f7]"
      />
    ),
  },
];
export const friendsFilters = [
  {
    label: "All Settled",
    icon: (
      <HiCheckBadge
        size={18}
        className="text-[#9ca3af]"
      />
    ),
  },

  {
    label: "Positive Balance",
    icon: (
      <HiArrowTrendingUp
        size={18}
        className="text-[#22c55e]"
      />
    ),
  },

  {
    label: "Negative Balance",
    icon: (
      <HiArrowTrendingDown
        size={18}
        className="text-[#ef4444]"
      />
    ),
  },
];

export const Friendslist = () => {
  const Friends = useSelector(selectAllFriends);
  const pinnedFriends = useSelector(selectPinnedFriends);
  const dispatch = useDispatch();
  const Friendsrefs = useRef({});
  const Openmodel = () => setpopup(true)
  const Closemodel = () => setpopup(false)
  const [popup, setpopup] = useState(false)
  function Setref(el, i) {
    Friendsrefs.current[i] = el;
  }

  const hightlightFriend = (id) => {
    const el = Friendsrefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("highlight-glow");
    setTimeout(() => el.classList.remove("highlight-glow"), 3000);
  };
  function UnPin(friend) {
    dispatch(updatefriend({ id: friend.id, changes: { isPinned: false } }));
  }
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='Friends'
    >
      <motion.div variants={itemVariants} className='flex items-center justify-between mt-3'>
        <div className="search flex gap-4 py-2 items-center">
          <Input variant={"Friend"} />
          <Button />
        </div>
        <button className="filter bg-white shadow-md  p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex" onClick={Openmodel}>
          <CiFilter className='size-5 ' />
        </button>
      </motion.div>
      <motion.div variants={itemVariants} className="pinned-friends mt-2 p-2">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>
          Pinned <span><TbPinnedFilled className='rotate-45' /></span>
        </h2>
        {pinnedFriends.length > 0 && (<motion.div variants={pageContainerVariants} className="pinned-friends grid grid-cols-6 gap-3 border-b border-b-light pb-5">
          {pinnedFriends.map((friend, index) => (
            <motion.div key={friend.id} variants={cardVariants} className='pinned-friend bg-white shadow-md w-60 px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
              <div className="about flex center-flex gap-3">
                <div className={`profile size-20 rounded-full relative border-2 ${friend.isBanned ? "border-red-500" : "border-primary"} center-flex`}>
                  <img className='Img-c' src={friend.Image} alt="" />
                  <div className={`absolute top-9/12 left-1 p-2 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${friend.isBanned ? "block" : "hidden"}`}>
                    <FaBan className="size-2" />
                  </div>
                </div>
                <div className="info">
                  <h3 className="name text-text-primary text-md font-semibold">
                    {friend.Name} <span className='text-[12px]'>{friend.id === "admin_01" ? "(Admin)" : ""}</span>
                  </h3>
                  <h4 className={`bio ${friend.isBanned ? "text-red-500 font-semibold" : "text-text-secondary"} text-sm`}>
                    {friend.isBanned ? " (banned)" : friend.Bio}
                  </h4>
                </div>
                {friend.id !== "admin_01" && (
                  <div className='absolute right-0 top-0'>
                    <button
                      className='unpin-btn m-1 cursor-pointer text-lg text-primary font-bold rotate-45'
                      onClick={() => UnPin(friend)}
                    >
                      <TbPinnedFilled />
                    </button>
                    <span className='unpin transition duration-500 ease-in-out'>Unpin {friend.Name}</span>
                  </div>
                )}
              </div>
              <button
                className='view-m underline cursor-pointer text-text-muted border p-2 border-b-light rounded-2xl transition duration-300 ease-in-out center-flex hover:text-primary'
                onClick={() => hightlightFriend(friend.id)}
              >
                <FaChevronDown />
              </button>
            </motion.div>
          ))}
        </motion.div>)}
      </motion.div>
      <motion.div variants={itemVariants} className="friendslist-container min-h-60 border-b-light p-2">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>
          Friends <span><FaUserFriends /></span>
        </h2>
        {Friends.length > 0 && <motion.div variants={pageContainerVariants} className="friendslist grid grid-cols-4 gap-x-2 gap-y-2 mb-5">
          {Friends.map((friend) => (
            <motion.div key={friend.id} variants={cardVariants} ref={(el) => Setref(el, friend.id)}>
              <FriendCard friend={friend} />
            </motion.div>
          ))}
        </motion.div>}
      </motion.div>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Friend Filters">
        <FilterHeader Sorts={friendsSorts} Filters={friendsFilters} ActiveSort={"Old to New"} type="friend" />
      </Basemodel>
    </motion.div>
  )
}
