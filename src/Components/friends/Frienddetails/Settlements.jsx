import React from 'react'
import { TbCreditCardPay } from "react-icons/tb";
import Settleinput from './Settleinput';
import Paybtn from "./Paybtn"
export const Settlements = ({ Currentbalancewith, setissettlementopen, setispaymentsuccessful }) => {
  return (
    <div className="h-76 p-2 space-y-2">
      <h3 className='font-semibold text-gray-800 center-flex gap-2 w-fit'> <TbCreditCardPay className='size-6' />Direct Payment</h3>
      <div className="progress h-25 rounded-lg shadow-md  p-4 bg-white ">
        <div className="amounts flex justify-between mt-2">
          <div className="remaining font-bold ">Rs.0</div>
          <div className="paid font-bold ">{`Rs.${Math.abs(Currentbalancewith.netBalance).toLocaleString()}`}</div>
        </div>
        <div className="progress-bar-container relative">
          <div className="progress-bar w-full h-3 bg-gray-200 rounded-full mt-1 overflow-hidden">
            <div className={`progress w-2/3 bg-red-600 h-3 rounded-full`}></div>
          </div>
          <div className="total absolute  right-0  mt-1 text-sm">Total Debt</div>
          <div className="remaining absolute  left-0 mt-1 text-sm">Remaining</div>
        </div>

      </div>
      <div className="settle-input-container center-flex shadow-md w-full border-l">
        <Settleinput />
        <div className="note">
          <p className='text-sm text-text-secondary'>
           <span className='font-semibold'> Note:</span> This will log a direct payment between you and {Currentbalancewith.name}, and adjust the net balances accordingly.
          </p>
        </div>
      </div>
      <div className="actions mt-4 center-flex flex-col gap-2">
        <Paybtn  setispaymentsuccessful={setispaymentsuccessful} setissettlementopen={setissettlementopen}/>
        <button className="underline text-gray-800 font-semibold cursor-pointer" onClick={() => setissettlementopen(false)}>Cancel</button>
      </div>
    </div>
  )
}
