import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
const groupSizeData = [
  { group: "Trip to Murree Hills", size: 2 },
  { group: "Beach Day at Sea View", size: 8 },
  { group: "Dinner at Skyline Grills", size: 12 },
  { group: "Weekend Hangout with Friends", size: 4 },
  { group: "Live Concert Night", size: 8 },
  { group: "Gaming Marathon", size: 12 },
  { group: "Study Group Session", size: 4 },
];
const GroupSizeChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={groupSizeData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="group" hide/>
      <YAxis type="number" />
      <Tooltip
        cursor={{ stroke: "#ff6b35", strokeWidth: 1 }}
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
        }} />
      <Line
        type="monotone"
        dataKey="size"
        stroke="#ff6b35"
        strokeWidth={3}
        dot={{ r: 6, stroke: "#ff6b35" }}
        activeDot={{ r: 8, fill: "#ff6b35" }}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default GroupSizeChart;