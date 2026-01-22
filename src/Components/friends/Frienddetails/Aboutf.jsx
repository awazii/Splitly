import React from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Button from '../Delete';
export const Aboutf = ({ CurrentFriend }) => {
    const overvuewData = [
        {
            label: "Net Balance",
            icon: FaMoneyBillTransfer,
            textColor: CurrentFriend.balancetextClass,
            Netbalance: CurrentFriend.netBalance,
        },
        {
            label: "Total Spending",
            value: "Rs. 2,500",
            icon: IoCard,
            textColor: "text-green-600",
        },
        {
            label: "Groups Involved",
            value: CurrentFriend.crews,
            icon: MdGroup,
            textColor: "text-primary",
        },
        {
            label: "Joined Date",
            value: new Date(CurrentFriend.joinedDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric"
            }),
            icon: MdOutlineDateRange,
            textColor: "text-sky-600",
        },
    ]
    return (
        <div className='size-full card-b rounded-lg p-4 shadow'>
            <h2 className='text-2xl font-semibold'>About Friend</h2>
            <div className="about-f center-flex flex-col gap-2">
                <div className="logo rounded-full size-34 center-flex border-primary border-3">
                    <img src={CurrentFriend.profilePic} className='Img-c p-1' alt="profile-image" />
                </div>
                <div className="info center-flex flex-col ">
                    <h3 className='font-semibold text-2xl'>{CurrentFriend.name}</h3>
                    <p className='text-text-secondary text-lg'>{CurrentFriend.bio}</p>
                </div>
            </div>
            <div className='overview-data   p-3 space-y-2 grid grid-cols-2 grid-rows-2 gap-x-3'>
                {overvuewData.map((data, index) => (
                    <div key={index} className='overview-item center-flex gap-3 bg-white rounded-lg shadow h-15 '>
                        <div className="icon size-11 rounded-full center-flex bg-lightest w-12">
                            <data.icon className={`${data.textColor} size-7`} />
                        </div>
                        <div className="info flex-col flex-1">
                            <h4 className='font-semibold'>{data.label}</h4>
                            {data.label === "Groups Involved" ?
                             <button className='underline cursor-pointer text-sm text-primary font-semibold'>
                                {data.value}
                            </button> :
                             <p className={`text-sm ${data.Netbalance ? data.textColor : "text-text-secondary"} font-semibold`}>{ data.value ? data.value : data.Netbalance !== 0 ? "Rs. " + Math.abs(data.Netbalance).toLocaleString() :"Rs. " + Math.abs(data.Netbalance).toLocaleString() +" (settled)"}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
