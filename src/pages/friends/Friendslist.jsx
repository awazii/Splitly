import React, { useRef } from 'react'
import Input from '../../Components/Common/Input'
import Button from '../../Components/Common/searchbtn'
import { TbPinnedFilled } from "react-icons/tb";
import { TbPinnedOff } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import FriendCard from "../../Components/friends/FriendCard"
import { FaUserFriends } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { useSelector ,useDispatch } from 'react-redux';
import { updateFriend } from '../../store/FriendsSlice';
import { selectAllFriends  ,selectPinnedFriends} from '../../store/FriendsSlice';
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
export const Friendslist = () => {
  const Friends = useSelector(selectAllFriends);
  const pinnedFriends = useSelector(selectPinnedFriends);
  const dispatch = useDispatch()
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
            pinnedFriends.map((friend, index) => {
              return (
                <div key={index} className='pinned-friend card-b w-60 px-1 py-4 pb-2 h-fit rounded-lg relative flex flex-col gap-2 items-center'>
                  <div className="about flex center-flex gap-3">
                    <div className="profile border size-16 rounded-full border-b-light"><img className='Img-c' src={friend.Image} alt="" /></div>
                    <div className="info">
                      <h3 className="name text-text-primary text-md font-semibold">{`${friend.Name}`} <span className='text-[12px]'>{`${friend.id==="admin_01" ? "(Admin)" : ""}`}</span></h3>
                      <h4 className="bio text-text-secondary text-sm">{friend.Bio}</h4>
                    </div>
                  { friend.id !== "admin_01" && (
                    <div className='absolute right-0 top-0'>
                      <button className=' unpin-btn m-1 cursor-pointer  text-lg text-primary font-bold rotate-45' onClick={() => {
                        dispatch(updateFriend({id:friend.id, changes:{isPinned:false}}))
                      }}>
                        <TbPinnedFilled />
                      </button>
                      <span className='unpin transition duration-500 ease-in-out'>Unpin {friend.name}</span>
                    </div>)}
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
