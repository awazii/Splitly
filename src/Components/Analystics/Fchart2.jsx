import React from "react";
import saad from "../../assets/saad.jpg";
import habib from "../../assets/habib.png";
import zuzu from "../../assets/zuzu.png";
import awazii from "../../assets/awazii.jpg";
import daud from "../../assets/daud.jpg";
import arshman from "../../assets/arshman.jpg";
import sheda from "../../assets/sheda.jpg";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const avatars = {
  Awazii: awazii,
  Saad: saad,
  Zuzu: zuzu,
  Habib: habib,
  Arshman: arshman,
  Daud: daud,
  Sheda: sheda,
};

const data = [
  { name: "Awazii", owed: 1200 },
  { name: "Saad", owed: 800 },
  { name: "Zuzu", owed: 450 },
  { name: "Habib", owed: 1000 },
  { name: "Arshman", owed: 600 },
  { name: "Daud", owed: 300 },
  { name: "Sheda", owed: 40 },
];

export const TotalOwedChart = () => {
  return (
    <div style={{ width: "100%", height: 480 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <XAxis
            dataKey="name"
            tick={({ x, y, payload }) => {
              const imgSrc = avatars[payload.value];
              return (
                <foreignObject x={x - 15} y={y + 5} width={40} height={40}>
                  <img
                    src={imgSrc}
                    alt={payload.value}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </foreignObject>
              );
            }}
            hide={data.length>10}
          />
          <YAxis />
          <Tooltip
            formatter={(value) => `${value} PKR`}
            cursor={{ stroke: "#e53935", strokeWidth: 1 }}
            labelStyle={{
              color: "#374151",
              fontWeight: "600",
            }}
            itemStyle={{
              color: "#111827",
              fontWeight: "500",
            }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="owed"
            stroke="#e53935"
            fill="rgba(229,57,53,0.4)" 
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};