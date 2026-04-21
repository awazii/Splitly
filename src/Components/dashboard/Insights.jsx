import React from 'react';
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { GiExpense } from "react-icons/gi";
import {TotalExpenses ,selectAllExpenses}  from "../../store/ExpenseSlice"
import { useSelector } from 'react-redux';
import { TopGroup } from '../../store/GroupSlice';
import { selectAllFriends } from '../../store/FriendsSlice';
import { useNavigate } from 'react-router-dom';
const InsightCard = ({ icon, title, description, value }) => (
  <div className={`flex flex-col justify-between p-4 rounded-xl shadow-md  w-full bg-white`}>
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </div>
    <p className="text-md font-bold text-gray-900">{value}</p>
  </div>
);
export const Insights = () => {
  const Navigate = useNavigate()
const Expenses= useSelector(selectAllExpenses)
const Totalamount = useSelector(TotalExpenses)
const topGroup = useSelector(TopGroup)
const AllFriends = useSelector(selectAllFriends)
const HighesContributor= [...AllFriends].sort((a,b)=>b.spendings - a.spendings)[0]
const HighestDebtor = [...AllFriends].sort((a,b)=> a.netBalance.total - b.netBalance.total)[0]
  const insightsData = [
    {
      id: 1,
      title: "Top Spending Group",
      description: `${topGroup.Name}`,
      value: `Rs. ${ topGroup.totalAmount.toLocaleString()}`,
      icon: <HiMiniUserGroup className="text-[#f68340] text-xl" />,
    },
    {
      id: 2,
      title: "Highest Contributor",
      description: `${HighesContributor.Name}`,
      value: `Rs. ${HighesContributor.spendings.toLocaleString()}`,
      icon: <IoPerson className="text-[#2196f3] text-xl" />,
    },
    {
      id: 3,
      title: "Highest Debtor",
      description: `${HighestDebtor.Name}`,
      value: `Rs. ${Math.abs(HighestDebtor.netBalance.total)}`,
      icon: <IoPerson className="text-[#e53935] text-xl" />,
    },
    {
      id: 4,
      title: "Total Expenses",
      description: `${Expenses.length} expenses recorded`,
      value: `Rs. ${Totalamount.toLocaleString()}`,
      icon: <GiExpense className="text-[#4caf50] text-xl" />
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Insights</h2>
        <button className="text-primary text-sm font-semibold hover:underline cursor-pointer" onClick={() => { Navigate("/Analytics") }}>View Analystics</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insightsData.map(item => (
          <InsightCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};