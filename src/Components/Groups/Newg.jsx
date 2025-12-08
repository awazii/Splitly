import React from 'react'
import Gcheckbox from "./gcheck"
import Checkbox from "../Check"
import Input from "./addginput"
import Newbtn from "./Newgbtn"
import Categories from "./categories"
import Choosef from "../choosef."
import { HiMiniUserGroup } from "react-icons/hi2";
import { Friends } from "../friends/Friendslist"
export const Newg = () => {
  return (
    <div className='container card-b rounded-2xl mx-auto h-170 w-180  my-12 p-3 relative '>
      <div className="title center-flex flex-col gap-0">
        <h2 className='text-2xl font-semibold flex items-center gap-2 text-center p-2 pb-0'>Add New Group<span><HiMiniUserGroup /></span></h2>
        <h4 className='text-text-secondary mr-2'>Start with intention. End with legacy.</h4>
      </div>
      <form action="" className='Friend-form  m-6 space-y-3 flex flex-col '>
        <Input variant={"Group's Name"} />
        <div className='categories'>
          <h4 className='text-md font-semibold my-3'>Where are you headed?</h4>
          <Categories />
        </div>
        <div className='select-friends-container w-full '>
          <div className='select-friend-option flex items-center justify-between'>
            <h4 className='text-md font-semibold my-2 '>Who's coming with you?
            </h4>     
            <div className='center-flex gap-2'>
<div className=' w-25 py-2 px-3 bg-highlight  rounded-lg  '>
              <Gcheckbox>
                <h5 className='text-[13px] text-text-secondary'>Select all</h5>
              </Gcheckbox>
            </div>
            <Choosef />
            </div>
          </div>
          <div className='select-friends   mx-auto mt-3  '>
            <div className="friend-lists w-160 h-60 overflow-auto  grid grid-cols-5  gap-3  border-b-light px-2 ">
              {Friends.map((friend, index) => {
                return (
                  <label key={index} className='select-friend rounded-lg shadow-md h-30 bg-highlight flex flex-col items-center justify-center gap-1 pt-1 relative cursor-pointer trans'>
                    <div className="friend-img-container size-16">
                      <img src={friend.profilePic} className='Img-c' alt="friend-img" />
                    </div>
                    <div className="friend-info center-flex flex-col">
                      <h2 className='text-sm'>{friend.name}</h2>
                      <p className='text-[12px] text-text-secondary'>{friend.bio}</p>
                    </div>
                    <div className='absolute top-2 right-1'>
                      <Gcheckbox />
                    </div>
                  </label>
                )
              })}
            </div>
          </div>
        </div>
        <div className='pin-check flex gap-2 mt-3'>
          <Checkbox >
            <h3 className='text-sm text-text-secondary'>Do you want to pin this Group?</h3>
          </Checkbox>
        </div>
        <Newbtn />
      </form>
    </div>
  )
}
