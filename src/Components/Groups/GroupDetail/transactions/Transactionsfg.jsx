import React ,{useState} from 'react'
import { categories } from '../../../../pages/Expenses/Expenses';
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { Transactionlist } from './Transactionlistg';
import { Transactiondetailsfg } from './Transactiondetailsfg';
export const Transactions = ({Currentfriend}) => {
   const [isdetailopen, setisdetailopen] = useState({open: false, trans: null});
  return (
    <div className='mx-3 mt-5 h-full'>
      {isdetailopen.open ? <Transactiondetailsfg setisdetailopen={setisdetailopen} isdetailopen={isdetailopen} Currentfriend={Currentfriend} /> : <Transactionlist setisdetailopen={setisdetailopen}
      Currentfriend={Currentfriend} />}
    </div>
  )
}
