import React , { useState, useEffect, useMemo }  from 'react'
import { FaRupeeSign } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { GiBullseye } from "react-icons/gi";
import { IoMdFlag } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../../../store/FriendsSlice';
import {  useFormContext } from 'react-hook-form';
import { Steptwohelper } from '../../Steptwohelper';
export const Steptwo = ({ allfriends }) => {
    const { setValue, getValues, watch} = useFormContext();
    const livemembers = watch("MasterMembers");
      const AllFriends = useSelector(selectAllFriends).filter(friend =>
      livemembers.some(member => member.id === friend.id));
        const temporary = watch("temporary") || [];
        const Friends = useMemo(() => {
            return [...temporary, ...AllFriends];
        }, [temporary, AllFriends]);
  const Collected = livemembers.reduce((sum, member) => sum + Number(member.spent || 0), 0);
  const Total = Number(getValues("totalAmount"));
 const paymentdata = [
     { label: "Amount Collected", amount: Collected > Total ? Total :Collected, logo: <TiTick className='text-white size-4' /> },
     { label: "Amount Left", amount: (Total - Collected ) <0 ? 0 : Total - Collected  , logo: <GiBullseye className='text-primary size-6' /> },
     { label: "Total Amount", amount: Total, logo: < IoMdFlag className='text-neutral-500 size-6' /> },
   ];
  return (
   <Steptwohelper Friends={Friends} paymentdata={paymentdata}  /> 
  )
}
