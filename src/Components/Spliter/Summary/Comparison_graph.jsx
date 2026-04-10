import React from "react";
import saad from "../../../assets/saad.jpg";
import habib from "../../../assets/habib.png";
import zuzu from "../../../assets/zuzu.png";
import awazii from "../../../assets/awazii.jpg";
import daud from "../../../assets/daud.jpg";
import arshman from "../../../assets/arshman.jpg";
import sheda from "../../../assets/sheda.jpg";
import { Friends } from "../../friends/Friendslist";
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
    { name: "Awazii", share: 3100, paid: 1800 },
    { name: "Saad", share: 1900, paid: 1500 },
    { name: "Zuzu", share: 2400, paid: 900 },
    { name: "Habib", share: 1200, paid: 1000 },
    { name: "Arshman", share: 1770, paid: 360 },
    { name: "Daud", share:2300, paid: 3470 },
    { name: "Sheda", share: 600, paid: 600 },
];
const totalShare = data.reduce((sum, d) => sum + d.share, 0);
const totalPaid = data.reduce((sum, d) => sum + d.paid, 0);
const getPercent = (value, total) => ((value / total) * 100).toFixed(1);
const sortedData = [...data].sort((a, b) => b.paid - a.paid);
export const Comparisongraph = () => {
    return (
        <div style={{ width: "100%", height: 640 }}>
            <ResponsiveContainer>
                <BarChart
                    layout="vertical"
                    data={sortedData}
                    margin={{ top: 20, right: 30, left: 5, bottom: 30 }}
                >
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tick={({ x, y, payload }) => {
                            const imgSrc = avatars[payload.value];
                            return (
                                <foreignObject x={x - 40} y={y -15} width={40} height={40}>
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
                         hide={data.length>8}
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
                                return [`Rs. ${val} (${getPercent(val, totalShare)}%)`, "Share"];
                            }
                            if (name === "paid") {
                                return [`Rs. ${val} (${getPercent(val, totalPaid)}%)`, "Paid"];
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
                    <Bar dataKey="paid" fill="#00C853" radius={[0, 6, 6, 0]} />
                    <Bar dataKey="share" fill="#C471F5" radius={[0, 6, 6, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};