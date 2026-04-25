import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { MdPayments } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { categories } from '../../../../pages/Expenses/Expenses';
import { Memberdetails } from '../../../../utils/Memberdetails';
import { indicators } from '../../../../pages/friends/Friendslist';
export const Transationdetail = ({ Currentbalancewith, setisdetailopen, isdetailopen, CurrentFriend }) => {
    const trans = isdetailopen.trans
    const Paidby = trans.Members.filter(m=> (m.id === Currentbalancewith || m.id === CurrentFriend.id) && m.spent !=="" )
    const Sharedby = trans.Members.filter(m=> (m.id === Currentbalancewith || m.id === CurrentFriend.id) )
    const Settlement = trans.Settlements.find(s =>
        (s.from === CurrentFriend.id && s.to === Currentbalancewith) ||
        (s.from === Currentbalancewith && s.to === CurrentFriend.id)
    )
    const textcolor = Settlement.to === Currentbalancewith ? indicators.debtor.balancetextClass : indicators.creditor.balancetextClass
    const bgcolor = Settlement.to === Currentbalancewith ? indicators.debtor.balancebgClass : indicators.creditor.balancebgClass

    const descripion = Settlement.to === Currentbalancewith ? ' You borrowed' : 'You lent '
    return (
        <div className='transaction-details'>
            <div className="header center-flex w-fit gap-1 text-gray-800">
                <button className="backbtn rounded-lg cursor-pointer group trans hover:scale-102 active:scale-95 " onClick={() => { setisdetailopen({ open: false, trans: null }) }}>
                    <GoArrowLeft className='size-6 group-hover:text-primary' />
                </button>
                <h3 className='font-semibold text-xl '>Transcation Details</h3>
            </div>
            <div className="transaction-info w-[60%] mx-auto mt-2 py-4 bg-white rounded-xl h-fit shadow-md center-flex flex-col">
                <div className="expense-info center-flex gap-2 flex-col">
                    <div className="expense-logo size-15 rounded-full  center-flex shadow-md" style={{ background: categories[trans.Category]?.gradient }}>
                        {categories[trans.Category]?.icon}
                    </div>
                    <p className='expense-name'>{trans.Name}</p>
                </div>
                <div className="expense-amount">
                    <h2 className={`text-3xl font-semibold center-flex gap-1 `}>Rs.{Number(trans.totalAmount).toLocaleString()} <span className='text-[13px]'>{`(Total Expense)`}</span></h2>
                </div>
                <div className="expense-date text-text-secondary text-sm">
                    <p>{trans.createdDate} <span>•</span> <span>{trans.Time}</span></p>
                </div>
            </div>
            <div className="payment-details mt-2">
                <div className="heading w-fit center-flex gap-1 text-gray-800 mx-2">
                    <h3 className='text-xl font-semibold'>Paid by</h3>
                    <MdPayments className='size-5' />
                </div>
                <div className="paidby-list mt-2 space-y-2 px-3 h-fit bg-white rounded-xl shadow-md w-[80%] mx-auto overflow-y-auto  py-2">
                    {Paidby.map((person, index) => {
                        return (
                            <div key={index} className="paidby-item flex justify-between items-center border-b border-b-light  pb-2 ">
                                <div className="about center-flex gap-3">
                                    <div className="logo size-10 rounded-full border-b-light shadow-md border overflow-hidden center-flex">
                                        <img src={Memberdetails(person.id)?.Image} alt="person-logo" className='Img-c border-none' />
                                    </div>
                                    <p className='text-lg'>{Memberdetails(person.id)?.Name}</p>
                                </div>
                                <div className="amount text-xl font-semibold text-text-primary">
                                    Rs.{Number(person.spent).toLocaleString()}
                                </div>
                            </div>
                        )
                    })}
                    <div className='flex justify-between gap-2'>
                        <div className="about center-flex gap-3">
                            <div className={`logo size-9 center-flex ${bgcolor} rounded-full`}>
                                <FaMoneyBillTransfer className='size-5 text-white' />
                            </div>
                            <h4>
                                {descripion} </h4>
                        </div>
                        <div className={`amount text-xl font-semibold ${textcolor}`}>
                            Rs.{Math.abs(Settlement.amount).toLocaleString()}
                        </div>
                    </div>

                </div>
            </div>
            <div className="splitdetails">
                <div className="heading w-fit center-flex gap-1 text-gray-800 mx-2 mt-3">
                    <h3 className='text-xl font-semibold'>Split Details</h3>
                    <IoTicket className='size-5' />
                </div>
                <div className="split-list mt-2 space-y-2  h-45  w-[80%] mx-auto overflow-y-auto">
                    <div className="split-method">
                        <h4 className='text-md font-semibold text-text-secondary center-flex gap-1'>Split Method: <span className='text-text-primary'>{trans.splitMethod}</span></h4>
                    </div>
                    {Sharedby.map((person, index) => {
                        return (
                            <div key={index} className="split-item  bg-white p-2 rounded-lg shadow-md flex justify-between items-center">
                                <div className="about center-flex gap-3">
                                    <div className="logo size-10 rounded-full border-b-light shadow-md border overflow-hidden center-flex">
                                        <img src={Memberdetails(person.id)?.Image} alt="person-logo" className='Img-c border-none' />
                                    </div>
                                    <p className='text-lg'>{ Memberdetails(person.id)?.Name}</p>
                                </div>
                                <div className="amount text-xl font-semibold text-text-primary">
                                     Rs.{person.share.toLocaleString()}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}
