import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { transactions } from './Balancewith';
import Settlebtn from './Settlebtn'; 
export const Transactions = ({Currentbalancewith,setissettlementopen, setisdetailopen}) => {
  return (
    <>
      <div className="netbalance w-70 h-fit card-b bg-white border-none rounded-2xl mx-auto center-flex flex-col gap-2 p-3 ">
        <h3 className='font-bold text-lg'>Net Balance</h3>
        <div className="amount center-flex gap-3">
          <div className={`logo size-10 rounded-full center-flex ${Currentbalancewith.balancebgClass}`}>
            <FaMoneyBillTransfer className='size-5 text-white' />
          </div>
          <div className="amount center-flex gap-1">
            <h3 className={`${Currentbalancewith.balancetextClass} font-semibold text-2xl`}>
              Rs.{Math.abs(Currentbalancewith.netBalance).toLocaleString()}
            </h3>
            <p className={`font-semibold text-sm ${Currentbalancewith.balancetextClass} `}>{Currentbalancewith.netBalance === 0 ? "(Settled)" : ""}</p>
          </div>
        </div>
        {Currentbalancewith.netBalance !== 0 &&
          <p className="note text-text-secondary font-semibold text-sm">{Currentbalancewith.netBalance < 0 ? `(You owed ${Currentbalancewith.name})` : `(${Currentbalancewith.name} owes you)`}</p>
        }
        {Currentbalancewith.netBalance < 0 && <Settlebtn setissettlementopen={setissettlementopen}/>}
      </div>
      <div className="transactions-container mt-6 px-2">
        <div className="title w-fit center-flex gap-1 text-gray-800">
          <FaHistory className='size-5 ' />
          <h3 className='text-xl font-semibold '>Transaction History</h3>
        </div>
        <div className="transcations h-105 mt-2 overflow-y-auto space-y-2 pb-2">
          {transactions.map((trans, index) => {
            return (
              <div key={index} className='expense relative bg-white shadow h-32 rounded-lg'>
                <div className='expense-detail-btn absolute bottom-4 right-5'>

                </div>
                <div className="expense-info  w-[92%] h-20 mx-auto mt-1  rounded-lg center-flex gap-3">
                 {!trans.payment ? <div className="expense-logo  size-13 rounded-lg  center-flex shadow-md" style={{ background: trans.category.gradient }}>
                    {trans.category.icon}
                  </div>: 
                  <div className={`expense-logo  size-13 rounded-lg  center-flex shadow-md ${trans.balancebgClass}`}>
                    {trans.icon}
                  </div>}
                  <div className='expense-details flex-1  h-15 flex justify-between gap-1 items-center'>
                    <div className='expense-left'>
                      <h2 className='font-semibold line-clamp-1 '>{!trans.payment ? trans.title : `${trans.title} ${Currentbalancewith.name}`}</h2>
                      <div className="category-date flex items-center gap-1">
                        <span className='text-sm text-text-secondary'>{!trans.payment ? trans.category.name : "Settlement"}</span>
                        <span className='text-sm text-text-secondary'>•</span>
                        <span className='text-sm text-text-secondary'>{trans.date}</span>
                      </div>
                    </div>
                    <div className='expense-right text-right'>
                      <h2 className={`text-xl ${trans.balancetextClass} font-semibold `}>Rs.{Math.abs(trans.amount).toLocaleString()}</h2>
                      {!trans.payment ? <span className='text-[12px] text-text-secondary'>{trans.amount > 0 ? 'You lent ' : 'You borrowed'}</span> : <span className='text-[12px] text-text-secondary'>{`You ${trans.payment}`}</span>}
                    </div>
                  </div>
                </div>
                <div className='h-10 flex items-center justify-between mx-5  '>
                  {trans.group && <div className="group-details center-flex ml-5">
                    <div className="group-logo size-10 rounded-full border-b-light shadow-md border">
                      <img src={trans.group.img} alt="" className='Img-c' />
                    </div>
                    <div className="about ml-2">
                      <h4 className='text-sm  line-clamp-1 text-text-secondary font-semibold'>{trans.group.name }</h4>
                    </div>
                  </div>}
                  {trans.payment && 
                    <div className={`payment-indicator w-fit center-flex p-1 border-l`}>
                     <p className={`text-sm font-semibold center-flex ${trans.balancetextClass}`}>
                     <span><TiTick  className='size-5'/></span> {trans.payment}
                      </p> 
                    </div>}
                { !trans.payment && <button className="details-btn cursor-pointer text-text-secondary hover:text-primary center-flex hover:scale-105  trans border-l" onClick={()=>{
                    setisdetailopen({open: true, id: trans.id});
                }}>
                    <MdKeyboardArrowRight className='size-7' />
                  </button>}
                </div>
              </div>)
          })}
        </div>
      </div>
    </>
  )
}
