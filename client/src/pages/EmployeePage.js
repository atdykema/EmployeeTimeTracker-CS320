import { useState } from 'react'
import TimeEntry from '../components/TimeEntry'
import LogoutButton from '../components/LogoutButton'
import NavigationTab from '../components/NavigationTab'
import BarGraph from '../components/BarGraph'
import './EmployeePage.css'

const EmployeePage = ({ employeeData, employeeDataUpdater }) => {
  const [time, setTime] = useState(['', '', '', '', '', '', ''])
  const [graphDisplayOption, setGraphDisplayOption] = useState('D')
  const setDaily = (e) => setGraphDisplayOption('D')
  const setMonthly = (e) => setGraphDisplayOption('M')
  const setYearly = (e) => setGraphDisplayOption('Y')

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

  // get current date
  const currentDate = new Date()
  // get Sunday by subtracting how far from sunday you are
  const sunday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()))
  // get Saturday by finding sunday, adding 6
  const saturday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6))

  return <div className='page-container'>
        <LogoutButton employeeDataUpdater={employeeDataUpdater}/>
        {employeeData.isManager && <NavigationTab />}
        <div className='daybuttons-container'>
          <form onSubmit={submitTime} className='daybuttons-form'>
            <h1>{`${sunday.toLocaleDateString()} — ${saturday.toLocaleDateString()}`}</h1>
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
            <button className='timescale-button' onClick={setDaily}>Weekly</button>
            <button className='timescale-button' onClick={setMonthly}>Monthly</button>
            <button className='timescale-button' onClick={setYearly}>Yearly</button>
          </div>

          <div className='graph-container'>
            <div className='graph'>
              <BarGraph timeOption={graphDisplayOption}/>
            </div>
          </div>

        </div>
      </div>
}

export default EmployeePage
