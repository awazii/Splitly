import React, { useState } from 'react';
import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, Sector } from "recharts";
import { ExpenseAnalystics } from "../../store/ExpenseSlice";
import { useSelector } from 'react-redux';
import { RiPieChart2Line } from "react-icons/ri";
import { UniversalEmptyState } from '../../Components/UniversalEmptyState';
import { pageContainerVariants, cardVariants } from "../../utils/animation";

export const CategoryColors = {
  "Food & Snacks": { name: "Food & Snacks", fill: "#e53935" },
  "Drinks & Beverages": { name: "Drinks & Beverages", fill: "#38A7FF" },
  "Vapes & Smoking": { name: "Vapes & Smoking", fill: "#4caf50" },
  "Transport": { name: "Transport", fill: "#F7C72F" },
  "Hotel & Stay": { name: "Hotel & Stay", fill: "#f68340" },
  "Movie & Events": { name: "Movie & Events", fill: "#ff69b4" },
  "Others": { name: "Others", fill: "#A845DD" }
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={8}
        filter="url(#glow)"
      />
    </g>
  );
};

export const Analystic = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const CategoryData = useSelector(ExpenseAnalystics);

  return (
    <div className='center-flex h-full w-full gap-6'>
      {CategoryData.length > 0 ? (
        <>
          {/* Chart stays static */}
          <PieChart width={650} height={480}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <Pie
              data={CategoryData}
              dataKey="amount"
              nameKey="name"
              innerRadius={130}
              outerRadius={220}
              cornerRadius={8}
              paddingAngle={2}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "10px 14px",
                backgroundColor: "#fff",
              }}
              formatter={(value, name) => {
                const formattedValue = Number(value).toLocaleString();
                return [`Amount: Rs.${formattedValue}`, name];
              }}
            />
          </PieChart>
          <motion.div
            variants={pageContainerVariants}
            initial="hidden"
            animate="visible"
            className="des flex-1"
          >
            <h2 className='text-2xl font-semibold mb-2'>Expenses Breakdown</h2>
            <p className='text-text-secondary text-sm mb-4 w-70'>
              How each category adds up
            </p>
            {CategoryData.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="category-item flex items-center mb-3"
              >
                <div
                  className="color-box w-5 h-5 rounded-md mr-4 shadow-md"
                  style={{ backgroundColor: category.fill }}
                ></div>
                <div className="category-info">
                  <p className='font-semibold'>{category.name}</p>
                  <p className='text-sm text-text-secondary'>
                    {category.count} expenses - Rs.{Number(category.amount).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <UniversalEmptyState
            title="No expenses to visualize"
            description="Not enough data for a breakdown. Start adding expenses to see your spending across categories."
            textsize=""
          >
            <div className="p-10 shadow-md border-l rounded-full">
              <RiPieChart2Line className="size-12 text-primary" />
            </div>
          </UniversalEmptyState>
        </motion.div>
      )}
    </div>
  );
};
