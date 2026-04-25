import React from "react";
import { FriendsSpendings } from "../../store/ExpenseSlice"
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Memberdetails } from "../../utils/Memberdetails";
export const MultiPaidVsOwes = () => {
  const data = useSelector(FriendsSpendings).map(d => (
    {
      name: Memberdetails(d.id)?.Name,
      Img : Memberdetails(d.id)?.Image,
      spent : d.spent,
      share:d.share
    }))

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
              const item = data.find(d => d.name === payload.value);
              const imgSrc = item?.Img
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
            }} hide={data.length > 10}
          />
          <YAxis />
          <Tooltip
            formatter={(value, key) =>
              key === "spent" ? `Rs.${Number(value).toLocaleString()}` : `Rs.${Number(value).toLocaleString()}`
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
            formatter={(value) => (value === "spent" ? "spent" : "share")}
          />
          <Line
            type="monotone"
            dataKey="spent"
            stroke="#00C853"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="share"
            stroke="#C471F5"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};