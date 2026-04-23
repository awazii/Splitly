import React ,{useState} from 'react'
import { GrTransaction } from "react-icons/gr";
import { categories } from '../../Expenses/Expenses.jsx';
import mountain from "../../../assets/groups/mountain.jpg"
import beach from "../../../assets/groups/Sea.jpg"
import concert from "../../../assets/groups/concert.jpg"
import Restaurant from "../../../assets/groups/Restaurant.jpg"
import Other from "../../../assets/groups/default.jpg"
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { Transactions } from './Transactionshistory.jsx';
import { Transationdetail } from './transationdetail';
import { Settlements } from './Settlements';
import {Paymentsuccesful} from './payment.jsx';
export const Balancewith = ({ Currentbalancewith, currentFriend }) => {
  const [isdetailopen, setisdetailopen] = useState({open: false, id: null});
  const [issettlementopen, setissettlementopen] = useState(false);
  const [ispaymentsuccessful, setispaymentsuccessful] = useState(false);
  return (
    <div className='w-130 h-fit'>
      <div className="profiles w-full center-flex gap-5 mt-2 mb-4">
        <div className="profile size-22 rounded-full center-flex border-primary border-2 p-1">
          <img src={currentFriend.profilePic} alt="current-friend-pic" className='Img-c border-none' />
        </div>
        <GrTransaction className='size-8 text-text-secondary' />
        <div className="profile size-22 rounded-full center-flex border-primary border-2 p-1">
          <img src={Currentbalancewith.profilePic} alt="current-friend-pic" className='Img-c border-none' />
        </div>
      </div>     
      {(!isdetailopen.open && !issettlementopen && !ispaymentsuccessful) && <Transactions Currentbalancewith={Currentbalancewith} setisdetailopen={setisdetailopen} setissettlementopen={setissettlementopen}/>}
       {isdetailopen.open && <Transationdetail setisdetailopen={setisdetailopen} isdetailopen={isdetailopen} Currentbalancewith={Currentbalancewith} CurrentFriend={currentFriend} />}
      {issettlementopen && <Settlements Currentbalancewith={Currentbalancewith} setissettlementopen={setissettlementopen} setispaymentsuccessful={setispaymentsuccessful}/>}
      {(ispaymentsuccessful)&& <Paymentsuccesful Currentbalancewith={Currentbalancewith} setispaymentsuccessful={setispaymentsuccessful}/>}
    </div>
  )
}
