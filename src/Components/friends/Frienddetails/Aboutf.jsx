import React from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { indicators } from '../Friendslist';
export const Aboutf = ({ CurrentFriend }) => {
    const overvuewData = [
        {
            label: "Net Balance",
            icon: FaMoneyBillTransfer,
            textColor: indicators[CurrentFriend.netBalance.indicatorid].balancetextClass,
            Netbalance: CurrentFriend.netBalance.total,
        },
        {
            label: "Total Spending",
            value: `Rs. ${CurrentFriend.spendings.toLocaleString()}`,
            icon: IoCard,
            textColor: "text-green-600",
        },
        {
            label: "Groups Involved",
            value: CurrentFriend.crews.groupCount,
            icon: MdGroup,
            textColor: "text-primary",
        },
        {
            label: "Joined Date",
            value: CurrentFriend.joinedDate,
            icon: MdOutlineDateRange,
            textColor: "text-sky-600",
        },
    ]
    return (
        <div className='size-full card-b rounded-lg p-4 shadow'>
            <h2 className='text-2xl font-semibold'>About Friend</h2>
            <div className="about-f center-flex flex-col gap-2">
                <div className="logo rounded-full size-34 center-flex border-primary border-3">
                    <img src={CurrentFriend.Image} className='Img-c p-1' alt="profile-image" />
                </div>
                <div className="info center-flex flex-col ">
                    <h3 className='font-semibold text-2xl'>{`${CurrentFriend.Name}`} <span className='text-text-secondary text-lg'>{`${CurrentFriend.id==="admin_01" ?" (Admin)" : ""}`}</span></h3>
                    <p className='text-text-secondary text-lg'>{CurrentFriend.Bio}</p>
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
