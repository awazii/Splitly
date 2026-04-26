import { LineChart, Tooltip, Line, XAxis } from 'recharts';
const LineChartExample = ({ type ,data }) => {
  console.log(data)
return (
  <LineChart className='mt-5'
    width={250}
    height={25}
    data={data}
  >
    <XAxis dataKey="date" hide />
    <Tooltip contentStyle={{
      borderRadius: '10px'
    }}
    formatter={(value) => {
          const formatted = Number(value).toLocaleString();
          return type === "expenses"
            ? [`Rs.${formatted}`, "Amount"]
            : [formatted, "Count"];
        }}
    />
    {
      type === "expenses" ? (<Line
        type="monotone"
        dataKey="amount"
        stroke="black"
        strokeWidth={2}
      />) : (<Line
        type="monotone"
        dataKey="count"
        stroke="black"
        strokeWidth={2}
      />)
    }
  </LineChart>
)
};

export default LineChartExample;