import React, { useRef } from 'react'
import Input from '../Input'
import Button from '../searchbtn'
import { HiMiniUserGroup } from "react-icons/hi2";
import GroupCard from './GroupCard';
import mountain from "../../assets/groups/mountain.jpg"
import beach from "../../assets/groups/Sea.jpg"
import concert from "../../assets/groups/concert.jpg"
import Restaurant from "../../assets/groups/Restaurant.jpg"
import Other from "../../assets/groups/default.jpg"
import saad from "../../assets/saad.jpg"
import zuzu from "../../assets/zuzu.png"
import awazii from "../../assets/awazii.jpg"
import daud from "../../assets/daud.jpg"
import arshman from "../../assets/arshman.jpg"
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinnedOff } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { categories } from '../Expenses/Expense';
export const groups = [
  {
    id: "grp-001",
    variant: "Mountains",
    Img: mountain,
    name: "Trip to Murree",
    members: "44",
    expenses: "4500",
    status: {
      text: "Active",
      textColor: "#16A34A",
      bgColor: "#2FA85A"
    },
    top_spender: {
      name: "Awazii",
      img: awazii
    },
    recent_activity: "Bought snacks and water bottles",
    date: "2025-10-12T14:30:00Z",
    recent_expense: {
      amount: "800",
      expense: "Snacks & Water",
      category: {
        date: "2-Oct-2025",
        gradient: categories[0].gradient,
        icon: categories[0].icon,
      }
    }
  },
  {
    id: "grp-002",
    variant: "Beach",
    Img: beach,
    name: "Trip to Sea View",
    members: "28",
    expenses: "3200",
    status: {
      text: "Terminated",
      textColor: "#DC2626",
      bgColor: "#FF4C4C"
    },
    top_spender: {
      name: "Daud Khalid",
      img: daud
    },
    recent_activity: "Paid for beach umbrellas",
    date: "2025-09-28T11:00:00Z",
    recent_expense: {
      amount: "600",
      expense: "Beach Umbrellas",
      category: {
        date: "28-Sep-2025",
        gradient: categories[5].gradient,
        icon: categories[5].icon,
      }
    }
  },
  {
    id: "grp-003",
    variant: "Restaurant",
    Img: Restaurant,
    name: "Dinner at Skyline Grills",
    members: "12",
    expenses: "8700",
    status: {
      text: "Finished",
      textColor: "#B45309",
      bgColor: "#FF6B35"
    }
    ,
    top_spender: {
      name: "Arshman Zafar",
      img: arshman
    },
    recent_activity: "Covered dessert and drinks",
    date: "2025-10-05T20:15:00Z",
    recent_expense: {
      amount: "1500",
      expense: "Dessert & Drinks",
      category: {
        gradient: categories[1].gradient,
        icon: categories[1].icon,
        date: "5-Oct-2025",
      }
    }
  },
  {
    id: "grp-004",
    variant: "Other",
    Img: Other,
    name: "Weekend Hangout",
    members: "36",
    expenses: "2900",
    status: {
      text: "Active",
      textColor: "#16A34A",
      bgColor: "#2FA85A"
    },
    top_spender: {
      name: "Zuzu",
      img: zuzu
    },
    recent_activity: "Booked bowling alley",
    date: "2025-10-18T17:45:00Z",
    recent_expense: {
      amount: "700",
      expense: "Bowling Alley",
      category: {
        name: categories[5].name,
        gradient: categories[5].gradient,
        icon: categories[5].icon,
        date: "18-Oct-2025",
      }
    }
  },
  {
    id: "grp-005",
    variant: "Concert",
    Img: concert,
    name: "Live Concert Night",
    members: "51",
    expenses: "10200",
    status: {
      text: "Terminated",
      textColor: "#DC2626",
      bgColor: "#FF4C4C"
    },
    top_spender: {
      name: "Saad Khalid",
      img: saad
    },
    recent_activity: "Paid for VIP passes",
    date: "2025-09-22T19:00:00Z",
    recent_expense: {
      amount: "2500",
      expense: "VIP Passes",
      category: {
        gradient: categories[6].gradient,
        icon: categories[6].icon,
        date: "22-Sep-2025",
      }
    }
  }
];
export const Grouplist = () => {
  const Groupsrefs = useRef({})
  function Setref(el, i) {
    Groupsrefs.current[i] = el
  }
  const hightlightGroup = (id) => {
    const el = Groupsrefs.current[id]
    console.log(el)
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("highlight-glow")
    setTimeout(() => el.classList.remove("highlight-glow"), 3000);
  }
  return (
    <div className='Groups'>
      <div className='flex items-center justify-between mt-3'>
        <div className="search flex gap-4  py-2  items-center">
          <Input variant={"Group"} />
          <Button />
        </div>
        <div className="filter card-b p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex ">
          <CiFilter className='size-5' />
        </div>
      </div>
      <div className="pinned-groups-container mt-2 p-2">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Pinned <span> <TbPinnedFilled className='rotate-45' /></span></h2>
        <div className="pinned-groups grid grid-cols-5 gap-3 border-b border-b-light pb-5">
          {groups.map((group, index) => {
            return (
              <div key={index} className='pinned-friend card-b  px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
                <div className="about flex items-center gap-3">
                  <div className="profile border size-19 rounded-full border-b-light"><img className='Img-c' src={group.Img} alt="" /></div>
                  <div className="info w-45">
                    <h3 className="name text-text-primary text-md font-semibold line-clamp-1 w-full">{group.name}</h3>
                    <p className='text-text-secondary text-sm'><span className='font-semibold'>{group.members} </span> Members</p>
                    <p className='text-text-secondary text-sm'> <span className='font-semibold'>{Number(group.expenses).toLocaleString()}
                    </span> Total Expense</p>
                  </div>
                  <div className='absolute right-0 top-0'>
                    <button className=' unpin-btn m-1 cursor-pointer  text-lg text-primary font-bold'>
                      <TbPinnedOff />
                    </button>
                    <span className='unpin transition duration-500 ease-in-out'>Unpin {group.name}</span>
                  </div>
                </div>

                <button className='view-m underline cursor-pointer text-text-muted border p-2 border-b-light rounded-2xl transition duration-300 ease-in-out center-flex hover:text-primary' onClick={() => {
                  hightlightGroup(group.id)
                }}><FaChevronDown /></button>
              </div>
            )
          })}
        </div>
      </div>
      <div className="friendslist-container min-h-60 border-b-light p-2 ">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Groups<span> <HiMiniUserGroup /></span></h2>
        <div className="Grouppslist grid grid-cols-4 gap-x-3 gap-y-2 mb-5">
          {groups.map((group, index) => {
            return (
              <div key={group.id} ref={(el) => { Setref(el, group.id) }}>
                <GroupCard group={group} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
