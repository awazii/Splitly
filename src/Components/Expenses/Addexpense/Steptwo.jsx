import React, { useState, useEffect, useMemo } from 'react'
import { FaRupeeSign } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { GiBullseye } from "react-icons/gi";
import { IoMdFlag } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import {  useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../../../store/FriendsSlice';
import { Steptwohelper } from '../../Steptwohelper';
export const Steptwo = () => {
  const { setValue, getValues, register, watch, trigger, formState: { errors } } = useFormContext();
  const livemembers = watch("MasterMembers");
  const AllFriends = useSelector(selectAllFriends);
  const Collected = livemembers.reduce((sum, member) => sum + Number(member.spent || 0), 0);
  const Friends = useMemo(() => {
    return AllFriends.filter(friend =>
      livemembers.some(member => member.id === friend.id)
    );
  }, [AllFriends, livemembers]);
  const Total = Number(getValues("totalAmount"));
  const paymentdata = [
    { label: "Amount Collected", amount: Collected, logo: <TiTick className='text-white size-4' /> },
    { label: "Amount Left", amount: Total - Collected, logo: <GiBullseye className='text-primary size-6' /> },
    { label: "Total Amount", amount: Total, logo: < IoMdFlag className='text-neutral-500 size-6' /> },
  ];
  return (
    <Steptwohelper Friends={Friends} paymentdata={paymentdata}  /> 
  )
}
