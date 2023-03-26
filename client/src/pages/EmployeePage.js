import { useState } from 'react'
import TimeEntry from '../components/TimeEntry'
import './EmployeePage.css'

const EmployeePage = () => {
  const [time, setTime] = useState(["","","","","","",""])

  const onHome = (e) => {
    console.log('employee home')
  }

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  const nums = [0,1,2,3,4,5,6]

  const handleTimeChange = (num) => (event) => {
    const timeCopy = [...time]
    timeCopy[num] = event.target.value
    setTime(timeCopy)
  }

  const submitTime = (event) => {
    event.preventDefault()
    if (time.some(t => isNaN(t))) {
      alert("All inputs must be numbers!")
      return
    }
    if (time.some(t => parseInt(t) < 0)) {
      alert("Time input cannot be negative")
      return
    }
    if (time.some(t => parseInt(t) > 24)) {
      alert("Time input is too long")
      return
    }
    console.log(time)
  }

  return <div className='page-container'>
        <div className='home-buttons'>
          <div className='home-single' id='employee_home_single' onClick={onHome}>
            Employee Home
          </div>
          <div className='home-single' id='manager_home_single'>
            Manager Home
          </div>
        </div>
        <div className='daybuttons-container'>
          <form onSubmit={submitTime} className="daybuttons-form">
            <div className='inner-daybuttons-container'>
              {nums.map(num => <TimeEntry key={num} num={num} day={days[num]} time={time} timeUpdater={handleTimeChange}/>)}
            </div>
            <button className="time-entry-submit" type="submit">Submit</button>
          </form> 
        </div>
        <div className='date-info-container'>
          <div className='title'>Payment History</div>
          <div className='timescale-container'>
            <div className='timescale-button' id='weekly'></div>
            <div className='timescale-button' id='monthly'></div>
            <div className='timescale-button' id='yearly'></div>
          </div>
          <div className='graph-container'>
            <div className='graph'>
              *graph goes here*
            </div>
          </div>
          
        </div>            
      </div>
}

export default EmployeePage;