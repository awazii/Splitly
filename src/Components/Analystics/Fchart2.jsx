import React from "react";
import { selectAllFriends } from "../../store/FriendsSlice";
import { useSelector } from "react-redux";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
export const TotalOwedChart = () => {
  const friends = useSelector(selectAllFriends)
  const data = friends.filter(friend => friend.netBalance.total < 0).map(friend => ({
    name: friend.Name,
    debts: Math.abs(friend.netBalance.total),
    img: friend.Image
  }))
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
              const item = data.find(d => d.name === payload.value);
              const imgSrc = item?.img
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
            hide={data.length > 10}
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
            dataKey="debts"
            stroke="#e53935"
            fill="rgba(229,57,53,0.4)"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};