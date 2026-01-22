import React from 'react'
import { useParams } from 'react-router-dom'
import { Friends } from '../Friendslist'
import { IoReturnUpBack } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import Removebtn from "./Removebtn"
import { Balancef } from './Balancef';
import { Recent } from '../../dashboard/Recent';
import { Aboutf } from './Aboutf';
export const Frienddetails = () => {
  const Navigate = useNavigate()
  const { Friend } = useParams();
const CurrentFriend = Friends.find(f => f.id === Friend);
  return (
    <div className='friends-profile h-full scrollbar-hide overflow-auto'>
      <div className="header h-25  flex px-10 items-center justify-between">
        <div className="group-name center-flex  gap-3 ">
          <button className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95" onClick={() => { Navigate("/Friends") }}>
            <IoReturnUpBack className='size-6 group-hover:text-primary' />
          </button>
          <h3 className='text-3xl '>{`${CurrentFriend.name}'s Profile`}</h3>
        </div>
        <div className="actions center-flex gap-3">
          <Removebtn />
          <div className="settingbtn card-b size-11 rounded-lg center-flex group trans hover:scale-102 active:scale-95 cursor-pointer">
            <IoSettingsOutline className='size-5  group-hover:text-primary' />
          </div>
        </div>
      </div>
      <div className="friend-container grid container mx-auto grid-cols-3 h-205 gap-3 grid-rows-6">
        <div className='Balance col-span-2 row-span-6 border-l shadow'>
              <Balancef currentFriend={CurrentFriend} />
            </div>
            <div className=' col-span-1 row-span-3 '>
              <Aboutf CurrentFriend={CurrentFriend} />
            </div>   
            <div className='Recent col-span-1 row-span-3 border-l shadow'>
              <Recent h={`h-[300px]`}  />
            </div>
      </div>

    </div>
  )
}
