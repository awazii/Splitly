import React from 'react';
import { HiMiniUserGroup } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { GiExpense } from "react-icons/gi";

const InsightCard = ({ icon, title, description, value }) => (
  <div className={`flex flex-col justify-between p-4 rounded-xl shadow-md card-b w-full`}>
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </div>
    <p className="text-lg font-bold text-gray-900">{value}</p>
  </div>
);

export const Insights = () => {
  const insightsData = [
    {
      id: 1,
      title: "Top Spending Group",
      description: "Trip to Murree",
      value: "Rs 800",
      icon: <HiMiniUserGroup className="text-[#f68340] text-xl" />,
    },
    {
      id: 2,
      title: "Highest Contributor",
      description: "Awazii",
      value: "Rs 500",
      icon: <IoPerson className="text-[#2196f3] text-xl" />,
    },
    {
      id: 3,
      title: "Largest Debt",
      description: "Arshman",
      value: "Rs 300",
      icon: <IoPerson className="text-[#e53935] text-xl" />,
      bg: "bg-purple-50"
    },
    {
      id: 4,
      title: "Total Expenses",
      description: "12 expenses recorded",
      value: "Rs 3,600",
      icon: <GiExpense className="text-[#4caf50] text-xl" />
    }
  ];

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Insights</h2>
        <button className="text-primary text-sm font-semibold hover:underline cursor-pointer">View Analystics</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insightsData.map(item => (
          <InsightCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};