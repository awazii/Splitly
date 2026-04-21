import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaMoneyCheck } from "react-icons/fa6";
import { MdInsights } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { TotalExpenses } from '../../store/ExpenseSlice';
import { selectAllFriends } from '../../store/FriendsSlice';
import { selectAllGroups } from '../../store/GroupSlice';
import { useNavigate } from 'react-router-dom';
import { TopGroup } from '../../store/GroupSlice'
export const Overview = () => {
    const TotalExpensesamount = useSelector(TotalExpenses)
    const topGroup = useSelector(TopGroup)
    const TotalFriends = useSelector(selectAllFriends)
    const TotalGroups = useSelector(selectAllGroups)
    const Navigation = useNavigate()
    const data = [
        {
            icon: <FaMoneyCheck className='size-6 text-white' />,
            label: "Total Expenses",
            value: TotalExpensesamount.toLocaleString(),
            gradient: "linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)",
            link: "/Expenses"
        },
        {
            icon: <FaUserFriends className='size-6 text-white' />,
            label: "Total Friends",
            value: TotalFriends.length,
            gradient: "linear-gradient(135deg, #2196F3 0%, #3F51B5 50%, #1A237E 100%)",
            link: "/Friends"
        },
        {
            icon: <HiMiniUserGroup className='size-6 text-white' />,
            label: "Total Groups",
            value: TotalGroups.length,
            gradient: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)",
            link: "/Groups"
        },
        {
            icon: <MdInsights className='size-6 text-white' />,
            label: "Top Group",
            detail: `${topGroup?.Name || "No groups available"}`,
            gradient: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 50%, #00C9FF 100%)",
            link: `/Groups/${topGroup?.id}`
        }

    ];
    function formatValue(value) {
        return (value < 10 && value > 0) ? `0${value}` : value;
    }
    return (
        <>
            <div className="overview-cards flex justify-between gap-2  h-full">
                {data.map((item, index) => (
                    <div key={index} className="overview-card p-4 card-b rounded-lg flex-1 flex flex-col justify-center items-center">
                        <div className="icon mb-2 bg-primary size-18  center-flex rounded-full" style={{ background: item.gradient }}>
                            {item.icon}
                        </div>
                        <h3 className='text-lg font-semibold text-text-primary'>
                            {item.label}
                        </h3>
                        <p className='text-md font-semibold text-text-secondary'>
                            {`${index === 0 ? "Rs." : ""}${item.detail ?? formatValue(item.value)}`}

                        </p>
                      { item.detail !=="No groups available"  &&  <button className=' text-primary  px-2 py-1 rounded-md text-sm cursor-pointer font-semibold' onClick={() => {
                            Navigation(item.link)
                        }}> View Details <FaArrowRight className='inline-block' /></button>}
                    </div>

                ))}
            </div>
        </>
    )
}
