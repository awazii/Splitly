import React from 'react'
import { FaCoins } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { FriendGroupSpendings } from '../../../../store/ExpenseSlice'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export const Fgoverview = ({ Currentfriend }) => {
    const { Groupid } = useParams()
    const Currentfriendspending = useSelector(state => FriendGroupSpendings(state, Groupid, Currentfriend.id))
    const overview = [
        {
            label: "Total Spendings",
            value: (Currentfriendspending?.spent ?? 0),
            gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFA726 100%)",
            svg: <FaCoins className='size-7 text-white' />
        },
        {
            label: "Total Share",
            value: (Currentfriendspending?.share ?? 0),
            gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
            svg: <IoTicket className='size-8 text-white' />
        }]
    return (
        <div className='w-full h-full flex p-4'>
            {overview.map((card, index) => (
                <div key={index} className={`${card.label}  border-b-light center-flex w-full last:border-l-1 gap-2 mr-2 `}>
                    <div className="logo  size-18 rounded-full center-flex" style={{ background: card.gradient }}>{card.svg}</div>
                    <div className="info w-fit h-2/3 center-flex flex-col">
                        <div className="title  font-semibold"> {card.label}</div>
                        <p className={`description font-semibold text-text-secondary `}>{`Rs. ${card.value.toLocaleString()}`}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
