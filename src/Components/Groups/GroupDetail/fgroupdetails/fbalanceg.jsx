import React from 'react'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoIosWallet } from "react-icons/io";
import { Friends } from '../../../friends/Friendslist'
export const Fbalanceg = ({Currentfriend}) => {
  return (
     <div className='p-5 flex flex-col h-full overflow-auto'>
                <div className="header  h-fit">
                    <div className="info">
                        <div className="title center-flex w-fit gap-1">
                            <h3 className='font-semibold text-2xl'>Balances</h3>
                            <IoIosWallet className='size-5' />
                        </div>
                        <p className='text-sm text-text-secondary'>
                            Track net balances with your group members.
                        </p>             
                         </div>
                </div>
     <div className="friend-balances flex-1 h-[90%] mt-3  grid grid-cols-2 gap-3 auto-rows-min overflow-auto">
                   {Friends.filter(friend => friend.id !== Currentfriend.id).map((friend, index) => (
                       <div key={index} className={`friend-balance bg-white rounded-lg shadow-md h-fit p-3 `}>
                           <div className="about-f-container">
                               <div className="about-f w-70 center-flex gap-3">
                                   <div className="logo size-18 rounded-full ">
                                       <img src={friend.profilePic} className='Img-c border-none' alt="friend-img" />
                                   </div>
                                   <div className="info flex-1">
                                       <h3 className='font-semibold'>{friend.name} </h3>
                                       <p className='text-sm text-text-secondary'>{friend.bio}</p>
                                   </div>
                               </div>
                           </div>
                           <div className="balance h-20 mt-3  border-l w-60 p-2 mx-auto center-flex flex-col ">
                               <div className="center-flex gap-3"
                               >
                                   <div className={`logo size-10 rounded-full center-flex ${friend.balancebgClass}`}>
                                       <FaMoneyBillTransfer className='size-5 text-white' />
                                   </div>
                                   <div className="amount">
                                       <h3 className={`${friend.balancetextClass} font-semibold`}>
                                           Rs.{Math.abs(friend.netBalance).toLocaleString()}
                                       </h3>
                                       <p className="font-semibold text-[13px]">Net Balance</p>
                                   </div>
                               </div>          
                       <p className="note text-text-secondary font-semibold text-[12px] ml-5 mt-1">{friend.netBalance < 0 ? `(You owed ${friend.name})` : friend.netBalance > 0 ? `(${friend.name} owes you)` : "(All setteled)"}</p>           
                           </div>
                       </div>
                   ))}
               </div>
               </div>
               
  )
}
