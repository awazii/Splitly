import React from 'react'
import { Friends } from '../../friends/Friendslist'
import { FaArrowRightLong } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
export const Settlements = [
    {
        id: "trans_201",
        payer: Friends.find(f => f.id === "002"),
        receivers: [
            {
                person: { type: "temporary", name: "laraib" },
                debt: 1000
            },
            {
                person: Friends.find(f => f.id === "001"),
                debt: 500
            }
        ],
        totalAmount: 1500
    },
    {
        id: "trans_202",
        payer: Friends.find(f => f.id === "004"),
        receivers: [
            {
                person: Friends.find(f => f.id === "001"),
                debt: 2250
            },
            {
                person: Friends.find(f => f.id === "005"),
                debt: 750
            }
        ],
        totalAmount: 3000
    },
    {
        id: "trans_203",
        payer: Friends.find(f => f.id === "003"),
        receivers: [
            {
                person: Friends.find(f => f.id === "001"),
                debt: 3000
            }
        ],
        totalAmount: 3000
    },
    {
        id: "trans_204",
        payer: Friends.find(f => f.id === "007"),
        receivers: [
            {
                person: Friends.find(f => f.id === "006"),
                debt: 450
            }
        ],
        totalAmount: 450
    },
    {
        id: "trans_205",
        payer: Friends.find(f => f.id === "001"),
        receivers: [
            {
                person: Friends.find(f => f.id === "002"),
                debt: 5000
            }
        ],
        totalAmount: 5000
    }
];
export const Settelments = () => {
    return (
        <div className='size-full card-b rounded-lg shadow p-4'>
            <h3 className='font-semibold text-lg'>Final Settlements</h3>
            <div className='debts h-138 mt-2 overflow-auto space-y-4 '>
                {Settlements.map((settlement, index) => (
                    <div key={index} className="debt  w-full min-h-30  center-flex justify-between px-5 gap-2 ">
                        <div className="Debtor w-80 shadow-md rounded-lg h-25 center-flex gap-2 bg-white relative">
                            <div className="flag absolute top-2 right-2"><GiReceiveMoney className='text-red-600 size-5' /></div>
                            <div className="logo size-18 rounded-full">
                                <img src={settlement.payer.profilePic} className='Img-c border-none' alt="" />
                            </div>
                            <div className="info w-25">
                                <div className="name font-semibold">{settlement.payer.name}</div>
                                <div className="description text-sm text-text-secondary"> {settlement.payer.bio}</div>
                                <p className='font-semibold text-right text-red-600 text-sm'>Rs. {settlement.totalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="marker w-20  h-10 rounded-2xl center-flex">
                            <FaArrowRightLong className='text-primary size-10' />
                        </div>
                        <div className="creditors w-75 space-y-2 my-2">
                            {settlement.receivers.map((receiver, index) => (
                                <div key={index} className="creditor shadow-md rounded-lg h-25 center-flex gap-2 bg-white relative">
                                    <div className="flag absolute top-2 left-2"><GiPayMoney  className='text-green-600 size-4' /></div>
                                    {receiver.person.type === "temporary" ? <div className="friend-img-container size-16 bg-neutral-300 rounded-full center-flex">
                                        <IoPerson className='size-7 text-neutral-500' />
                                    </div> :<div className="logo  size-18 rounded-full">
                                        <img src={receiver.person.profilePic} className='Img-c border-none' alt="" />
                                    </div>}        
                                    <div className="info w-25">
                                        <div className="name font-semibold">{receiver.person.name}</div>
                                        <p className="description text-sm text-text-secondary">{receiver.person.bio || "temporary"}</p>
                                        <p className='font-semibold text-right text-green-600 text-sm'>Rs. {receiver.debt}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
