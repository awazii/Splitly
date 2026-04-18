import React ,{useState} from 'react'
import { GrTransaction } from "react-icons/gr";
import { categories } from '../../Expenses/Expenses.jsx';
import mountain from "../../../assets/groups/mountain.jpg"
import beach from "../../../assets/groups/Sea.jpg"
import concert from "../../../assets/groups/concert.jpg"
import Restaurant from "../../../assets/groups/Restaurant.jpg"
import Other from "../../../assets/groups/default.jpg"
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { Transactions } from './Transactionshistory.jsx';
import { Transationdetail } from './transationdetail';
import { Settlements } from './Settlements';
import {Paymentsuccesful} from './payment.jsx';
// export const transactions = [
//   {
//     id: "trans001",
//     title: "Cold Drink & Chips",
//     amount: -10,
//     balancetextClass: "text-red-600",
//     balancebgClass: "bg-red-600",
//     date: "11-Feb-2025",
//     time: "02:30 PM",
//     category: {
//       name: categories[0].name,
//       gradient: categories[0].gradient,
//       icon: categories[0].icon,
//     },
//     group: {
//       name: "Trip to Murree",
//       img: mountain,
//     },
//     details: {
//       total: 100,
//       splitMethod: "Unequally",
//       paidBy: [
//         { name: "You", amount: 20 },
//         { name: "Other", amount: 80 },
//       ],
//       split: [
//         { name: "You", amount: 30 },
//         { name: "Other", amount: 70 },
//       ],
//     },
//   },
//   {
//     id: "trans002",
//     payment: "Sent",
//     title: `Payment to`,
//     amount: 1450,
//     balancetextClass: "text-red-600",
//     balancebgClass: "bg-red-600",
//     date: "23-May-2025",
//     time: "10:15 AM",
//     icon: <GiPayMoney className="size-7 text-white" />,
//   },
//   {
//     id: "trans003",
//     payment: "Received",
//     title: `Payment from `,
//     amount: 2270,
//     balancetextClass: "text-green-600",
//     balancebgClass: "bg-green-600",
//     date: "08-Jun-2025",
//     time: "04:45 PM",
//     icon: <GiReceiveMoney className="size-6 text-white" />,
//   },
//   {
//     id: "trans004",
//     title: "Petrol for Bikes",
//     amount: 1600,
//     balancetextClass: "text-green-600",
//     balancebgClass: "bg-green-600",
//     date: "14-Feb-2025",
//     time: "09:00 AM",
//     category: {
//       name: categories[3].name,
//       gradient: categories[3].gradient,
//       icon: categories[3].icon,
//     },
//     group: {
//       name: "Sea View Hangout",
//       img: beach,
//     },
//     details: {
//       total: 4000,
//       splitMethod: "By percentage",
//       paidBy: [{ name: "You", amount: 4000 }],
//       split: [
//         { name: "You", amount: 2400, percent: 60 },
//         { name: "Other", amount: 1600, percent: 40 },
//       ],
//     },
//   },
//   {
//     id: "trans005",
//     title: "Concert Tickets",
//     amount: -4500,
//     balancetextClass: "text-red-600",
//     balancebgClass: "bg-red-600",
//     date: "28-Jan-2025",
//     time: "08:00 PM",
//     category: {
//       name: categories[5].name,
//       gradient: categories[5].gradient,
//       icon: categories[5].icon,
//     },
//     group: {
//       name: "Atif Aslam Concert",
//       img: concert,
//     },
//     details: {
//       total: 9000,
//       splitMethod: "Equally", 
//       paidBy: [{ name: "Other", amount: 9000 }],
//       split: [
//         { name: "You", amount: 4500 },
//         { name: "Other", amount: 4500 },
//       ],
//     },
//   },
//   {
//     id: "trans006",
//     title: "Dinner at Restaurant",
//     amount: -2600,
//     balancetextClass: "text-red-600",
//     balancebgClass: "bg-red-600",
//     date: "02-Mar-2025",
//     time: "08:30 PM",
//     category: {
//       name: categories[0].name,
//       gradient: categories[0].gradient,
//       icon: categories[0].icon,
//     },
//     group: {
//       name: "Birthday Party",
//       img: Restaurant,
//     },
//     details: {
//       total: 6400,
//       splitMethod: "Unequally",
//       paidBy: [
//         { name: "You", amount: 1400 },
//         { name: "Other", amount: 5000 },
//       ],
//       split: [
//         { name: "You", amount: 4000 },
//         { name: "Other", amount: 2400 },
//       ],
//     },
//   },
//   {
//     id: "transp007",
//     title: "Random Essentials",
//     amount: 1750,
//     balancetextClass: "text-green-600",
//     balancebgClass: "bg-green-600",
//     date: "05-Mar-2025",
//     time: "01:20 PM",
//     category: {
//       name: categories[6].name,
//       gradient: categories[6].gradient,
//       icon: categories[6].icon,
//     },
//     group: {
//       name: "Errand Run",
//       img: Other,
//     },
//     details: {
//       total: 3000,
//       splitMethod: "By percentage",
//       paidBy: [
//         { name: "You", amount: 2500 },
//         { name: "Other", amount: 500 },
//       ],
//       split: [
//         { name: "You", amount: 750, percent: 25 },
//         { name: "Other", amount: 2250, percent: 75 },
//       ],
//     },
//   },
//   {
//     id: "trans008",
//     title: "Hotel Room",
//     amount: -3500,
//     balancetextClass: "text-red-600",
//     balancebgClass: "bg-red-600",
//     date: "18-Feb-2025",
//     time: "11:00 AM",
//     category: {
//       name: categories[4].name,
//       gradient: categories[4].gradient,
//       icon: categories[4].icon,
//     },
//     group: {
//       name: "Northern Trip",
//       img: mountain,
//     },
//     details: {
//       total: 13000,
//       splitMethod: "Equally",
//       paidBy: [
//         { name: "You", amount: 3000 },
//         { name: "Other", amount: 10000 },
//       ],
//       split: [
//         { name: "You", amount: 6500 },
//         { name: "Other", amount: 6500 },
//       ],
//     },
//   },
//   {
//     id: "trans009",
//     title: "Shared Contribution",
//     amount: 4000,
//     balancetextClass: "text-green-600",
//     balancebgClass: "bg-green-600",
//     date: "12-Mar-2025",
//     time: "06:00 PM",
//     category: {
//       name: categories[3].name,
//       gradient: categories[3].gradient,
//       icon: categories[3].icon,
//     },
//     group: {
//       name: "Friends Meetup",
//       img: Restaurant,
//     },
//     details: {
//       total: 6000,
//       splitMethod: "Enequally", 
//       paidBy: [{ name: "You", amount: 6000 }],
//       split: [
//         { name: "You", amount: 2000 },
//         { name: "Other", amount: 2000 },
//       ],
//     },
//   },
//   {
//     id: "trans010",
//     title: "Mocktails & Shakes",
//     amount: -380,
//     balancetextClass: "text-red-600",
//     balancebgClass: "bg-red-600",
//     date: "21-Mar-2025",
//     time: "09:45 PM",
//     category: {
//       name: categories[1].name,
//       gradient: categories[1].gradient,
//       icon: categories[1].icon,
//     },
//     group: {
//       name: "Cafe Chill Session",
//       img: Restaurant,
//     },
//     details: {
//       total: 1240,
//       splitMethod: "Equally",
//       paidBy: [
//         { name: "You", amount: 240 },
//         { name: "Other", amount: 1000 },
//       ],
//       split: [
//         { name: "You", amount: 620 },
//         { name: "Other", amount: 620 },
//       ],
//     },
//   },
//   {
//     id: "trans011",
//     title: "Tickets Booking",
//     amount: 500,
//     balancetextClass: "text-green-600",
//     balancebgClass: "bg-green-600",
//     date: "22-Mar-2025",
//     time: "03:30 PM",
//     category: {
//       name: categories[5].name,
//       gradient: categories[5].gradient,
//       icon: categories[5].icon,
//     },
//     group: {
//       name: "Movie Night",
//       img: Other,
//     },
//     details: {
//       total: 1000,
//       splitMethod: "Equally",
//       paidBy: [{ name: "You", amount: 1000 }],
//       split: [
//         { name: "You", amount: 500 },
//         { name: "Other", amount: 500 },
//       ],
//     },
//   },
//   {
//     id: "trans012",
//     title: "Vape Juice & Pods",
//     amount: -100,
//     balancetextClass: "text-red-600",
//     balancebgClass: "bg-red-600",
//     date: "23-Mar-2025",
//     time: "11:30 PM",
//     category: {
//       name: categories[2].name,
//       gradient: categories[2].gradient,
//       icon: categories[2].icon,
//     },
//     group: {
//       name: "Night Drive",
//       img: Other,
//     },
//     details: {
//       total: 2900,
//       splitMethod: "Unequally",
//       paidBy: [
//         { name: "You", amount: 900 },
//         { name: "Other", amount: 2000 },
//       ],
//       split: [
//         { name: "You", amount: 1000 },
//         { name: "Other", amount: 1900 },
//       ],
//     },
//   },
// ];
export const Balancewith = ({ Currentbalancewith, currentFriend }) => {
  const [isdetailopen, setisdetailopen] = useState({open: false, id: null});
  const [issettlementopen, setissettlementopen] = useState(false);
  const [ispaymentsuccessful, setispaymentsuccessful] = useState(false);
  return (
    <div className='w-130 h-fit'>
      <div className="profiles w-full center-flex gap-5 mt-2 mb-4">
        <div className="profile size-22 rounded-full center-flex border-primary border-2 p-1">
          <img src={currentFriend.profilePic} alt="current-friend-pic" className='Img-c border-none' />
        </div>
        <GrTransaction className='size-8 text-text-secondary' />
        <div className="profile size-22 rounded-full center-flex border-primary border-2 p-1">
          <img src={Currentbalancewith.profilePic} alt="current-friend-pic" className='Img-c border-none' />
        </div>
      </div>     
      {(!isdetailopen.open && !issettlementopen && !ispaymentsuccessful) && <Transactions Currentbalancewith={Currentbalancewith} setisdetailopen={setisdetailopen} setissettlementopen={setissettlementopen}/>}
       {isdetailopen.open && <Transationdetail setisdetailopen={setisdetailopen} isdetailopen={isdetailopen} Currentbalancewith={Currentbalancewith} CurrentFriend={currentFriend} />}
      {issettlementopen && <Settlements Currentbalancewith={Currentbalancewith} setissettlementopen={setissettlementopen} setispaymentsuccessful={setispaymentsuccessful}/>}
      {(ispaymentsuccessful)&& <Paymentsuccesful Currentbalancewith={Currentbalancewith} setispaymentsuccessful={setispaymentsuccessful}/>}
    </div>
  )
}
