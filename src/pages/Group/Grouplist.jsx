import React, { useRef, useEffect ,useState } from 'react'
import Input from '../../Components/Common/Input'
import Button from '../../Components/Common/searchbtn'
import { HiMiniUserGroup } from "react-icons/hi2";
import GroupCard from '../../Components/Groups/GroupCard';
import { TbPinnedFilled } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllGroups, selectPinnedGroups, updateGroup } from '../../store/GroupSlice';
import { CategoryExtrator } from '../../utils/CategoryExtractor';
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import { RiGroupLine, RiPushpinLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { pageContainerVariants, itemVariants, cardVariants } from "../../utils/animation";
import { Basemodel } from '../../Components/basemodel';
import { FilterHeader } from '../../Components/filter';
import mountain from "../../assets/groups/mountain.jpg"
import beach from "../../assets/groups/Sea.jpg"
import concert from "../../assets/groups/concert.jpg"
import Restaurant from "../../assets/groups/Restaurant.jpg"
import Other from "../../assets/groups/default.jpg"
import {
  HiFire,
  HiCheckBadge,
  HiUsers,
  HiCurrencyDollar,
  HiBarsArrowDown,
  HiBarsArrowUp,
} from "react-icons/hi2";
export const groupSorts = [
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

  {
    label: "Most Members",
    icon: (
      <HiUsers
        size={18}
        className="text-[#06b6d4]"
      />
    ),
  },

  {
    label: "Most Amounts",
    icon: (
      <HiCurrencyDollar
        size={18}
        className="text-[#22c55e]"
      />
    ),
  },
];
export const groupFilters = [
  {
    label: "Active",
    icon: (
      <HiFire
        size={18}
        className="text-[#f97316]"
      />
    ),
  },

  {
    label: "Finished",
    icon: (
      <HiCheckBadge
        size={18}
        className="text-[#10b981]"
      />
    ),
  },
];

export const Groupcategories = [
  { id: "grp-001", variant: "Mountains", Img: mountain },
  { id: "grp-002", variant: "Beach", Img: beach },
  { id: "grp-003", variant: "Restaurant", Img: Restaurant },
  { id: "grp-004", variant: "Other", Img: Other },
  { id: "grp-005", variant: "Concert", Img: concert }
]
export const Grouplist = () => {
  const Groups = useSelector(selectAllGroups);
  const PinnedGroups = useSelector(selectPinnedGroups);
  const Groupsrefs = useRef({});
  const dispatch = useDispatch();
  const Openmodel = () => setpopup(true)
    const Closemodel = () => setpopup(false)
    const [popup, setpopup] = useState(false)
  function Setref(el, i) {
    Groupsrefs.current[i] = el;
  }

  const hightlightGroup = (id) => {
    const el = Groupsrefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("highlight-glow");
    setTimeout(() => el.classList.remove("highlight-glow"), 3000);
  };

  function UnPin(group) {
    dispatch(updateGroup({ id: group.id, changes: { isPinned: false } }));
  }
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className='Groups'
    >
      <motion.div variants={itemVariants} className='flex items-center justify-between mt-3'>
        <div className="search flex gap-4 py-2 items-center">
          <Input variant={"Group"} />
          <Button />
        </div>
        <button className="filter bg-white shadow-md  p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex" onClick={Openmodel}>
          <CiFilter className='size-5' />
        </button>
      </motion.div>
      <motion.div variants={itemVariants} className="pinned-groups-container mt-2 p-2">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>
          Pinned <span><TbPinnedFilled className='rotate-45' /></span>
        </h2>
        {PinnedGroups.length > 0 ? (
          <motion.div variants={pageContainerVariants} className="pinned-groups grid grid-cols-5 gap-3 border-b border-b-light pb-5">
            {PinnedGroups.map((group, index) => (
              <motion.div key={group.id} variants={cardVariants} className='pinned-friend bg-white shadow-md px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
                <div className="about flex items-center gap-3">
                  <div className="profile border size-19 rounded-full border-b-light">
                    <img className='Img-c' src={CategoryExtrator(group).Img} alt="" />
                  </div>
                  <div className="info w-45">
                    <h3 className="name text-text-primary text-md font-semibold line-clamp-1 w-full">{group.Name}</h3>
                    <p className='text-text-secondary text-sm'><span className='font-semibold'>{group.Members.length}</span> Members</p>
                    <p className='text-text-secondary text-sm'><span className='font-semibold'>{Number(group.totalAmount).toLocaleString()}</span> Total Expense</p>
                  </div>
                  <div className='absolute right-0 top-0'>
                    <button
                      className='unpin-btn m-1 cursor-pointer text-lg text-primary font-bold rotate-45'
                      onClick={() => UnPin(group)}
                    >
                      <TbPinnedFilled />
                    </button>
                    <span className='unpin transition duration-500 ease-in-out'>Unpin {group.Name}</span>
                  </div>
                </div>
                <button
                  className='view-m underline cursor-pointer text-text-muted border p-2 border-b-light rounded-2xl transition duration-300 ease-in-out center-flex hover:text-primary'
                  onClick={() => hightlightGroup(group.id)}
                >
                  <FaChevronDown />
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <UniversalEmptyState
            title="No pinned groups"
            description="Pin your favorite groups to keep them at the top of your list."
            textsize="text-sm"
          >
            <div className="p-8 shadow-md bg-gray-50 rounded-full">
              <RiPushpinLine className="size-8 text-primary" />
            </div>
          </UniversalEmptyState>
        )}
      </motion.div>
      <motion.div variants={itemVariants} className="friendslist-container min-h-60 border-b-light p-2">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>
          Groups <span><HiMiniUserGroup /></span>
        </h2>
        {Groups.length > 0 ? (
          <motion.div variants={pageContainerVariants} className="Grouppslist grid grid-cols-4 gap-x-3 gap-y-2 mb-5">
            {Groups.map((group) => (
              <motion.div key={group.id} variants={cardVariants} ref={(el) => Setref(el, group.id)}>
                <GroupCard group={group} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <UniversalEmptyState
            title="No groups yet"
            description="Create a group to start sharing expenses with your friends and family."
            textsize=""
          >
            <div className="p-10 shadow-md bg-gray-50 rounded-full">
              <RiGroupLine className="size-10 text-primary" />
            </div>
          </UniversalEmptyState>
        )}
      </motion.div>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Group Filters">
        <FilterHeader Sorts={groupSorts} Filters={groupFilters} ActiveSort={"New to Old"} type="group" />
        </Basemodel>
    </motion.div>
  )
}
