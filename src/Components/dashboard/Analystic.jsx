import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Sector } from "recharts";
import { ExpenseAnalystics } from "../../store/ExpenseSlice";
import { useSelector } from 'react-redux';
export const CategoryColors = {
    "Food & Snacks": {
        name: "Food & Snacks",
        fill: "#e53935"
    },
    "Drinks & Beverages": {
        name: "Drinks & Beverages",
        fill: "#38A7FF"
    },
    "Vapes & Smoking": {
        name: "Vapes & Smoking",
        fill: "#4caf50"
    },
    "Transport": {
        name: "Transport",
        fill: "#F7C72F"
    },
    "Hotel & Stay": {
        name: "Hotel & Stay",
        fill: "#f68340"
    },
    "Movie & Events": {
        name: "Movie & Events",
        fill: "#ff69b4"
    },
    "Others": {
        name: "Others",
        fill: "#A845DD"
    }
};


const renderActiveShape = (props) => {
    const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill,
    } = props;

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
    const CategoryData = useSelector(ExpenseAnalystics)
    return (
        <div className='center-flex h-full w-full gap-6'>
            <PieChart width={650} height={480} tabIndex={-1}>
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
                        fontWeight:600,
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
            <div className="des flex-1">
                <h2 className='text-2xl font-semibold mb-2'>Expenses Breakdown</h2>
                <p className='text-text-secondary text-sm mb-4 w-70'>How each category adds up</p>
                {CategoryData.map((category, index) => (
                    <div key={index} className="category-item flex items-center mb-3">
                        <div className="color-box w-5 h-5 rounded-md mr-4 shadow-md" style={{ backgroundColor: category.fill }}></div>
                        <div className="category-info">
                            <p className='font-semibold'>{category.name}</p>

                            <p className='text-sm text-text-secondary'>  {category.count} expenses - Rs.{Number(category.amount).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};