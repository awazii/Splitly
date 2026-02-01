import React ,{useState} from 'react'
import { categories } from '../../../Expenses/Expense';
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { Transactionlist } from './Transactionlist';
import { Transactiondetailsfg } from './Transactiondetailsfg';
export const transactions = [
  {
    id: "trans001",
    title: "Cold Drink & Chips",
    netAmount: -10,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    date: "11-Feb-2025",
    time: "02:30 PM",
   category: {
         name: categories[0].name,
         gradient: categories[0].gradient,
         icon: categories[0].icon,
       },
    details: {
      total: 100,
      splitMethod: "Unequally",
      paidBy: [
        { userId: "001", name: "Awazii", amount: 20 },
        { userId: "005", name: "Saad", amount: 80 }
      ],
      split: [
        { userId: "001", name: "Awazii", amount: 30 },
        { userId: "005", name: "Saad", amount: 30 },
        { userId: "002", name: "Arshman", amount: 40 }
      ],
      settlements: [
          { fromId: "001", from: "Awazii", toId: "005", to: "Saad", amount: 10 },
          { fromId: "002", from: "Arshman", toId: "005", to: "Saad", amount: 40 }
      ]
    },
  },
  {
    id: "trans002",
    payment: "Sent",
    title: `Payment to Saad`,
    amount: 1450,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    date: "23-May-2025",
    time: "10:15 AM",
     icon: <GiPayMoney className="text-white size-7" />,
  },
  {
    id: "trans003",
    payment: "Received",
    title: `Payment from Arshman`,
    amount: 2270,
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
    date: "08-Jun-2025",
    time: "04:45 PM",
     icon: <GiReceiveMoney className="text-white size-7" />,
  },
  {
    id: "trans004",
    title: "Petrol for Bikes",
    netAmount: 1600,
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
    date: "14-Feb-2025",
    time: "09:00 AM",
   category: {
         name: categories[3].name,
         gradient: categories[3].gradient,
         icon: categories[3].icon,
       }  ,
    details: {
      total: 4000,
      splitMethod: "By percentage",
      paidBy: [{ userId: "001", name: "Awazii", amount: 4000 }],
      split: [
        { userId: "001", name: "Awazii", amount: 2400, percent: 60 },
        { userId: "005", name: "Saad Khalid", amount: 800, percent: 20 },
        { userId: "003", name: "Daud Khalid", amount: 800, percent: 20 }
      ],
      settlements: [
          { fromId: "005", from: "Saad Khalid", toId: "001", to: "Awazii", amount: 800 },
          { fromId: "003", from: "Daud Khalid", toId: "001", to: "Awazii", amount: 800 }
      ]
    },
  },
  {
    id: "trans005",
    title: "Concert Tickets",
    netAmount: -2250,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    date: "28-Jan-2025",
    time: "08:00 PM",
    category: {
         name: categories[5].name,
         gradient: categories[5].gradient,
         icon: categories[5].icon,
       } ,
    details: {
      total: 9000,
      splitMethod: "Equally",
      paidBy: [{ userId: "005", name: "Saad Khalid", amount: 9000 }],
      split: [
        { userId: "001", name: "Awazii", amount: 2250 },
        { userId: "005", name: "Saad Khalid", amount: 2250 },
        { userId: "002", name: "Arshman", amount: 2250 },
        { userId: "006", name: "Habib", amount: 2250 }
      ],
      settlements: [
          { fromId: "001", from: "Awazii", toId: "005", to: "Saad Khalid", amount: 2250 },
          { fromId: "002", from: "Arshman", toId: "005", to: "Saad Khalid", amount: 2250 },
          { fromId: "006", from: "Habib", toId: "005", to: "Saad Khalid", amount: 2250 }
      ]
    },
  },
   {
    id: "trans013",
    title: "Quick Snack",
    netAmount: 0,
    balancetextClass: "text-gray-500",
    balancebgClass: "bg-gray-200",
    date: "25-Mar-2025",
    time: "04:00 PM",
    category: {
         name: categories[0].name,
         gradient: categories[0].gradient,
         icon: categories[0].icon,
       },
    details: {
      total: 600,
      splitMethod: "Equally",
      paidBy: [
        { userId: "001", name: "Awazii", amount: 200 },
        { userId: "002", name: "Arshman", amount: 200 },
        { userId: "005", name: "Saad Khalid", amount: 200 }
      ],
      split: [
        { userId: "001", name: "Awazii", amount: 200 },
        { userId: "002", name: "Arshman", amount: 200 },
        { userId: "005", name: "Saad Khalid", amount: 200 }
      ],
      settlements: []
    },
  },
  {
    id: "trans006",
    title: "Dinner at Restaurant",
    netAmount: -600,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    date: "02-Mar-2025",
    time: "08:30 PM",
    category: {
         name: categories[0].name,
         gradient: categories[0].gradient,
          icon: categories[0].icon,
        } ,
    details: {
      total: 6400,
      splitMethod: "Unequally",
      paidBy: [
        { userId: "001", name: "Awazii", amount: 1400 },
        { userId: "005", name: "Saad", amount: 3000 },
        { userId: "002", name: "Arshman", amount: 2000 }
      ],
      split: [
        { userId: "001", name: "Awazii", amount: 2000 },
        { userId: "005", name: "Saad Khalid", amount: 2200 },
        { userId: "002", name: "Arshman", amount: 2200 }
      ],
      settlements: [
          { fromId: "001", from: "Awazii", toId: "005", to: "Saad Khalid", amount: 600 },
          { fromId: "002", from: "Arshman", toId: "005", to: "Saad Khalid", amount: 200 }
      ]
    },
  },
  {
    id: "transp007",
    title: "Random Essentials",
    netAmount: 1750,
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
    date: "05-Mar-2025",
    time: "01:20 PM",
    category: {
         name: categories[6].name,
         gradient: categories[6].gradient,
         icon: categories[6].icon,
       } ,
    details: {
      total: 3000,
      splitMethod: "By percentage",
      paidBy: [
        { userId: "001", name: "Awazii", amount: 2500 },
        { userId: "004", name: "Sheda", amount: 500 }
      ],
      split: [
        { userId: "001", name: "Awazii", amount: 750, percent: 25 },
        { userId: "004", name: "Sheda", amount: 1500, percent: 50 },
        { userId: "003", name: "Daud Khalid", amount: 750, percent: 25 }
      ],
      settlements: [
          { fromId: "004", from: "Sheda", toId: "001", to: "Awazii", amount: 1000 },
          { fromId: "003", from: "Daud Khalid", toId: "001", to: "Awazii", amount: 750 }
      ]
    },
  },
  {
    id: "trans008",
    title: "Hotel Room",
    netAmount: -250,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    date: "18-Feb-2025",
    time: "11:00 AM",
    category: {
         name: categories[4].name,
         gradient: categories[4].gradient,
         icon: categories[4].icon,
       } ,
    details: {
      total: 13000,
      splitMethod: "Equally",
      paidBy: [
        { userId: "001", name: "Awazii", amount: 3000 },
        { userId: "005", name: "Saad Khalid", amount: 10000 }
      ],
      split: [
        { userId: "001", name: "Awazii", amount: 3250 },
        { userId: "005", name: "Saad Khalid", amount: 3250 },
        { userId: "002", name: "Arshman", amount: 3250 },
        { userId: "003", name: "Daud Khalid", amount: 3250 }
      ],
      settlements: [
          { fromId: "001", from: "Awazii", toId: "005", to: "Saad Khalid", amount: 250 },
          { fromId: "002", from: "Arshman", toId: "005", to: "Saad Khalid", amount: 3250 },
          { fromId: "003", from: "Daud Khalid", toId: "005", to: "Saad Khalid", amount: 3250 }
      ]
    },
  },
  {
    id: "trans009",
    title: "Shared Contribution",
    netAmount: 4000,
    balancetextClass: "text-green-600",
    balancebgClass: "bg-green-600",
    date: "12-Mar-2025",
    time: "06:00 PM",
    category: {
         name: categories[3].name,
         gradient: categories[3].gradient,
         icon: categories[3].icon,
       } ,
    details: {
      total: 6000,
      splitMethod: "Equally",
      paidBy: [{ userId: "001", name: "Awazii", amount: 6000 }],
      split: [
        { userId: "001", name: "Awazii", amount: 2000 },
        { userId: "006", name: "Habib Khalid", amount: 2000 },
        { userId: "004", name: "Sheda", amount: 2000 }
      ],
      settlements: [
          { fromId: "006", from: "Habib Khalid", toId: "001", to: "Awazii", amount: 2000 },
          { fromId: "004", from: "Sheda", toId: "001", to: "Awazii", amount: 2000 }
      ]
    },
  },
  {
    id: "trans010",
    title: "Mocktails & Shakes",
    netAmount: -70,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    date: "21-Mar-2025",
    time: "09:45 PM",
    category: {
         name: categories[1].name,
         gradient: categories[1].gradient,
         icon: categories[1].icon,
       },
    details: {
      total: 1240,
      splitMethod: "Equally",
      paidBy: [
        { userId: "001", name: "Awazii", amount: 240 },
        { userId: "002", name: "Arshman", amount: 1000 }
      ],
      split: [
        { userId: "001", name: "Awazii", amount: 310 },
        { userId: "005", name: "Saad Khalid", amount: 310 },
        { userId: "002", name: "Arshman", amount: 310 },
        { userId: "003", name: "Daud Khalid", amount: 310 }
      ],
      settlements: [
          { fromId: "001", from: "Awazii", toId: "002", to: "Arshman", amount: 70 },
          { fromId: "005", from: "Saad Khalid", toId: "002", to: "Arshman", amount: 310 },
          { fromId: "003", from: "Daud Khalid", toId: "002", to: "Arshman", amount: 310 }
      ]
    },
  },
  {
    id: "trans011",
    title: "Tickets Booking",
    netAmount: 800,
    balancetextClass: "text-green-600",
    balancebgClass: "green-600",
    date: "22-Mar-2025",
    time: "03:30 PM",
    category: {
         name: categories[5].name,
         gradient: categories[5].gradient,
          icon: categories[5].icon,
        } ,
    details: {
      total: 1000,
      splitMethod: "Equally",
      paidBy: [{ userId: "001", name: "Awazii", amount: 1000 }],
      split: [
        { userId: "001", name: "Awazii", amount: 200 },
        { userId: "005", name: "Saad Khalid", amount: 200 },
        { userId: "002", name: "Arshman", amount: 200 },
        { userId: "003", name: "Daud Khaild", amount: 200 },
        { userId: "006", name: "Habib Khalid", amount: 200 }
      ],
      settlements: [
          { fromId: "005", from: "Saad Khalid", toId: "001", to: "Awazii", amount: 200 },
          { fromId: "002", from: "Arshman", toId: "001", to: "Awazii", amount: 200 },
          { fromId: "003", from: "Daud Khaild", toId: "001", to: "Awazii", amount: 200 },
          { fromId: "006", from: "Habib", toId: "001", to: "Awazii", amount: 200 }
      ]
    },
  },
  {
    id: "trans012",
    title: "Vape Juice & Pods",
    netAmount: -100,
    balancetextClass: "text-red-600",
    balancebgClass: "bg-red-600",
    date: "23-Mar-2025",
    time: "11:30 PM",
    category: {
         name: categories[2].name,
         gradient: categories[2].gradient,
         icon: categories[2].icon,
       },
    details: {
      total: 2900,
      splitMethod: "Unequally",
      paidBy: [
        { userId: "001", name: "Awazii", amount: 900 },
        { userId: "004", name: "Sheda", amount: 2000 }
      ],
      split: [
        { userId: "001", name: "Awazii", amount: 1000 },
        { userId: "004", name: "Sheda", amount: 1000 },
        { userId: "002", name: "Arshman", amount: 900 }
      ],
      settlements: [
          { fromId: "001", from: "Awazii", toId: "004", to: "Sheda", amount: 100 },
          { fromId: "002", from: "Arshman", toId: "004", to: "Sheda", amount: 900 }
      ]
    },
  }
];
export const Transactions = () => {
   const [isdetailopen, setisdetailopen] = useState({open: false, id: null});
  return (
    <div className='mx-3 mt-5 h-full'>
      {isdetailopen.open ? <Transactiondetailsfg setisdetailopen={setisdetailopen} isdetailopen={isdetailopen} /> : <Transactionlist setisdetailopen={setisdetailopen}/>}
    </div>
  )
}
