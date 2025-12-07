import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Sector } from "recharts";
const FriendsDebtData = [
    { name: "Ali", amount: 2200, fill: "#FF6B35" },   // warm orange
    { name: "Sara", amount: 1500, fill: "#38A7FF" },  // bright blue
    { name: "Hamza", amount: 800, fill: "#4CAF50" },  // green
    { name: "Fatima", amount: 2700, fill: "#F7C72F" },// yellow
    { name: "Usman", amount: 3200, fill: "#A845DD" }, // purple
    { name: "Zara", amount: 1800, fill: "#FF69B4" },  // pink
    { name: "Bilal", amount: 900, fill: "#2E86AB" },  // deep blue
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
                outerRadius={outerRadius + 3}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                cornerRadius={8}
            />
        </g>
    );
};

const Analystic = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <PieChart width={160} height={148} tabIndex={-1}>
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
                data={FriendsDebtData}
                dataKey="amount"
                nameKey="name"
                innerRadius={40}
                outerRadius={70}
                cornerRadius={5}
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
                    fontSize: '12px',
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value, name, entry) => [
                    `${entry.payload.name}: Rs. ${value}`,
                ]}
            />
        </PieChart>
    );
};
export default Analystic;