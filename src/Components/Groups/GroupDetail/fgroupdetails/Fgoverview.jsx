import React from 'react'
import { FaCoins } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
export const Fgoverview = ({Currentfriend}) => {
     const overview = [
            {
                label: "Total Spendings",
                value: Currentfriend.spendings,
               gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFA726 100%)",
                svg: <FaCoins className='size-7 text-white' />
            },
            {
                label: "Total Share",
                value: Currentfriend.totalShare,
               gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
                svg: <IoTicket className='size-8 text-white' />
            }]
  return (
    <div className='w-full h-full flex p-4'>
         {overview.map((card, index) => (
                <div key={index} className={`${card.label}  border-b-light center-flex w-full last:border-l-1 gap-2 mr-2 `}>
                    {card.gradient? <div className="logo  size-18 rounded-full center-flex" style={{ background: card.gradient }}>{card.svg}</div> : <div className={`logo  size-18 rounded-full center-flex ${Currentfriend.balancebgClass}`}>{card.svg}</div> }
                    <div className="info w-fit h-2/3 center-flex flex-col">
                        <div className="title  font-semibold"> {card.label}</div>
                        <div className={`description font-semibold  ${card.label==="Net Balance"? Currentfriend.balancetextClass:"text-text-secondary"}`}>{`Rs. ${card.value.toLocaleString()}${card.label==="Net Balance" && card.value===0 ?" (Settled)":"" }`}</div>
                    </div>
                </div>
            ))}
    </div>
  )
}
