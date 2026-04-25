import React from "react";
import { selectAllFriends } from "../../store/FriendsSlice";
import { useSelector } from "react-redux";
import { BarChart,Bar, XAxis, YAxis,Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";
export const FriendsByGroupChart = () => {
  const friends = useSelector(selectAllFriends)
  const data = friends.map(friend=>{
    return {
      name :friend.Name,
      groups:friend.crews.groupCount,
      img : friend.Image
    }
  })
  return (
    <div style={{ width: "100%", height: 480 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 25 }}
        >
          <XAxis
            dataKey="name"
            type="category"
            tick={({ x, y, payload }) => {
               const item = data.find(d => d.name === payload.value);
              const imgSrc = item?.img
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
            hide={data.length > 10}
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