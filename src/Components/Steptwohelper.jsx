import React from 'react'
import { FaRupeeSign } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { useFormContext, Controller } from 'react-hook-form';
export const Steptwohelper = ({ Friends, paymentdata }) => {
  const { control, register, setValue, trigger, getValues, watch, setError, clearErrors, formState: { errors } } = useFormContext();
  const livemembers = watch("MasterMembers");
  const Total = Number(getValues("totalAmount"));
  return (
    <>
      <div className="payment-container h-20 p-2 grid grid-cols-3 gap-4  mt-3">
        {paymentdata.map((item, index) => (
          <div key={index} className={`${item.label}  bg-white rounded-lg shadow-md h-full flex flex-col justify-center relative`}>
            <div className={`logo absolute top-0 right-0 rounded-full m-2 ${item.label === "Amount Collected" ? "bg-green-500 p-1" : ""}  center-flex`}>
              {item.logo}
            </div>
            <div className="col-header  border-b-light center-flex flex-col">
              <h4 className="text-sm font-semibold">{item.label}</h4>
              <p className="text-lg">Rs.{item.amount.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="friends-payments-container mt-3">
        <div className='flex justify-between'>
          <h4 className="text-md font-semibold my-2">
            How much each person paid?
          </h4>
          {errors.stepTwoTotal && <p className='text-red-500 text-sm  mt-2 text-end'>{errors.stepTwoTotal.message}</p>}
        </div>
        <div className="friends-payments grid grid-cols-2  gap-3 max-h-100 overflow-auto border-l p-2">
          {Friends.map((friend, index) => {
            return (
              <div key={index} className="friend-payment bg-highlight rounded-lg p-4 flex  gap-3 h-22 justify-between items-center shadow-md relative">
                <div className="friend-info center-flex  gap-2 ">
                  <div className="friend-img-container size-16">
                    {friend.type === "temporary" ? (
                      <div className="friend-img-container size-16 bg-neutral-300 rounded-full center-flex">
                        <IoPerson className='size-7 text-neutral-500' />
                      </div>
                    ) : (
                      <img src={friend.Image} className='Img-c' alt="friend-img" />
                    )}
                  </div>
                  <div className="friend-info flex justify-center flex-col">
                    <h2 className='text-sm font-semibold'>{friend.Name}</h2>
                    <p className='text-[12px] text-text-secondary'>
                      {friend.type === "temporary" ? "Temporary Friend" :
                        friend.Bio}</p>
                  </div>
                </div>
                <div className="payment-input flex center-flex gap-1 card-b bg-white border-none rounded-lg p-2 flex-row-reverse ">
                  <FaRupeeSign className='text-green-500' />
                  <input  {...register(`MasterMembers.${index}.spent`, {
                    required: "Amount is required",
                    validate: value => {
                      const otherPeoplePaid = livemembers.reduce((sum, member, i) => {
                        if (i === index) return sum;
                        return sum + Number(member.spent || 0);
                      }, 0);
                      const remainingBalance = Total - otherPeoplePaid
                      return value <= remainingBalance || "Amount cannot exceed remaining balance";
                    }
                  })} type="number" placeholder='0' className='w-18 text-left focus:outline-none' onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                      e.preventDefault();
                    }
                  }} />
                </div>
                {errors.MasterMembers?.[index]?.spent && (
                  <p className='text-red-500 text-xs mt-1 absolute bottom-1 right-5'>{errors.MasterMembers[index].spent.message}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </>
  )
}
