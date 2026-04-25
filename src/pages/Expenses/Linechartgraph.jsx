import { LineChart,Tooltip, Line,XAxis } from 'recharts';
const data = [
  { name: 'Mon', expenses: 1350, count: 5 },
  { name: 'Tue', expenses: 320, count: 3 },
  { name: 'Wed', expenses: 2500, count: 8 },
  { name: 'Thu', expenses: 900, count: 3 },
  { name: 'Fri', expenses: 3100, count: 8 },
  { name: 'Sat', expenses: 5300, count: 7 },
  { name: 'Sun', expenses: 3801, count: 9 },
];
const LineChartExample = ({type}) => (
  <LineChart className='mt-5'
    width={250}
    height={25}
    data={data}
  >
     <XAxis dataKey="name" hide />
    <Tooltip contentStyle={{
borderRadius: '10px'
    }}/>
{
      type === "expenses" ? (<Line
      type="monotone"
      dataKey="expenses"
      stroke="black"
      strokeWidth={2}
    />) : ( <Line
      type="monotone"
      dataKey="count"
      stroke="black"
      strokeWidth={2}
    />)
}
  </LineChart>
);

export default LineChartExample;