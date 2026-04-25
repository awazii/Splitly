import React, { useState } from 'react'
import { GrTransaction } from "react-icons/gr";
import { categories } from '../../../../pages/Expenses/Expenses.jsx';
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { Transactions } from './Transactionshistory.jsx';
import { Transationdetail } from './transationdetail.jsx';
import { Settle } from '../settlements/Settle.jsx';
import { Paymentsuccesful } from '../settlements/payment.jsx';
import { Memberdetails } from '../../../../utils/Memberdetails.js';
export const Balancewith = ({ Currentbalancewith, currentFriend }) => {
  const [isdetailopen, setisdetailopen] = useState({
    open: false, trans: null
  });
  const [issettlementopen, setissettlementopen] = useState(false);
  const [ispaymentsuccessful, setispaymentsuccessful] = useState({ is: false, amount: 0 });
  return (
    <div className='w-130 h-fit'>
      <div className="profiles w-full center-flex gap-5 mt-2 mb-4">
        <div className="profile size-22 rounded-full center-flex border-primary border-2 p-1">
          <img src={currentFriend.Image} alt="current-friend-pic" className='Img-c border-none' />
        </div>
        <GrTransaction className='size-8 text-text-secondary' />
        <div className="profile size-22 rounded-full center-flex border-primary border-2 p-1">
          <img src={Memberdetails(Currentbalancewith)?.Image} alt="current-friend-pic" className='Img-c border-none' />
        </div>
      </div>
      {(!isdetailopen.open && !issettlementopen && !ispaymentsuccessful.is) && (
        <Transactions
          key="transactions-view"
          CurrentFriend={currentFriend}
          Currentbalancewith={Currentbalancewith}
          setisdetailopen={setisdetailopen}
          setissettlementopen={setissettlementopen}
        />
      )}
      {isdetailopen.open && (
        <Transationdetail
          key="detail-view"
          setisdetailopen={setisdetailopen}
          isdetailopen={isdetailopen}
          Currentbalancewith={Currentbalancewith}
          CurrentFriend={currentFriend}
        />
      )}
      {issettlementopen && (
        <Settle
          key="settle-form"
          CurrentFriend={currentFriend}
          Currentbalancewith={Currentbalancewith}
          setissettlementopen={setissettlementopen}
          setispaymentsuccessful={setispaymentsuccessful}
        />
      )}
      {ispaymentsuccessful.is && (
        <Paymentsuccesful
          key="success-view"
          Currentbalancewith={Currentbalancewith}
          setispaymentsuccessful={setispaymentsuccessful}
          ispaymentsuccessful={ispaymentsuccessful}
        />
      )}
    </div>
  )
}
