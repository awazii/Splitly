import { motion } from "framer-motion";
import {
  headerVariants,
  sectionVariants,
} from "../../utils/animation";
import { Overview } from './Overview';
import { Recent } from './Recent';
import { Insights } from './Insights';
import { Analystic } from './Analystic';
import Addgroup from "./Newgroupbtn"
import { selectAllExpenses } from '../../store/ExpenseSlice';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { selectFriendById } from "../../store/FriendsSlice";

export const Dashboard = () => {
  const allexpense = useSelector(selectAllExpenses);
  const admin = useSelector(state => selectFriendById(state, "admin_01"));

  return (
    <div className="dashboard-container w-full h-full overflow-auto p-6 pb-0 scrollbar-hide">
      <motion.h1
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-semibold"
      >
        Dashboard
      </motion.h1>
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="header col-span-6 h-15 flex items-center rounded-2xl justify-between p-2"
      >
        <h2 className="text-2xl font-medium p-4">
          Welcome aboard, {admin.Name}!
        </h2>
        <Addgroup />
      </motion.div>

      <div className="dashboard grid grid-cols-6 gap-x-2 gap-y-3 mt-4 grid-flow-row-dense">
        <div
          className="overview col-span-4 row-span-2 rounded-xl h-50"
        >
          <Overview />
        </div>

        <div
          className="recent-activities bg-white shadow-md col-span-2 row-span-4 rounded-xl h-100"
        >
          <Recent
            h={`h-[310px]`}
            d="Start using Splitly to see your activity. All group, friend, and expense updates are logged here."
          />
        </div>

        <div
          className="analytics bg-white shadow-md col-span-4 row-span-5 rounded-xl"
        >
          <Analystic />
        </div>

        <div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="insights bg-white shadow-md col-span-2 row-span-3 rounded-xl"
        >
          <Insights />
        </div>
      </div>

      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="footer col-span-6 h-20 center-flex"
      >
        <p className="text-center text-xl text-secondary">
          © {dayjs().year()} Splitly. Design & Developed by Awazii. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};
