import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IoReturnUpBack, IoSettingsOutline } from "react-icons/io5";
import Restrictbtn from "../Common/Restrictbtn"
import { Balancef } from './Balancef';
import { Recent } from '../../../pages/dashboard/Recent';
import { Aboutf } from './Aboutf';
import { useSelector } from 'react-redux';
import { selectFriendById } from '../../../store/FriendsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Basemodel } from '../../basemodel';
import { Updatef } from './Updatef';
import { UserActionDialog } from './UserActionDialog'
import { UniversalEmptyState } from '../../UniversalEmptyState'
import { pageContainerVariants, cardVariants } from "../../../utils/animation";
import { TbUserX } from "react-icons/tb";
export const Frienddetails = () => {
  const Navigate = useNavigate()
  const { Friend } = useParams();
  const [updatepopup, setupdatepopup] = useState(false)
  const [restrictpopup, setrestrictpopup] = useState(false)
  const CurrentFriend = useSelector((state) => selectFriendById(state, Friend));
  let isnew = CurrentFriend?.crews?.groupCount === 0 && CurrentFriend?.Relationship.length === 0
  return (
    <div className='friends-profile h-full scrollbar-hide overflow-auto'>
      {CurrentFriend ? <> <div className="header h-25 flex px-10 items-center justify-between">
        <div className="group-name center-flex gap-3">
          <button
            className="backbtn card-b p-2 rounded-full cursor-pointer group trans hover:scale-102 active:scale-95"
            onClick={() => { Navigate("/Friends") }}
          >
            <IoReturnUpBack className='size-6 group-hover:text-primary' />
          </button>
          <h3 className={`text-3xl`}>{`${CurrentFriend.Name}'s Profile`} <span className='text-[18px] text-red-500 font-semibold'>{CurrentFriend.isBanned && "(Banned)"}</span></h3>
        </div>
        <div className="actions center-flex gap-3">
          {CurrentFriend.id !== "admin_01" && <Restrictbtn isnew={isnew} isbanned={CurrentFriend.isBanned} onClick={() => {
            setrestrictpopup(true)
          }} />}
          {
            (CurrentFriend.id !=="admin_01" && !CurrentFriend.isBanned) && 
              <button className="settingbtn card-b size-11 rounded-lg center-flex group trans hover:scale-102 active:scale-95 cursor-pointer" onClick={() => setupdatepopup(true)}>
            <IoSettingsOutline className='size-5 group-hover:text-primary' />
          </button>
          }
  
        </div>
      </div>
        <div className="friend-container grid container mx-auto grid-cols-3 h-205 gap-3 grid-rows-6">
          <div className='Balance col-span-2 row-span-6 border-l shadow '>
            <Balancef currentFriend={CurrentFriend} />
          </div>

          <div className='col-span-1 row-span-3'>
            <Aboutf CurrentFriend={CurrentFriend} />
          </div>

          <div className='Recent col-span-1 row-span-3 border-l shadow'>
            <Recent
              h="h-[300px]"
              d={
                <>
                  No recent activity for <span className="font-semibold text-gray-800">{CurrentFriend.Name}</span>.
                  All their transactions, group updates, and settlements across the app will appear here.
                </>
              }
            />
          </div>
        </div></> : (
        <motion.div variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          className='h-full center-flex'>
          <motion.div variants={cardVariants}>
            <UniversalEmptyState
              title="This User has been removed or does not exist."
              textsize="text-sm"
              button={{
                type:"Friends",
                Link:"/Friends"
              }}
            >
              <div className="p-8 shadow-md border-l rounded-full">
                <TbUserX className="size-8 text-primary" />
              </div>
            </UniversalEmptyState>
          </motion.div>
        </motion.div>
      )}
      <Basemodel isOpen={updatepopup} Closemodel={() => setupdatepopup(false)} title="Update Friend Info">
        <Updatef friendId={CurrentFriend?.id} Closemodel={() => setupdatepopup(false)} />
      </Basemodel>
      <Basemodel isOpen={restrictpopup} Closemodel={() => setrestrictpopup(false)} title="">
        <UserActionDialog friendId={CurrentFriend?.id} isnew={isnew} isbanned={CurrentFriend?.isBanned} Closemodel={() => setrestrictpopup(false)} />
      </Basemodel>
    </div>
  )
}

