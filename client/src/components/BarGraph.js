import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, LabelList } from 'recharts'
// import getTimeData from '../services/requests'

const BarGraph = ({ timeOption, dataArr }) => {
  let data = null
  let xAxisName = null
  // https://stackoverflow.com/questions/32937181/javascript-es6-map-multiple-arrays
  const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]])
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ]
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  const years = [
    '2021', '2022', '2023'
  ]
  if (timeOption === 'week') {
    data = zip(days, dataArr).map(([day, hours]) => ({ name: day, value: hours, pay: 10 }))
    xAxisName = 'Day'
  } else if (timeOption === 'month') {
    data = zip(months, dataArr).map(([month, hours]) => ({ name: month, value: hours, pay: 10 }))
    xAxisName = 'Month'
  } else if (timeOption === 'year') {
    data = zip(years, dataArr).map(([year, hours]) => ({ name: year, value: hours, pay: 10 }))
    xAxisName = 'Year'
  }

  const tickCount = 15
  const maxValue = Math.ceil(Math.max(...data.map((d) => d.value)))
  const domainMax = Math.ceil(maxValue / tickCount) * Number(tickCount * 1.2)

  function CustomTooltip ({ active, payload }) {
    if (active && payload && payload.length) {
      const tooltipData = payload[0].payload
      return (
        <div className='custom-tooltip'>
          <p className='label'>
            {`Pay: $${tooltipData.pay}`}
            </p>
        </div>
      )
    }

    return null
  }

  return <BarChart
              width={1200}
              height={300}
              data={data}
              margin={{ top: 15, right: 30, left: 30, bottom: 20 }}
              >
            <XAxis dataKey='name' label={{ value: xAxisName, position: 'insideBottom', dy: 10 }} />
            <YAxis label={{ value: 'Hours Worked', angle: -90, position: 'insideLeft', dy: 50 }} domain={[0, domainMax]} tickCount={tickCount}/>
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip content={<CustomTooltip />}/>
            <Bar dataKey='value' fill='#808080'>
            <LabelList
              dataKey="value"
              position="insideTop"
              fill="#fff"
              content={({ x, y, width, value }) => (
                <text x={x + width / 2} y={y} dy={-10} textAnchor="middle" fill="#666">
                  {value}
                </text>
              )}
            />
            </Bar>
            <ReferenceLine fill='#808080' />
      </BarChart>
}

export default BarGraph
