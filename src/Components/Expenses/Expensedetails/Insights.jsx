import React from 'react';
import { motion } from "framer-motion";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCoins } from "react-icons/fa";
import { IoPerson } from 'react-icons/io5';
import { Memberdetails } from '../../../utils/Memberdetails';
import { UniversalEmptyState } from '../../UniversalEmptyState';
import { selectAllSplits } from '../../../store/SpliterSlice';
import { useSelector } from 'react-redux';
import { pageContainerVariants, cardContentVariants } from "../../../utils/animation";
import { FaBan } from "react-icons/fa"
export const Insights = ({ data }) => {
    const sortedmembers = data && [...data].sort((a, b) => {
        const balanceA = a.spent - a.share;
        const balanceB = b.spent - b.share;
        return balanceB - balanceA;
    });
    const HighesContributor = sortedmembers && sortedmembers[0];
    const rawDebtor = sortedmembers && sortedmembers[data.length - 1];
    const isActuallyDebtor = rawDebtor && (rawDebtor.spent - rawDebtor.share < 0);
    const HighestDebtor = isActuallyDebtor ? rawDebtor : null;

    function GetTemp(id) {
        const Splits = useSelector(selectAllSplits)[0];
        const temp = Splits?.temporary.find(t => t.id === id);
        return temp;
    }

    const insights = [
        {
            label: "Highest Debtor",
            svg: <GiReceiveMoney className='text-white size-7' />,
            color: "#dc2626",
            about: Memberdetails(HighestDebtor?.id) || GetTemp(HighestDebtor?.id),
            totalamount: Math.abs(HighestDebtor?.spent - HighestDebtor?.share),
            isBanned: HighestDebtor ? Memberdetails(HighestDebtor.id)?.isBanned : false
        },
        {
            label: "Highest Contributor",
            svg: <FaCoins className='text-white size-7' />,
            totalamount: HighesContributor?.spent,
            color: "#16A34A",
            about: Memberdetails(HighesContributor?.id) || GetTemp(HighesContributor?.id),
            isBanned: HighesContributor ? Memberdetails(HighesContributor.id)?.isBanned : false

        }
    ];

    return (
        <motion.div
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            className='bg-white shadow-md size-full rounded-lg flex p-4'
        >
            {insights.map((insight, index) => (
                <motion.div
                    key={index}
                    variants={cardContentVariants}
                    className={`flex-1 center-flex gap-5 ${index === 1 && "border-l-1 border-b-light pl-3"}`}
                >
                    <div className="logo size-18 rounded-full center-flex" style={{ background: insight.color }}>
                        {insight.svg}
                    </div>
                    <div className="info w-45 h-full center-flex flex-col">
                        <div className="label font-semibold text-lg">{insight.label}</div>
                        {insight.about && (
                            <div className="about center-flex gap-2 justify-between">
                                <div className={`logo  size-7 relative  ${insight.about.type !== "temporary" ? "rounded-full" : ""} center-flex ${insight.isBanned ? "border-red-500" : "border-primary"} border-2`}>
                                    {insight.about.type !== "temporary" ? (
                                        <>
                                            <img src={insight.about.Image} className='rounded-full Img-c' alt="profile-pic" />
                                            <div className={`absolute top-8/13 right-4 p-1 opacity-90 bg-red-500 rounded-full text-white shadow-lg ${insight.isBanned ? "block" : "hidden"}`}>
                                                <FaBan className="size-1" />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="friend-img-container size-7 bg-neutral-300 rounded-full center-flex">
                                            <IoPerson className='size-3 text-neutral-500' />
                                        </div>
                                    )}
                                </div>
                                <p className="name text-sm">{insight.about.Name}</p>
                            </div>
                        )}
                        {insight.totalamount ? (
                            <div className="amount font-semibold text-xl mt-1" style={{ color: insight.color }}>
                                Rs.{Number(insight.totalamount).toLocaleString()}
                            </div>
                        ) : (
                            <p className="text-text-secondary text-sm mt-1">No data yet</p>
                        )}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};
