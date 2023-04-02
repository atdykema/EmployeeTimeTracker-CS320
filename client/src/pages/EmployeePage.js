import { useState } from 'react'
import TimeEntry from '../components/TimeEntry'
import NavigationTab from '../components/NavigationTab'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts'
import './EmployeePage.css'

const EmployeePage = ({ pageUpdater, employeeData }) => {
  const [time, setTime] = useState(['', '', '', '', '', '', ''])
  const [data, setData] = useState([
    { name: 'Monday', value: 10, pay: 10 },
    { name: 'Tuesday', value: 20, pay: 10 },
    { name: 'Wednesday', value: 15, pay: 10 },
    { name: 'Thursday', value: 25, pay: 10 },
    { name: 'Friday', value: 30, pay: 10 }
  ])
  const [xAxisName, setXAxisName] = useState('Day')

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  const nums = [0, 1, 2, 3, 4, 5, 6]

  const handleTimeChange = (num) => (event) => {
    const timeCopy = [...time]
    timeCopy[num] = event.target.value
    setTime(timeCopy)
  }

  const submitTime = (event) => {
    event.preventDefault()
    if (time.some(t => isNaN(t))) {
      alert('All inputs must be numbers!')
      return
    }
    if (time.some(t => parseInt(t) < 0)) {
      alert('Time input cannot be negative')
      return
    }
    if (time.some(t => parseInt(t) > 24)) {
      alert('Time input is too long')
      return
    }
    console.log(time)
  }

  const handleWeekly = () => {
    const newData = [
      { name: 'Monday', value: 10, pay: 10 },
      { name: 'Tuesday', value: 20, pay: 10 },
      { name: 'Wednesday', value: 15, pay: 10 },
      { name: 'Thursday', value: 25, pay: 10 },
      { name: 'Friday', value: 30, pay: 10 }
    ]
    setXAxisName('Day')
    setData(newData)
  }

  const handleMonthly = () => {
    const newData = [
      { name: 'Jan', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Feb', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Mar', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Apr', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'May', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Jun', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Jul', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Aug', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Sep', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Oct', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Nov', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) },
      { name: 'Dec', value: (170 * Math.random()).toFixed(2), pay: ((170 * Math.random()) * 22.5).toFixed(2) }
    ]
    setXAxisName('Month')
    setData(newData)
  }

  const handleYearly = () => {
    const newData = [
      { name: '2020', value: (2000 * Math.random()).toFixed(2), pay: ((2000 * Math.random()) * 22.5).toFixed(2) },
      { name: '2021', value: (2000 * Math.random()).toFixed(2), pay: ((2000 * Math.random()) * 22.5).toFixed(2) },
      { name: '2022', value: (2000 * Math.random()).toFixed(2), pay: ((2000 * Math.random()) * 22.5).toFixed(2) },
      { name: '2023', value: (2000 * Math.random()).toFixed(2), pay: ((2000 * Math.random()) * 22.5).toFixed(2) }

    ]
    setXAxisName('Year')
    setData(newData)
  }

  function CustomTooltip ({ active, payload, label }) {
    if (active && payload && payload.length) {
      const tooltipData = payload[0].payload
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`${label} : $${tooltipData.pay}`}</p>
          {/* <p className='intro'>{`Pay`}</p> */}
        </div>
      )
    }

    return null
  }

  function BarGraph () {
    return (
      <BarChart
        width={1200}
        height={300}
        data={data}
        margin={{ top: 15, right: 30, left: 30, bottom: 20 }}
      >
        <XAxis dataKey='name' label={{ value: xAxisName, position: 'insideBottom', dy: 10 }} />
        <YAxis label={{ value: 'Hours Worked', angle: -90, position: 'insideLeft', dy: 50 }}/>
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip content={<CustomTooltip />}/>
        <Bar dataKey='value' fill='#808080' />
        <ReferenceLine fill='#808080' />
      </BarChart>
    )
  }

  return <div className='page-container'>
        {employeeData.isManager && <NavigationTab pageUpdater={pageUpdater}/>}
        <div className='daybuttons-container'>
          <form onSubmit={submitTime} className='daybuttons-form'>
            <div className='inner-daybuttons-container'>
              {nums.map(num => <TimeEntry key={num} num={num} day={days[num]} time={time} timeUpdater={handleTimeChange}/>)}
            </div>
            <button className='time-entry-submit' type='submit'>Submit</button>
          </form>
        </div>
        <div className='date-info-container'>
          <div className=''>

          </div>
          <div className='payment-history-title'>Payment History</div>

          <div className='time-scale-button-container'>
            <button className='timescale-button' onClick={handleWeekly}>Weekly</button>
            <button className='timescale-button' onClick={handleMonthly}>Monthly</button>
            <button className='timescale-button' onClick={handleYearly}>Yearly</button>
          </div>

          <div className='graph-container'>
            <div className='graph'>
              <BarGraph />
            </div>
          </div>

        </div>
      </div>
}

export default EmployeePage
