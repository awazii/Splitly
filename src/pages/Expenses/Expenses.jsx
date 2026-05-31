import React, { useState } from 'react'
import Input from '../../Components/Common/Input'
import Button from '../../Components/Common/searchbtn'
import { GiExpense } from "react-icons/gi";
import { FaMoneyCheck } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import mountain from "../../assets/groups/mountain.jpg"
import beach from "../../assets/groups/Sea.jpg"
import concert from "../../assets/groups/concert.jpg"
import Restaurant from "../../assets/groups/Restaurant.jpg"
import Other from "../../assets/groups/default.jpg"
import { LuUtensils } from "react-icons/lu";
import { RiDrinks2Line } from "react-icons/ri";
import { MdSmokeFree } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { MdHotel } from "react-icons/md";
import { IoSparklesSharp } from "react-icons/io5";
import { IoTicketSharp } from "react-icons/io5";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import Linechart from './Linechartgraph';
import { Basemodel } from '../../Components/basemodel';
import { Expensedetails } from '../../Components/Expenses/Expensedetails/Expensedetails';
import { useSelector } from 'react-redux';
import { selectAllExpenses, TotalExpenses } from '../../store/ExpenseSlice';
import { selectFriendById } from "../../store/FriendsSlice";
import { selectGroupById } from '../../store/GroupSlice';
import { ExpenseCard } from '../../Components/Expenses/ExpenseCard';
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import { RiFileList3Line } from "react-icons/ri";
import dayjs from 'dayjs';
import { motion } from "framer-motion";
import { cardContainerVariants, cardVariants, itemVariants, headerVariants, pageContainerVariants } from "../../utils/animation";
import { FilterHeader } from '../../Components/filter';
import {
  HiFolder,
  HiTag,
  HiCurrencyDollar,
  HiBarsArrowDown,
  HiBarsArrowUp,
} from "react-icons/hi2";
export const expenseSorts = [
  {
    label: "New to Old",
    icon: (
      <HiBarsArrowDown
        size={18}
        className="text-[#3b82f6]"
      />
    ),
  },

  {
    label: "Old to New",
    icon: (
      <HiBarsArrowUp
        size={18}
        className="text-[#a855f7]"
      />
    ),
  },

  {
    label: "Most Expenses",
    icon: (
      <HiCurrencyDollar
        size={18}
        className="text-[#f59e0b]"
      />
    ),
  },
];
export const expenseFilters = [
  {
    label: "By Group",
    icon: (
      <HiFolder
        size={18}
        className="text-[#8b5cf6]"
      />
    ),
  },

  {
    label: "Category",
    icon: (
      <HiTag
        size={18}
        className="text-[#ec4899]"
      />
    ),
  },
];

export const categories = {
  "Food & Snacks": {
    name: "Food & Snacks",
    gradient: "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 50%, #FF99AC 100%)",
    icon: LuUtensils
  },
  "Drinks & Beverages": {
    name: "Drinks & Beverages",
    gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
    icon: RiDrinks2Line
  },
  "Vapes & Smoking": {
    name: "Vapes & Smoking",
    gradient: "linear-gradient(135deg, #00DBDE 0%, #FC00FF 100%)",
    icon: MdSmokeFree
  },
  "Transport": {
    name: "Transport",
    gradient: "linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)",
    icon: FaCar
  },
  "Hotel & Stay": {
    name: "Hotel & Stay",
    gradient: "linear-gradient(135deg, #F7971E 0%, #FFD200 100%)",
    icon: MdHotel
  },
  "Movie & Events": {
    name: "Movie & Events",
    gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
    icon: IoTicketSharp
  },
  "Others": {
    name: "Others",
    gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 50%, #DD2476 100%)",
    icon: IoSparklesSharp
  }
}
const getSevenDayChartData = (expenses) => {
  return Array.from({ length: 7 }, (_, i) => {
    const dateStr = dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD');
    const dayExpenses = expenses.filter(e => e.createdDate === dateStr);

    return {
      date: dayjs(dateStr).format('MMM DD'),
      amount: dayExpenses.reduce((sum, e) => sum + Number(e.totalAmount), 0),
      count: dayExpenses.length || 0
    };
  });
};
const getDailyComparison = (expenses, type) => {
  const todayStr = dayjs().format('YYYY-MM-DD');
  const yesterdayStr = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const todayTotalraw = expenses
    .filter(e => e.createdDate === todayStr)
  const todayTotal = type === "count" ? todayTotalraw.length : todayTotalraw.reduce((sum, e) => sum + Number(e.totalAmount), 0);

  const yesterdayTotalraw = expenses
    .filter(e => e.createdDate === yesterdayStr)
  const yesterdayTotal = type === "count" ? yesterdayTotalraw.length :
    yesterdayTotalraw.reduce((sum, e) => sum + Number(e.totalAmount), 0);

  const diff = todayTotal - yesterdayTotal;
  let percentage = 0;
  if (yesterdayTotal !== 0) {
    percentage = (diff / yesterdayTotal) * 100;
  } else {
    percentage = todayTotal > 0 ? 100 : 0;
  }

  return {
    percentage: Math.round(Math.abs(percentage)),
    isIncreasing: diff >= 0
  };
};
export const Expense = () => {
  const Raw = useSelector(selectAllExpenses);
  const Expenses = Raw.filter(r => r.Category !== "Settlement")
  const Totalexpensesamount = useSelector(TotalExpenses)
  const SevenDayExpenseData = getSevenDayChartData(Expenses)
  const SevenDayExpenseAmount = SevenDayExpenseData.map(e => (
    {
      date: e.date,
      amount: e.amount
    }
  ))
  const SevenDayExpensecount = SevenDayExpenseData.map(e => (
    {
      date: e.date,
      count: e.count
    }
  )
  )
  const dailyamountComparison = getDailyComparison(Expenses, "amount")
  const dailycountComparison = getDailyComparison(Expenses, "count")
  const [popup, setpopup] = useState(false)
  const [CurrentExpenseid, setCurrentExpenseid] = useState("")
  const [isFilteropen, setisFilteropen] = useState(false)
  const Openmodel = () => {
    setpopup(true)
  }
  const Closemodel = () => [
    setpopup(false)
  ]
  const expenseoverview = [
    {
      label: "Total Expenses",
      dailyreport: {
        percentage: dailyamountComparison.percentage,
        isIncrease: dailyamountComparison.isIncreasing,
      },
      amount: Totalexpensesamount.toLocaleString(),
      icon: <FaMoneyCheck className='text-white size-10' />,
      gradient: 'linear-gradient(135deg, #00C853 0%, #64DD17 50%, #AEEA00 100%)',
    },
    {
      label: "Expense Count",
      amount: Expenses.length,
      dailyreport: {
        percentage: dailycountComparison.percentage,
        isIncrease: dailycountComparison.isIncreasing,
      },
      icon: <GiExpense className='text-white size-10' />,
      gradient: 'linear-gradient(135deg, #3F51B5 0%, #2196F3 50%, #00BCD4 100%)',
    }

  ];
  return (
    <div className="Expense-main h-full overflow-auto scrollbar-hide relative">
      <h1 className="text-3xl font-semibold m-6 mb-1">Expenses</h1>
      <p className="text-text-secondary text-md mx-6 mb-2">
        This section displays all expenses from different groups with live data updates.
      </p>
      <div className="expense-overview center-flex w-280 mx-auto gap-5">
        {expenseoverview.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="expense-card bg-white shadow-md  rounded-lg p-4 center-flex flex-col w-75"
          >
            <div
              className="icon mb-2 center-flex size-28 rounded-full"
              style={{ background: item.gradient }}
            >
              {item.icon}
            </div>
            <div className="info center-flex flex-col mt-1">
              <div className="label font-semibold text-xl">{item.label}</div>
              <div className="amount text-2xl mt-1">
                {`${index === 0 ? "Rs." : ""}${item.amount.toLocaleString()}`}
              </div>
              <p
                className={`weekly-report ${item.dailyreport.isIncrease ? "text-green-500" : "text-red-500"
                  } center-flex gap-1`}
              >
                {item.dailyreport.isIncrease ? (
                  <FaArrowUp className="size-4" />
                ) : (
                  <FaArrowDown className="size-4" />
                )}
                {`${item.dailyreport.percentage}% from Yesterday`}
              </p>
              <Linechart
                data={index === 0 ? SevenDayExpenseAmount : SevenDayExpensecount}
                type={item.label === "Total Expenses" ? "expenses" : "count"}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial="hidden"
        animate="visible" variants={itemVariants} className="flex items-center justify-between mt-3 mx-9">
        <div className="search flex gap-4 py-2 items-center mt-4">
          <Input variant={"Expense"} />
          <Button />
        </div>
        <button className="filter bg-white shadow-md p-2 rounded-lg cursor-pointer hover:text-primary hover:scale-105 trans center-flex" onClick={() => setisFilteropen(true)}>
          <CiFilter className="size-5" />
        </button>
      </motion.div>
      <motion.div initial="hidden"
        animate="visible" variants={itemVariants} className="Expense-container mx-auto container mt-4">
        <h2 className="text-xl font-semibold mb-2 center-flex gap-1 w-fit">
          Expenses <span><GiExpense /></span>
        </h2>

        {Expenses.length > 0 ? (
          <motion.div
            variants={cardContainerVariants}
            className="grid grid-cols-3 gap-3 pb-5"
          >
            {Expenses.map((expense, index) => (
              <motion.div key={index} variants={cardVariants}>
                <ExpenseCard
                  expense={expense}
                  Openmodel={() => {
                    setCurrentExpenseid(expense.id);
                    Openmodel();
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <UniversalEmptyState
            title="No expenses found"
            description="Your global expense history is empty. Add a new expense to get started."
            textsize=""
          >
            <div className="p-10 shadow-md bg-gray-50 rounded-full">
              <RiFileList3Line className="size-10 text-primary" />
            </div>
          </UniversalEmptyState>
        )}
      </motion.div>
      <Basemodel isOpen={isFilteropen} Closemodel={() => setisFilteropen(false)} title="Expense Filters">
        <FilterHeader Sorts={expenseSorts} Filters={expenseFilters} ActiveSort={"New to Old"} type="expense" />
      </Basemodel>
      <Basemodel isOpen={popup} Closemodel={Closemodel} title="Expense Details">
        <Expensedetails expenseid={CurrentExpenseid} />
      </Basemodel>
    </div>)
}
