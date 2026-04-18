import React from 'react'
import { TbListDetails } from "react-icons/tb";
import { FaCoins } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FriendGroupSpendings } from '../../../store/ExpenseSlice';
export const SpendingCard = ({ friend, Openmodel, setCurrentfriend }) => {
    const { Groupid } = useParams()
    const actionbtns = [{ svg: TbListDetails, bg: "bg-primary", label: "Details" }]
    const overview = [
        {
            label: "Paid",
            gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFA726 100%)",
            svg: <FaCoins className='size-4 text-white' />
        },
        {
            label: "Share",
            gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
            svg: <IoTicket className='size-5 text-white' />
        }]
    const MemberExpenses = useSelector(state => FriendGroupSpendings(state, Groupid, friend.id,));
    return (
        <div className={`friend-balance bg-white rounded-lg shadow-md h-fit p-3`}>
            <div className="about-f-cotainer flex items-center gap-2 ">
                <div className="about-f flex-1 center-flex gap-3">
                    <div className="logo size-18 rounded-full ">
                        <img src={friend.Image} className='Img-c border-none' alt="friend-img" />
                    </div>
                    <div className="info">
                        <h3 className='font-semibold'>{friend.Name} </h3>
                        <p className='text-[13px] text-text-secondary'>{friend.Bio}</p>
                    </div>
                </div>
                <div className="extra  w-fit h-20 center-flex">
                    <div className="actions w-20 center-flex  justify-end ">
                        {actionbtns.map((button, index) => (
                            <button key={index} className={`group flex items-center  h-8 min-w-8 px-1.5 rounded-lg cursor-pointer ${button.bg}`} onClick={() => {
                                index === 0 && Openmodel()
                                setCurrentfriend(friend)
                            }}>
                                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:mr-1 trans whitespace-nowrap text-white text-sm">
                                    {button.label}
                                </span>
                                <button.svg className='text-white size-5' />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="spending-info mt-2 border-l h-15 center-flex pl-3 gap-2">
                {overview.map((card, index) => (
                    <div key={index} className={`${card.label}  border-b-light center-flex w-full last:border-l-1 gap-2  `}>
                        {card.gradient ?
                            <div className="logo  size-10 rounded-full center-flex" style={{ background: card.gradient }}>{card.svg}</div> : <div className={`logo  size-18 rounded-full center-flex ${friend.balancebgClass}`}>{card.svg}</div>}
                        <div className="info w-16  center-flex flex-col">
                            <div className={`description font-semibold text-text-secondary`}>{card.label === "Paid" ? MemberExpenses.spent.toLocaleString() : MemberExpenses.share.toLocaleString()}</div>
                            <div className="title text-[12px] font-semibold"> {card.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
