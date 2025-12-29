import React from 'react'
import { IoIosWallet } from "react-icons/io";
import Addbtn from "./Addfbtn"
import { Friends } from '../../friends/Friendslist';
import { PiHandCoinsFill } from "react-icons/pi";
import { FaCoins } from "react-icons/fa";
import { TbCreditCardPay } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
const friendsData = [
    {
        id: "001",
        friendInfo: Friends.find(f => f.id === "001"),
        balance:
        {
            label: "Net Balance", value: 2200, color: "text-green-600", icon: <FaMoneyBillTransfer className="size-4 text-white" />
        }

    },
    {
        id: "002",
        friendInfo: Friends.find(f => f.id === "002"),
        balance:
        {
            label: "Net Balance", value: -1500, color: "text-red-600", icon: <FaMoneyBillTransfer className="size-4 text-white" />
        }

    },
    {
        id: "003",
        friendInfo: Friends.find(f => f.id === "003"),
        balance:
        {
            label: "Net Balance", value: 4500, color: "text-green-600", icon: <FaMoneyBillTransfer className="size-4 text-white" />
        }

    },
    {
        id: "004",
        friendInfo: Friends.find(f => f.id === "004"),
        balance:
        {
            label: "Settled", value: 0, color: "text-black", icon: <FaMoneyBillTransfer className="size-4 text-white" />
        }

    },
    {
        id: "005",
        friendInfo: Friends.find(f => f.id === "005"),
        balance:
        {
            label: "Net Balance", value: -3200, color: "text-red-600", icon: <FaMoneyBillTransfer className="size-4 text-white" />
        }

    },
    {
        id: "006",
        friendInfo: Friends.find(f => f.id === "006"),
        balance:
        {
            label: "Net Balance", value: 1200, color: "text-green-600", icon: <FaMoneyBillTransfer className="size-4 text-white" />
        }

    },
    {
        id: "007",
        friendInfo: Friends.find(f => f.id === "007"),
        balance:
        {
            label: "Net Balance", value: -500, color: "text-red-600", icon: <FaMoneyBillTransfer className="size-4 text-white" />
        }

    }
];
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
            <div className="friend-balances flex-1 h-fit mt-3 overflow-auto grid grid-cols-3 gap-3 auto-rows-min">
                {friendsData.map((friendData, index) => (
                    <div key={index} className={`friend-balance bg-white rounded-lg shadow-md h-fit p-3`}>
                        <div className="about-f-cotainer flex items-center gap-2 ">
                            <div className="about-f w-70 center-flex gap-3">
                                <div className="logo size-18 rounded-full ">
                                    <img src={friendData.friendInfo.profilePic} className='Img-c border-none' alt="friend-img" />
                                </div>
                                <div className="info">
                                    <h3 className='font-semibold'>{friendData.friendInfo.name} </h3>
                                    <p className='text-sm text-text-secondary'>{friendData.friendInfo.bio}</p>
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
                                <div className={`logo size-10 rounded-full center-flex bg-green-600`}>
                                    {friendData.balance.icon}
                                </div>
                                <div className="amount">
                                    <h3 className={`${friendData.balance.color} font-semibold`}>
                                        Rs.{Number(friendData.balance.value).toLocaleString()}
                                    </h3>
                                    <p className="font-semibold text-[13px]">{friendData.balance.label}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
