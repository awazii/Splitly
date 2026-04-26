import React, { useState, useEffect } from 'react'
import { IoIosWallet } from "react-icons/io";
import { TbCreditCardPay } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { Basemodel } from '../../basemodel';
import { Balancewith } from './transactions/Balancewith';
import { Memberdetails } from '../../../utils/Memberdetails';
import { indicators } from '../../../pages/friends/Friendslist';
import { useSelector } from 'react-redux';
import { selectFriendById } from '../../../store/FriendsSlice';
import { UniversalEmptyState } from '../../UniversalEmptyState'
import { RiUserHeartLine } from "react-icons/ri";
const actionbtns = [{ svg: TbListDetails, bg: "bg-primary", label: "Details" }]
const RelationshipCard = ({ friend, Friend, setCurrentbalancewith, Openmodel }) => {
    return (
        <div className={`friend-balance bg-white rounded-lg shadow-md h-fit p-3`}>
            <div className="about-f-container flex items-center gap-2 ">
                <div className="about-f w-90 center-flex gap-3">
                    <div className="logo size-18 rounded-full ">
                        <img src={Friend.Image} className='Img-c border-none' alt="friend-img" />
                    </div>
                    <div className="info flex-1">
                        <h3 className='font-semibold'>{Friend.Name} </h3>
                        <p className='text-[12px] text-text-secondary'>{Friend.Bio}</p>
                    </div>
                </div>
                <div className="extra  flex-1 h-20 center-flex">
                    <div className="actions w-20 center-flex flex-col items-end gap-2">
                        {actionbtns.map((button, index) => (
                            <button key={index} className={`group flex items-center  h-8 min-w-8 px-1.5 rounded-lg cursor-pointer ${button.bg}`} onClick={() => {
                                index === 0 && Openmodel()
                                setCurrentbalancewith(friend.id)
                            }}>
                                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:mr-2 trans whitespace-nowrap text-white text-sm">
                                    {button.label}
                                </span>
                                <button.svg className='text-white size-5' />
                            </button>
                        ))}
                    </div>
                </div>

            </div>
            <div className="balance h-20 mt-2  border-l w-60 p-2 mx-auto center-flex flex-col ">
                <div className="center-flex gap-3"
                >
                    <div className={`logo size-10 rounded-full center-flex ${friend.netBalance < 0 ? indicators.debtor.balancebgClass : friend.netBalance > 0 ? indicators.creditor.balancebgClass : indicators.settled.balancebgClass}`}>
                        <FaMoneyBillTransfer className='size-5 text-white' />
                    </div>
                    <div className="amount">
                        <h3 className={`font-semibold`}>
                            Rs.{Math.abs(friend.netBalance).toLocaleString()}
                        </h3>
                        <p className="font-semibold text-[13px]">Net Balance</p>
                    </div>
                </div>
                <p className="note text-text-secondary font-semibold text-[12px] ml-5 mt-1">{friend.netBalance < 0 ? `(You owed ${Memberdetails(friend.id)?.Name})` : friend.netBalance > 0 ? `(${Memberdetails(friend.id)?.Name} owes you)` : "(All setteled)"}</p>
            </div>
        </div>
    )
}
export const Balancef = ({ currentFriend }) => {
    const [popup, setpopup] = useState(false)
    const [Currentbalancewith, setCurrentbalancewith] = useState("")
    const Openmodel = () => {
        setpopup(true)
    }
    const Closemodel = () => [
        setpopup(false)
    ]
    return (
        <div className='p-5 flex flex-col h-full overflow-auto'>
            <div className="header  h-fit">
                <div className="info">
                    <div className="title center-flex w-fit gap-1">
                        <h3 className='font-semibold text-2xl'>Balances</h3>
                        <IoIosWallet className='size-5' />
                    </div>
                    <p className='text-sm text-text-secondary'>
                        Check your net balance with friends
                    </p>
                </div>
            </div>
            {currentFriend.Relationship.length > 0 ?
                <div className="friend-balances flex-1 h-fit mt-3  grid grid-cols-3 gap-3 auto-rows-min">
                    {currentFriend.Relationship?.map((rel, index) => {
                        const Friend = useSelector(state => selectFriendById(state, rel.id))
                        return (
                            <RelationshipCard
                                key={rel.id}
                                friend={rel}
                                Friend={Friend}
                                setCurrentbalancewith={setCurrentbalancewith}
                                Openmodel={Openmodel}
                            />
                        )
                    })
                    }
                </div>
                : <UniversalEmptyState
                    title="No shared balances"
                    description={`No shared balances for ${currentFriend.Name}. They haven't started sharing expenses with anyone yet.`}
                    textsize=""
                >
                    <div className="p-10 shadow-md bg-gray-50 rounded-full">
                        <RiUserHeartLine className="size-10 text-primary" />
                    </div>
                </UniversalEmptyState>
            }
            <Basemodel isOpen={popup}
                Closemodel={Closemodel}
                title={`Balance with ${Memberdetails(Currentbalancewith)?.Name}`}
            >
                <Balancewith
                    key={Currentbalancewith}
                    Currentbalancewith={Currentbalancewith}
                    currentFriend={currentFriend}
                />
            </Basemodel>
        </div>
    )
}
