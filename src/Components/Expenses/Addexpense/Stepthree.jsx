import React, { useState, useMemo, useEffect } from 'react'
import Select_split from '../Common/Select-split';
import Split_btn from '../Common/Split-btn';
import { IoPerson } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa6";
import { FaPercentage } from "react-icons/fa";
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../../../store/FriendsSlice';
import { useWatch } from 'react-hook-form';
export const Stepthree = () => {
  const { getValues,control, register, formState: { errors , isSubmitting }, setError,
    clearErrors } = useFormContext();
  const ExpenseMembers = getValues("MasterMembers");
  const AllFriends = useSelector(selectAllFriends);
  const TotalAmount = getValues("totalAmount");
  const Share = useWatch({ name: "Share", control });
  const Splitopt = useWatch({ name: "splitMethod", control });
  let currentpercentage = Object.values(Share["By Percentage"] || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  let currentamount = Object.values(Share["Unequally"] || {}).reduce((sum, value) => sum + Number(value || 0), 0);
  const Friends = useMemo(() => {
    return AllFriends.filter(friend =>
      ExpenseMembers.some(member => member.id === friend.id)
    );
  }, [AllFriends, ExpenseMembers]);
  useEffect(() => {
    if (!Share || !Splitopt) return;

    let groupError = null;
    if (Splitopt === "By Percentage") {
      const totalPercent = Object.values(Share["By Percentage"] || {})
        .reduce((sum, val) => sum + Number(val || 0), 0);

      if (totalPercent > 100) {
        groupError = "Total % cannot exceed 100%";
      }
    }

    if (Splitopt === "Unequally") {
      const totalAmount = Object.values(Share["Unequally"] || {})
        .reduce((sum, val) => sum + Number(val || 0), 0);

      if (totalAmount > TotalAmount) {
        groupError = "Cannot exceed total expense";
      }
    }
    if (groupError) {
      setError("Sharecollected", { message: groupError });
    } else {
      clearErrors("Sharecollected");
    }
  }, [Share, Splitopt]);
  const Splits = [
    {
      label: "Equally",
      description: "Everyone contributes the same share.",
      example: `Total Rs.${Number(TotalAmount).toLocaleString()} ÷ ${ExpenseMembers.length} people = Rs.${Math.floor(TotalAmount / ExpenseMembers.length).toLocaleString()} each`,
      prompt: "Do you want to split this bill equally among all members?"
    },
    {
      label: "Unequally",
      description: "Assign specific amounts to each person.",
      example: "Person A pays Rs.5000, Person B pays Rs.2000...",
      prompt: "Choose who pays how much — perfect for custom splits."
    },
    {
      label: "By Percentage",
      description: "Divide the total by assigning percentages.",
      example: "Person A pays 50%, Person B pays 25%...",
      prompt: "Set percentages for each member to split fairly."
    }
  ];
  return (
    <div className=' h-fit mt-2 grid grid-cols-5  rounded-lg gap-3  p-2'>
      <div className="friends-splits-container col-span-3 flex flex-col gap-2">
        {<div className="progress h-30 rounded-lg shadow-md  p-4 bg-white ">
          <h3 className='font-semibold text-text-secondary'>Total Expense Amount</h3>
          {Splitopt === "By Percentage" ? <>
            <div className="amounts flex justify-between mt-2">
              <div className="remaining font-bold ">{100 - currentpercentage}%</div>
              <div className="paid font-bold ">Rs.{Number(TotalAmount).toLocaleString()}</div>
            </div></> :
            <div className="amounts flex justify-between mt-2">
              <div className="remaining font-bold ">Rs.{Splitopt !== "Equally" ? `${Number(TotalAmount - currentamount).toLocaleString()}` : "0"}</div>
              <div className="paid font-bold ">Rs.{Number(TotalAmount).toLocaleString()}</div>
            </div>}
          <div className="progress-bar-container relative">
            <div className="progress-bar w-full h-3 bg-gray-200 rounded-full mt-1 overflow-hidden">
              <div className={`progress  bg-primary h-3 rounded-full`}
                style={
                  {
                    width: Splitopt === "By Percentage" ? `${currentpercentage}%` : Splitopt === "Unequally" ? `${(currentamount / TotalAmount) * 100}%` : "100%"
                  }
                }
              ></div>
            </div>
            <div className="total absolute  right-0  mt-1 text-sm">Total</div>
            <div className="remaining absolute  left-0 mt-1 text-sm">Remaining</div>
          </div>
        </div>}
        <div className={`friends-splits-list  mt-2`}>
          <p className='font-semibold '>
            {Splits.find(split => split.label === Splitopt)?.prompt}
          </p>
          {errors.Sharecollected && (
            <p className="text-red-500 text-sm mb-2 text-end">{errors.Sharecollected?.message}</p>
          )}
          <div className="friends-splits-list-container grid grid-cols-3 gap-3  overflow-auto h-90">
            {Friends.map((friend, index) => {
              return (
                <div key={index} className='friend-split  rounded-lg shadow-md  bg-highlight flex flex-col items-center justify-center gap-2 pt-1 relative cursor-pointer trans h-48'>
                  <div className="info center-flex flex-col">
                    <div className="friend-img-container size-16">
                      <img src={friend.Image} className='Img-c' alt="friend-img" />
                    </div>
                    <div className="friend-info center-flex flex-col">
                      <h2 className='text-sm font-semibold'>{friend.Name}</h2>
                      <p className='text-[12px] text-text-secondary'>{
                        friend.Bio}</p>
                      {(Splitopt === "By Percentage" && Share[Splitopt][friend.id] != "" && Share[Splitopt][friend.id] != null) && <p className='text-sm text-text-secondary'> {`${Share[Splitopt][friend.id]}% = ${Math.round(Number((Share[Splitopt][friend.id] / 100) * TotalAmount)).toLocaleString()}`} </p>}
                      {errors.Share?.[Splitopt]?.[friend.id] && (
                        <p className='text-red-500 text-xs mt-1 '>{errors.Share[Splitopt][friend.id].message}</p>
                      )}
                    </div>
                  </div>
                  <div className="payment-input flex center-flex gap-1 card-b bg-white border-none rounded-lg p-1 px-2 flex-row-reverse">
                    {
                      Splitopt === "Equally" ? <><FaRupeeSign className='text-green-500' />
                        <p className='w-18 text-left text-text-secondary' >
                          {Share[Splitopt][friend.id]}</p></> : <>
                        {Splitopt !== "Unequally" ? <FaPercentage className='text-primary' /> : <FaRupeeSign className='text-green-500' />}
                        <input
                          {...register(`Share.${Splitopt}.${friend.id}`,
                            {
                              required: "This field is required",
                            }
                          )} type="number" placeholder='0' value={Share[Splitopt][friend.id]} className='w-18 text-left focus:outline-none' onKeyDown={(e) => {
                            if (["e", "E", "+", "-", "."].includes(e.key)) {
                              e.preventDefault();
                            }
                          }} /></>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="select-split-container col-span-2  flex flex-col gap-2">
        <div className="Split-btn flex-1 center-flex">
          <Split_btn Splitopt={Splitopt} isSubmitting={isSubmitting} />
        </div>
        <div className="select-split">
          <Controller
            name="splitMethod"
            control={control}
            render={({ field }) => (
              <Select_split splits={Splits}
                memberscount={Friends.length}
                value={field.value} onChange={(e) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
