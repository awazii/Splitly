import React from 'react'
import { FaMoneyCheck } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
export const Overview = ({CurrentGroup}) => {
    const overview = [
        {
            label: "Total Expense",
            value: `Rs.${Number(CurrentGroup.expenses).toLocaleString()}`,
            gradient: "linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)",
            svg: <FaMoneyCheck className='size-8 text-white ' />
        },
        {
            label: "Destination ",
            value: CurrentGroup.variant,
            background: CurrentGroup.Img
        },
        {
            label: "Total Participants",
            value: `${CurrentGroup.members} Members`,
            gradient: "linear-gradient(135deg, #FF9800 0%, #FF5722 50%, #F44336 100%)",
            svg: <HiMiniUserGroup className='size-7 text-white' />
        }]
    return (
        <div className='card-b  size-full rounded-lg shadow flex justify-between p-4 '>
            {overview.map((card, index) => (
                <div key={index} className={`${card.label} ${index == 1 && "border-l-1 border-r-1"} border-b-light flex-1 center-flex w-full gap-2`}>
                    {card.background ? <div className="logo  size-20 rounded-full center-flex">
                        <img src={card.background} alt="" /> </div> : <div className="logo  size-20 rounded-full center-flex" style={{ background: card.gradient }}>{card.svg}</div>}
                    <div className="info w-40 h-2/3 center-flex flex-col">
                        <div className="title text-lg font-semibold"> {card.label}</div>
                        <div className="description text-text-secondary "> {card.value}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
