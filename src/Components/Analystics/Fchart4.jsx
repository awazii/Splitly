import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import mountain from "../../assets/groups/mountain.jpg"
import beach from "../../assets/groups/Sea.jpg"
import concert from "../../assets/groups/concert.jpg"
import Restaurant from "../../assets/groups/Restaurant.jpg"
import Other from "../../assets/groups/default.jpg"
const expenseData = [
  { group: "Trip to Murre", icon: mountain, expenses: 3500 },
  { group: "Trip to Sea View", icon: beach, expenses: 4800 },
  { group: "Dinner at Skyline Grills", icon: Restaurant, expenses: 6200 },
  { group: "Weekend Hangout", icon: Other, expenses: 2100 },
  { group: "Live Concert Night", icon: concert, expenses: 1500 },
];

const sortedData = [...expenseData].sort((a, b) => b.expenses - a.expenses);

const GroupExpensesChart = () => (
  <ResponsiveContainer width={"100%"} height={300}>
    <BarChart
      data={sortedData}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
    >
      <XAxis type="number" />
      <YAxis
        type="category"
        dataKey="group"
        tick={({ x, y, payload }) => {
          const entry = sortedData.find(item => item.group === payload.value);
          const logo = entry?.icon;
          return (
            <foreignObject x={x - 50} y={y - 20} width={50} height={50}>
              <img
                src={logo}
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
        hide={sortedData.length>10}
      />
      <Tooltip formatter={(value) => `${value} PKR`}
      cursor={{ fill: "#E8F5E9", radius: 8 }}
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
      <Bar dataKey="expenses" fill="#4CAF50" radius={[6, 6, 6, 6]} />
    </BarChart>
  </ResponsiveContainer>
);

export default GroupExpensesChart;