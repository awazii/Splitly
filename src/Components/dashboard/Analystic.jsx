import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Sector } from "recharts";
const CategoryData = [
    { name: "Food & Snacks", amount: 3200, count: 12, fill: "#e53935" },
    { name: "Drinks & Beverages", amount: 1100, count: 4, fill: "#38A7FF" },
    { name: "Vapes & Smoking", amount: 800, count: 3, fill: "#4caf50" },
    { name: "Transport", amount: 2500, count: 8, fill: "#F7C72F" },
    { name: "Hotel & Stay", amount: 4500, count: 6, fill: "#f68340" },
    { name: "Movie & Events", amount: 1800, count: 5, fill: "#ff69b4" },
    { name: "Others", amount: 900, count: 2, fill: "#A845DD" },
];



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

    return (
        <div className='center-flex h-full w-full gap-6'>
            <PieChart width={650} height={450} tabIndex={-1}>
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
                        fontWeight: '600',
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value, name, entry) => [
                        name
                    ]}
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

                            <p className='text-sm text-text-secondary'>  {category.count} expenses - Rs.{category.amount}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};