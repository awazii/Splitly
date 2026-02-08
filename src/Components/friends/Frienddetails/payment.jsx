import React from 'react'
import Closebtn from './Closebtn';
import  Indicator from './Inditcator';
export const Paymentsuccesful = ({Currentbalancewith,setispaymentsuccessful}) => {
  return (
    <div className='center-flex gap-1 flex-col'>
      <div className="pay-succesindicator">
        <Indicator />
      </div>
        <div className="pay-details center-flex flex-col  p-2">
            <h2 className='text-green-600 text-2xl font-semibold'>Payment Successful!</h2>
            <p className='text-sm text-text-secondary'>You paid <span className='font-bold'>{`Rs. ${Math.abs(Currentbalancewith.netBalance)}`}</span>{` to ${Currentbalancewith.name}.`}</p>
        </div>
        <div className="action">
            <Closebtn setispaymentsuccessful={setispaymentsuccessful} />
        </div>
    </div>
  )
}
