import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaRupeeSign } from "react-icons/fa6";
import { MdInsights } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
export const Overview = () => {
    const data = [
           {
    icon: <FaRupeeSign className='size-6 text-white' />,
    label: "Total Expenses",
    value: 1500,
    gradient: "linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)",
  },
  {
    icon: <FaUserFriends className='size-6 text-white' />,
    label: "Total Friends",
    value: 17,
    gradient: "linear-gradient(135deg, #2196F3 0%, #3F51B5 50%, #1A237E 100%)",
  },
  {
    icon: <HiMiniUserGroup className='size-6 text-white' />,
    label: "Total Groups",
    value: 5,
   gradient: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)",
  },
  {
    icon: <MdInsights className='size-6 text-white' />,
    label: "Top Group",
    detail: "Trip to Murree 2025",
    gradient: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 50%, #00C9FF 100%)",
  }

    ];
    function formatValue(value) {
        return value < 10 ? `0${value}` : value;
    }
    return (
        <>
            <div className="overview-cards flex justify-between gap-2  h-full">
                {data.map((item, index) => (
                    <div key={index} className="overview-card p-4 card-b rounded-lg flex-1 flex flex-col justify-center items-center">
                        <div className="icon mb-2 bg-primary size-18  center-flex rounded-full" style={{ background: item.gradient }}>
                            {item.icon}
                        </div>
                        <h3 className='text-lg font-semibold text-text-primary'>{item.label}</h3>
                        <p className='text-md mt-1'>{ `${index===0?"Rs.":""}${item.detail || formatValue(item.value)}`}</p>
                        <button className=' text-primary  px-2 py-1 rounded-md text-sm cursor-pointer font-semibold'> View Details <FaArrowRight className='inline-block' /></button>
                    </div>

                ))}
            </div>
        </>
    )
}
