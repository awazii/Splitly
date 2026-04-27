import React from 'react'
import { GiReceiveMoney } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { selectExpenseById } from '../../../store/ExpenseSlice';
import { selectFriendById } from '../../../store/FriendsSlice';
import { useSelector } from 'react-redux';
import { Memberdetails } from '../../../utils/Memberdetails';
import { RiArrowDownLine } from "react-icons/ri";
import { UniversalEmptyState } from '../../UniversalEmptyState';
import { RiArrowUpLine } from "react-icons/ri";
import { selectAllSplits } from '../../../store/SpliterSlice';
import { IoPerson } from 'react-icons/io5';
export const Insights = ({ data }) => {
    const sortedmembers = data && [...data].sort((a, b) => b.spent - a.spent)
    const HighesContributor = sortedmembers && sortedmembers[0]
    console.log( Memberdetails(HighesContributor?.id))
    const rawDebtor = sortedmembers && sortedmembers[data.length - 1];
    const debtorBalance = rawDebtor ? Math.abs(rawDebtor.spent - rawDebtor.share) : 0;
    const HighestDebtor = debtorBalance > 0 ? rawDebtor : null;
    function GetTemp(id) {
        const Splits= useSelector(selectAllSplits)[0]
        const temp = Splits.temporary.find(t => t.id === id)
        return temp
    }
    const insights = [
        {
            label: "Highest Debtor",
            svg: <GiReceiveMoney className='text-white size-7' />,
            color: "#dc2626",
            about: Memberdetails(HighestDebtor?.id) || GetTemp(HighestDebtor?.id),
            totalamount: Math.abs(HighestDebtor?.spent - HighestDebtor?.share)
        },
        {
            label: " Highest Contributor",
            svg: <FaCoins className='text-white size-7' />,
            totalamount: HighesContributor?.spent,
            color: "#16A34A",
            about: Memberdetails(HighesContributor?.id) || GetTemp(HighesContributor?.id)
        }
    ]
    return (
        <div className='card-b size-full shadow rounded-lg flex p-4'>
            {insights.map((insight, index) => (
                <div key={index} className={`flex-1 center-flex gap-5 ${index === 1 && "border-l-1 border-b-light pl-3"}`}>
                    <>
                        <div className="logo size-18 rounded-full center-flex" style={{ background: insight.color }}>
                            {insight.svg}
                        </div>
                        <div className="info w-45 h-full center-flex flex-col">
                            <div className="label font-semibold text-lg">{insight.label}</div>
                            {insight.about && <div className="about center-flex gap-2 justify-between ">
                                <div className="logo rounded-lg  size-7">
                                    {
                                        insight.about.type !== "temporary" ? <img src={insight.about.Image} className='rounded-full Img-c' alt="profile-pic " /> : <div className="friend-img-container size-7 bg-neutral-300 rounded-full center-flex">
                                            <IoPerson className='size-3 text-neutral-500' />
                                        </div>
                                    }

                                </div>
                                <p className="name text-sm">{insight.about.Name}</p>
                            </div>}
                            {insight.totalamount ? <div className="amount font-semibold text-xl mt-1" style={{ color: insight.color }}>Rs.{Number(insight.totalamount).toLocaleString()}</div> : <p className="text-text-secondary text-sm  mt-1">No data yet</p>
                            }
                        </div>
                    </>
                </div>
            ))}
        </div>
    )
}
