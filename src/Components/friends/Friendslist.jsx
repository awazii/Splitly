import React, { useRef } from 'react'
import Input from '../Input'
import Button from '../searchbtn'
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinnedOff } from "react-icons/tb";
import saad from "../../assets/saad.jpg"
import habib from "../../assets/habib.png"
import zuzu from "../../assets/zuzu.png"
import awazii from "../../assets/awazii.jpg"
import daud from "../../assets/daud.jpg"
import arshman from "../../assets/arshman.jpg"
import sheda from "../../assets/sheda.jpg"
import { FaChevronDown } from "react-icons/fa";
import FriendCard from "./FriendCard"
import { FaUserFriends } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
export const Friends = [
  {
    id: "001",
    name: "Awazii",
    bio: "Gamer",
    profilePic: awazii,
    netBalance: 1200,
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
    crews: "5 groups",
    spendings: 500,
    joinedDate: "2024-01-10"
  },
  {
    id: "002",
    name: "Arshman",
    bio: "Gooner",
    profilePic: arshman,
    netBalance: -200,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    crews: "3 groups",
    spendings: 700,
    joinedDate: "2024-02-15"
  },
  {
    id: "003",
    name: "Daud Khalid",
    bio: "Advocate",
    profilePic: daud,
    netBalance: 1500,
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
    crews: "2 groups",
    spendings: 300,
    joinedDate: "2024-03-05"
  },
  {
    id: "004",
    name: "Sheda",
    bio: "Cheesa",
    profilePic: sheda,
    netBalance: -50,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    crews: "4 groups",
    spendings: 450,
    joinedDate: "2024-04-20"
  },
  {
    id: "005",
    name: "Saad Khalid",
    bio: "Gym Freak",
    profilePic: saad,
    netBalance: 2000,
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
    crews: "6 groups",
    spendings: 1200,
    joinedDate: "2024-05-12"
  },
  {
    id: "006",
    name: "Habib Khalid",
    bio: "Photographer",
    profilePic: habib,
    netBalance: 0,
    balancetextClass: "text-text-secondary",
    balancebgClass: "bg-text-secondary",
    crews: "1 group",
    spendings: 600,
    joinedDate: "2024-06-18"
  },
  {
    id: "007",
    name: "Zuzu",
    bio: "Savage's Mod",
    profilePic: zuzu,
    netBalance: 950,
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
    crews: "5 groups",
    spendings: 400,
    joinedDate: "2024-07-25"
  }
];

export const Friendslist = () => {
  const Friendsrefs = useRef({})
  function Setref(el, i) {
    Friendsrefs.current[i] = el
  }
  const hightlightFriend = (id) => {
    const el = Friendsrefs.current[id]
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("highlight-glow")
    setTimeout(() => el.classList.remove("highlight-glow"), 3000);
  }
  return (
    <div className='Friends'>
      <div className='flex items-center justify-between mt-3'>
        <div className="search flex gap-4 py-2  items-center">
          <Input variant={"Friend"} />
          <Button />
        </div>
        <div className="filter card-b p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex ">
          <CiFilter className='size-5' />
        </div>
      </div>
      <div className="pinned-friends mt-2 p-2">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Pinned <span> <TbPinnedFilled className='rotate-45' /></span></h2>
        <div className="pinned-friends grid grid-cols-6 gap-3 border-b border-b-light pb-5">
          {
            Friends.map((friend, index) => {
              return (
                <div key={index} className='pinned-friend card-b w-60 px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
                  <div className="about flex center-flex gap-3">
                    <div className="profile border size-16 rounded-full border-b-light"><img className='Img-c' src={friend.profilePic} alt="" /></div>
                    <div className="info">
                      <h3 className="name text-text-primary text-md font-semibold">{friend.name}</h3>
                      <h4 className="bio text-text-secondary text-sm">{friend.bio}</h4>
                    </div>
                    <div className='absolute right-0 top-0'>
                      <button className=' unpin-btn m-1 cursor-pointer  text-lg text-primary font-bold'>
                        <TbPinnedOff />
                      </button>
                      <span className='unpin transition duration-500 ease-in-out'>Unpin {friend.name}</span>
                    </div>
                  </div>

                  <button className='view-m underline cursor-pointer text-text-muted border p-2 border-b-light rounded-2xl transition duration-300 ease-in-out center-flex hover:text-primary' onClick={() => {
                    hightlightFriend(friend.id)
                  }}><FaChevronDown /></button>
                </div>
              )
            })
          }

        </div>
      </div>
      <div className="friendslist-container   min-h-60 border-b-light p-2 ">
        <h2 className='text-xl font-semibold mb-2 center-flex gap-1 w-20'>Friends<span> <FaUserFriends /></span></h2>
        <div className="friendslist grid grid-cols-4  gap-x-2 gap-y-2 mb-5">
          {
            Friends.map((friend, index) => {
              return (
                <div key={friend.id} ref={(el) => { Setref(el, friend.id) }}><FriendCard friend={friend} /></div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
