import React from 'react'
import { PiHandCoinsFill } from "react-icons/pi";
import { FaCoins } from "react-icons/fa";
import { Friends } from '../../friends/Friendslist';

const insights = [
        { label: "Highest Debtor", svg: <PiHandCoinsFill className='text-white size-7' />, totalamount: 1670, color: "#dc2626",about: Friends.find(f => f.id === "002")},
        {
            label: "highest contributer",
            svg: <FaCoins className='text-white size-7' />,
            totalamount: 3470,
            color: "#16A34A",
            about: Friends.find(f => f.id === "003")
        }
    ]
export const Insights = () => {
    return (
        <div className='card-b size-full shadow rounded flex p-4'>
            {insights.map((insight, index) => (
                <div key={index} className={`flex-1 center-flex gap-5 ${index===1 && "border-l-1 border-b-light pl-3"}`}>
                    <div className="logo size-18 rounded-full center-flex" style={{ background: insight.color }}>
                        {insight.svg}
                    </div>
                    <div className="info w-45 h-full center-flex flex-col">
                        <div className="label font-semibold text-lg">{insight.label}</div>
                        <div className="about center-flex gap-2 justify-between ">
                            <div className="logo rounded-lg  size-7">
                                <img src={insight.about.profilePic} className='rounded-lg ' alt="profile-pic " />
                            </div>
                            <p className="name text-sm">{insight.about.name}</p>
                        </div>
                        <div className="amount font-semibold text-xl mt-1" style={{ color: insight.color }}>Rs.{insight.totalamount}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
