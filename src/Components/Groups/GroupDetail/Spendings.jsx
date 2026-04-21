import React, { useState } from 'react'
import { IoIosWallet } from "react-icons/io";
import Addbtn from "./Addfbtn"
import { Basemodel } from '../../basemodel';
import { Friendgdetails } from './fgroupdetails/Friendgdetails';
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../../../store/FriendsSlice';
import { SpendingCard } from './SpendingCard';
export const Balance = ({ CurrentGroup }) => {
    const [popup, setpopup] = useState(false)
    const [Currentfriend, setCurrentfriend] = useState(null)
    const Members = useSelector(selectAllFriends).filter(friend => CurrentGroup.Members.includes(friend.id))
    const Openmodel = () => {
        setpopup(true)
    }
    const Closemodel = () => [
        setpopup(false)
    ]
    return (
        <div className='p-5 flex flex-col h-full'>
            <div className="header flex items-center justify-between h-fit">
                <div className="info">
                    <div className="title center-flex w-fit gap-1">
                        <h3 className='font-semibold text-2xl'>Spendings</h3>
                        <IoIosWallet className='size-5' />
                    </div>
                    <p className='text-sm text-text-secondary'>Track individual contributions across your group</p>
                </div>
                <div className="add-friend mr-3 ">
                    <Addbtn />
                </div>
            </div>
            <div className="friend-balances flex-1 h-fit mt-3  grid grid-cols-3 gap-3 auto-rows-min">
                {Members.map((friend, index) => (
                  <SpendingCard key={index} friend={friend} Openmodel={Openmodel} setCurrentfriend={setCurrentfriend} />
                ))}
            </div>
            <Basemodel isOpen={popup}
                Closemodel={Closemodel}
                title={`Member Group Activity`}
            >
                <Friendgdetails Currentfriend={Currentfriend} />
            </Basemodel>
        </div>
    )
}
