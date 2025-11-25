import React from "react";
import saad from "../../assets/saad.jpg";
import habib from "../../assets/habib.png";
import zuzu from "../../assets/zuzu.png";
import awazii from "../../assets/awazii.jpg";
import daud from "../../assets/daud.jpg";
import arshman from "../../assets/arshman.jpg";
import sheda from "../../assets/sheda.jpg";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
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

export const MultiPaidVsOwes = () => {
  const data = [
    { name: "Saad", paid: 1200, owes: 600 },
    { name: "Zuzu", paid: 800, owes: 900 },
    { name: "Habib", paid: 1500, owes: 200 },
    { name: "Daud", paid: 400, owes: 700 },
    { name: "Awazii", paid: 1000, owes: 300 },
    { name: "Sheda", paid: 400, owes: 1200 },
    { name: "Arshman", paid: 500, owes: 1500 },
  ];

  return (
    <div style={{ width: "100%", height: 480 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={({ x, y, payload }) => {
              const imgSrc = avatars[payload.value];
              return (
                <foreignObject x={x - 20} y={y + 10} width={40} height={40}>
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
            }} hide={data.length>10}
          />
          <YAxis />
          <Tooltip
            formatter={(value, key) =>
              key === "paid" ? `${value} PKR Paid` : `${value} PKR Owed`
            }
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            labelStyle={{
              color: "#374151",
              fontWeight: "600",
            }}
            itemStyle={{
              color: "#111827",
              fontWeight: "500",
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: 30 }}
            iconType="circle"
            formatter={(value) => (value === "paid" ? "Paid" : "Owed")}
          />
          <Line
            type="monotone"
            dataKey="paid"
            stroke="#2196f3"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="owes"
            stroke="#E53935"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};