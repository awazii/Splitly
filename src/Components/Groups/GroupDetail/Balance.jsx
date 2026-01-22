import React from 'react'
import { IoIosWallet } from "react-icons/io";
import Addbtn from "./Addfbtn"
import { Friends } from '../../friends/Friendslist';
import { TbCreditCardPay } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
const actionbtns = [{ svg: TbListDetails, bg: "bg-primary", label: "Details" }, { svg: TbCreditCardPay, bg: "bg-green-600", label: "Settle" },]
export const Balance = () => {
    return (
        <div className='p-5 flex flex-col h-full'>
            <div className="header flex items-center justify-between h-fit">
                <div className="info">
                    <div className="title center-flex w-fit gap-1">
                        <h3 className='font-semibold text-2xl'>Balances</h3>
                        <IoIosWallet className='size-5' />
                    </div>
                    <p className='text-sm text-text-secondary'>Track individual balances across your group</p>
                </div>
                <div className="add-friend mr-3 ">
                    <Addbtn />
                </div>
            </div>
            <div className="friend-balances flex-1 h-fit mt-3  grid grid-cols-3 gap-3 auto-rows-min">
                           {Friends.map((friend, index) => (
                               <div key={index} className={`friend-balance bg-white rounded-lg shadow-md h-fit p-3`}>
                                   <div className="about-f-cotainer flex items-center gap-2 ">
                                       <div className="about-f w-70 center-flex gap-3">
                                           <div className="logo size-18 rounded-full ">
                                               <img src={friend.profilePic} className='Img-c border-none' alt="friend-img" />
                                           </div>
                                           <div className="info">
                                               <h3 className='font-semibold'>{friend.name} </h3>
                                               <p className='text-sm text-text-secondary'>{friend.bio}</p>
                                           </div>
                                       </div>
           
                                       <div className="extra ml-5 flex-1 h-20 center-flex">
                                           <div className="actions w-20 center-flex flex-col items-end gap-2">
                                               {actionbtns.map((button, index) => (
                                                   <button key={index} className={`group flex items-center  h-8 min-w-8 px-1.5 rounded-lg cursor-pointer ${button.bg}`}>
                                                       <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:mr-2 trans whitespace-nowrap text-white text-sm">
                                                           {button.label}
                                                       </span>
                                                       <button.svg className='text-white size-5' />
                                                   </button>
                                               ))}
                                           </div>
                                       </div>
           
                                   </div>
                                   <div className="balance h-fit mt-2 center-flex ">
                                       <div className="center-flex gap-3 w-40 border-l  p-2 "
                                       >
                                           <div className={`logo size-10 rounded-full center-flex ${friend.balancebgClass}`}>
                                               <FaMoneyBillTransfer className='size-5 text-white' />
                                           </div>
                                           <div className="amount">
                                               <h3 className={`${friend.balancetextClass} font-semibold`}>
                                                   Rs.{Math.abs(friend.netBalance).toLocaleString()}
                                               </h3>
                                               <p className="font-semibold text-[13px]">{friend.netBalance === 0 ? "Settled" : "Net Balance"}</p>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           ))}
                       </div>
        </div>
    )
}
