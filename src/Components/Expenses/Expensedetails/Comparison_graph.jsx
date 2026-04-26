import React from "react";
import { selectFriendById } from "../../../store/FriendsSlice";
import { useSelector } from "react-redux";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";
export const Comparisongraph = ({ Expense }) => {
    const friends = (id) => {
        return useSelector(state => selectFriendById(state, id))
    }
    const data = Expense?.Members.map(member => {
        const friend = friends(member.id)
        return {
            name: friend.Name,
            img: friend.Image,
            spent: member.spent,
            share: member.share,
        }
    })
    return (
        <div style={{ width: "100%", height: 640 }}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 20, right: 30, left: 5, bottom: 30 }}
                >
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tick={({ x, y, payload }) => {
                            const item = data.find(d => d.name === payload.value);
                            const imgSrc = item?.img;
                            return (
                                <foreignObject x={x - 40} y={y - 15} width={40} height={40}>
                                    <img
                                        src={imgSrc}
                                        alt={payload.value}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </foreignObject>
                            );
                        }}
                        hide={data.length > 8}
                    />
                    <Tooltip
                        cursor={{ fill: "#f9f1ff", radius: 8 }}
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
                        formatter={(val, name, props) => {
                            if (name === "share") {
                                return [`Rs. ${Number(val).toLocaleString()}`, "share"];
                            }
                            if (name === "spent") {
                                return [`Rs. ${Number(val).toLocaleString()}`, "spent"];
                            }
                            return val;
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            paddingTop: 20,
                        }}
                        iconType="circle"
                    />
                    <Bar dataKey="share" fill="#C471F5" radius={[0, 6, 6, 0]} />
                    <Bar dataKey="spent" fill="#00C853" radius={[0, 6, 6, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};