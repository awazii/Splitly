import React from 'react'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import Settlebtn from '../../Common/Settlebtn';
import { indicators } from '../../../../pages/friends/Friendslist';
import { Memberdetails } from '../../../../utils/Memberdetails';
import { Transactioncard } from './transactioncard';
import { MingleExpenses } from "../../../../store/ExpenseSlice"
import { useSelector } from 'react-redux';
export const Transactions = ({ Currentbalancewith, setissettlementopen, setisdetailopen, CurrentFriend }) => {
  const transactions = useSelector(state => MingleExpenses(state, CurrentFriend, Currentbalancewith))
  const netBalance = CurrentFriend.Relationship.find(r => r.id === Currentbalancewith).netBalance
  const bgcolor = netBalance < 0 ? indicators.debtor.balancebgClass : netBalance > 0 ? indicators.creditor.balancebgClass : indicators.settled.balancebgClass
  const textcolor = netBalance < 0 ? indicators.debtor.balancetextClass : netBalance > 0 ? indicators.creditor.balancetextClass : indicators.settled.balancetextClass
  return (
    <>
      <div className="netbalance w-70 h-fit card-b bg-white border-none rounded-2xl mx-auto center-flex flex-col gap-2 p-3 ">
        <h3 className='font-bold text-lg'>Net Balance</h3>
        <div className="amount center-flex gap-3">
          <div className={`logo size-10 rounded-full center-flex ${bgcolor}`}>
            <FaMoneyBillTransfer className='size-5 text-white' />
          </div>
          <div className="amount center-flex gap-1">
            <h3 className={`${textcolor} font-semibold text-2xl`}>
              Rs.{Math.abs(netBalance).toLocaleString()}
            </h3>
            <p className={`font-semibold text-sm ${textcolor} `}>{netBalance === 0 ? "(Settled)" : ""}</p>
          </div>
        </div>
        {netBalance !== 0 &&
          <p className="note text-text-secondary font-semibold text-sm">{netBalance < 0 ? `(You owed ${Memberdetails(Currentbalancewith)?.Name})` : `(${Memberdetails(Currentbalancewith)?.Name} owes you)`}</p>
        }
        {netBalance < 0 && <Settlebtn setissettlementopen={setissettlementopen} />}
      </div>
      <div className="transactions-container mt-6 px-2">
        <div className="title w-fit center-flex gap-1 text-gray-800">
          <FaHistory className='size-5 ' />
          <h3 className='text-xl font-semibold '>Transaction History</h3>
        </div>
        <div className="transcations h-105 mt-2 overflow-y-auto space-y-2 pb-2">
          {transactions.map((trans, index) => {
            return (
              <Transactioncard key={index} trans={trans}  CurrentFriend={CurrentFriend} Currentbalancewith={Currentbalancewith} setisdetailopen= {setisdetailopen}  />
            )
          })}
        </div>
      </div>
    </>
  )
}
