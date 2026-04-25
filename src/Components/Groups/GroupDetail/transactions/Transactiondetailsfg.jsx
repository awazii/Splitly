import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { MdPayments } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { categories } from '../../../../pages/Expenses/Expenses';
import { indicators } from '../../../../pages/friends/Friendslist';
import { Memberdetails } from '../../../../utils/Memberdetails';
export const Transactiondetailsfg = ({ isdetailopen, setisdetailopen, Currentfriend }) => {
    const currentTransaction = isdetailopen.trans
    const Friend = currentTransaction.Members.find(f => f.id === Currentfriend.id)
    const netbalance = Number(Friend.spent || 0) - Number(Friend.share || 0)
    return (
        <div className='transaction-details h-[94%] overflow-auto space-'>
            <div className="header center-flex w-fit gap-1 text-gray-800">
                <button className="backbtn rounded-lg cursor-pointer group trans hover:scale-102 active:scale-95 " onClick={() => { setisdetailopen({ open: false, id: null }) }}>
                    <GoArrowLeft className='size-6 group-hover:text-primary' />
                </button>
                <h3 className='font-semibold text-xl '>Transcation Details</h3>
            </div>
            <div className="transaction-info w-[50%] mx-auto my-2 py-4 bg-white rounded-xl h-fit shadow-md center-flex flex-col">
                <div className="expense-info center-flex gap-2 flex-col">
                    <div className="expense-logo size-15 rounded-full  center-flex shadow-md" style={{ background: categories[currentTransaction.Category]?.gradient }}>
                        {categories[currentTransaction.Category]?.icon}
                    </div>
                    <p className='expense-name'>{currentTransaction.Name}</p>
                </div>
                <div className="Total-particpants text-text-secondary center-flex gap-1 mb-1">
                    <IoMdPerson className='size-4' />
                    <h3 className=' text-sm '>participants: <span className=' font-semibold'> {currentTransaction.Members.length}
                    </span> </h3>
                </div>
                <div className="expense-amount">
                    <h2 className={`text-3xl font-semibold center-flex gap-1 `}>Rs.{Math.abs(currentTransaction.totalAmount).toLocaleString()} <span className='text-[13px]'>{`(Total expense)`}</span></h2>
                </div>
                <div className="expense-date text-text-secondary text-sm">
                    <p>{currentTransaction.createdDate}</p>
                </div>
            </div>
            <div className="payment-details mt-2">
                <div className="heading  center-flex gap-1 text-gray-800 mx-2">
                    <h3 className='text-xl font-semibold'>Paid by</h3>
                    <MdPayments className='size-5' />
                </div>
                <div className="paidby-list my-2 space-y-2 px-3 h-fit bg-white rounded-xl shadow-md w-[70%] mx-auto overflow-y-auto  py-2 ">
                    {currentTransaction.Members.map((member, index) => {
                        if (member.spent == 0) return
                        return (
                            <div key={index} className="paidby-item flex justify-between items-center border-b border-b-light  pb-2 last:border-b-0">
                                <div className="about center-flex gap-3">
                                    <div className="logo size-10 rounded-full border-b-light shadow-md border overflow-hidden center-flex">
                                        <img src={Memberdetails(member.id)?.Image} alt="person-logo" className='Img-c border-none' />
                                    </div>
                                    <p className=''>{`${Memberdetails(member.id)?.Name}`}</p>
                                </div>
                                <div className="amount text-lg font-semibold text-text-primary">
                                    Rs.{Number(member.spent).toLocaleString()}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="splitdetails">
                <div className="heading  center-flex gap-1 text-gray-800 mx-2 mt-3">
                    <h3 className='text-xl font-semibold'>Split Details</h3>
                    <IoTicket className='size-5' />
                </div>
                <div className="split-list my-2 space-y-2">
                    <div className="split-method">
                        <h4 className='text-md font-semibold text-text-secondary center-flex gap-1'>Split Method: <span className='text-text-primary'>{currentTransaction.splitMethod}</span></h4>
                    </div>
                    <div className="split-items mt-2 space-y-2 px-3 max-h-40  w-[70%] mx-auto overflow-y-auto ">
                        {currentTransaction.Members.map((member, index) => {
                            if (member.share == 0) return
                            return (
                                <div key={index} className="paidby-item flex justify-between items-center pb-2 shadow rounded-md bg-white p-2">
                                    <div className="about center-flex gap-3">
                                        <div className="logo size-10 rounded-full border-b-light shadow-md border overflow-hidden center-flex">
                                            <img src={Memberdetails(member.id)?.Image} alt="person-logo" className='Img-c border-none' />
                                        </div>
                                        <p className=''>{`${Memberdetails(member.id)?.Name}`}</p>
                                    </div>
                                    <div className="amount text-lg font-semibold text-text-primary">
                                        Rs.{Number(member.share).toLocaleString()}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="settelemnts">
                <div className="heading  center-flex gap-1 text-gray-800 mx-2 mt-3">
                    <h3 className='text-xl font-semibold'>Settelemnts</h3>
                    <FaMoneyBillTransfer className='size-5' />
                </div>
                <div className={`settelemnts-list mt-2 space-y-2 ${(currentTransaction.Settlements.length !== 0 && netbalance !== 0) ? "h-30" : "h-fit"}  w-[70%] mx-auto overflow-y-auto`}>
                    {(currentTransaction.Settlements.length !== 0 && netbalance !== 0)
                        ? <>
                            {currentTransaction.Settlements.map((settlement, index) => {
                                return (
                                    <div key={index} className="settlement-item  bg-white p-2 rounded-lg shadow-md flex justify-between items-center">
                                        <div className="about center-flex gap-3">
                                            <div className={`logo size-9 center-flex  rounded-full ${settlement.to === Currentfriend.id ? "bg-green-600" : "bg-red-600"}`}>
                                                <FaMoneyBillTransfer className='size-5 text-white' />
                                            </div>
                                            <p className=''>{`${Memberdetails(settlement.from)?.Name} owes ${Memberdetails(settlement.to)?.Name}`}</p>
                                        </div>
                                        <div className={`amount text-lg font-semibold ${settlement.to === Currentfriend.id ? "text-green-600" : "text-red-600"}`}>
                                            Rs.{settlement.amount.toLocaleString()}
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                        : <div className='text-center text-text-secondary'>No settlements needed</div>
                    }

                </div>
            </div>
        </div>
    )
}
