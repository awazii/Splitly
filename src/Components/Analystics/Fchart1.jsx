import React from "react";
import saad from "../../assets/saad.jpg";
import habib from "../../assets/habib.png";
import zuzu from "../../assets/zuzu.png";
import awazii from "../../assets/awazii.jpg";
import daud from "../../assets/daud.jpg";
import arshman from "../../assets/arshman.jpg";
import sheda from "../../assets/sheda.jpg";

import {
  BarChart,
  Bar,
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
  { name: "Awazii", groups: 5 },
  { name: "Saad", groups: 3 },
  { name: "Zuzu", groups: 4 },
  { name: "Habib", groups: 2 },
  { name: "Arshman", groups: 11 },
  { name: "Daud", groups: 3 },
  { name: "Sheda", groups: 1 },
  { name: "Awazii", groups: 5 },
  { name: "Sheda", groups: 1 },
  { name: "Awazii", groups: 5 },
];

export const FriendsByGroupChart = () => {
  return (
    <div style={{ width: "100%", height:480 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
        >
          <XAxis
            dataKey="name"
            type="category"
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
            }}
          />
          <YAxis type="number" allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(251,191,36,0.15)", radius: 8 }}
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
          <Bar dataKey="groups" fill="#F59E0B" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};