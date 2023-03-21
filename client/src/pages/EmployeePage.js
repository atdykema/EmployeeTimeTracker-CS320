import { useState } from 'react'
import TimeEntry from '../components/TimeEntry'

const EmployeePage = () => {
  const [time, setTime] = useState(["-1","-1","-1","-1","-1","-1","-1"])

  const onHome = (e) => {
    console.log('employee home')
  }

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
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

  return <div>
        <div className='homebuttons'>
          <div className='homesingle' id='employee_home_single' onClick={onHome}>
            Employee Home
          </div>
          <div className='homesingle' id='manager_home_single'>
            Manny
          </div>
        </div>
        <div className='daybuttons_container'>
          <form onSubmit={submitTime}>
            {nums.map(num => <TimeEntry key={num} num={num} day={days[num]} time={time} timeUpdater={handleTimeChange} />)}
            <button type="submit">Submit</button>
          </form> 
        </div>
        <div className='date-info-container'>
          <div className='title'>Payment Histoy</div>
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