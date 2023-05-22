import { useState, useEffect } from 'react'
import TimeEntry from '../components/TimeEntry'
import LogoutButton from '../components/LogoutButton'
import NavigationTab from '../components/NavigationTab'
import PaymentHistoryWindow from '../components/PaymentHistoryWindow'
import requests from '../services/requests'
import './EmployeePage.css'
import { useNavigate } from 'react-router-dom'

const EmployeePage = ({ employeeData, employeeDataUpdater, cookieReset, cookies }) => {
  const navigator = useNavigate()
  const [isListPresent, setListPresence] = useState(false)
  // acts as an updater to the child components to force a rerender
  const [graphUpdates, setGraphUpdates] = useState(0)

  useEffect(() => {
    if (cookies.data === undefined) {
      // Display login form
      navigator('/')
    }
  }, [])

  const [time, setTime] = useState(['0', '0', '0', '0', '0', '0', '0'])

  const loadTimeEntry = async () => {
    const result = await requests.getTimeData(
      employeeData.employeeId,
      null,
      employeeData.companyId,
      cookies.token,
      'week'
    )
    setTime(result.data.value)
  }

  useEffect(() => {
    loadTimeEntry()
  }, []) // populates time entry, only once

  const sendData = async () => {
    console.log('send')
    console.log(cookies.token)
    // get current date
    const currentDate = new Date()
    console.log(currentDate)

    // map dates to time entry to send to backend, storing date and hour
    const timeEntries = time.map(
      (e, i) => ({ date: new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + i)).toISOString().slice(0, 10), hoursWorked: e })
    )

    // checks if a user has put a time after the current date
    const today = new Date()
    for (let i = today.getDay() + 1; i < 7; i++) {
      if (parseInt(time[i]) !== 0 && !isNaN(parseInt(time[i]))) { // empty or expliticlty 0
        alert('You have entered a time after today. Please erase, or set to zero.')
        return
      }
    }

    console.log(timeEntries)

    let resp
    try {
      resp = await requests.sendTimeData(employeeData.employeeId, employeeData.companyId, timeEntries, cookies.token)
    } catch (err) {
      console.log(err)
      if (err.message === 'Network Error') {
        // reroute to an error page saying that the server is down
        navigator('/serverdown')
      }
    }

    console.log(resp)
  }

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

  const submitTime = async (event) => {
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
    await sendData()

    // updates graph child component
    setGraphUpdates(graphUpdates + 1)
  }

  // get current date
  const currentDate = new Date()
  // get Sunday by subtracting how far from sunday you are
  const sunday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()))
  // get Saturday by finding sunday, adding 6
  const saturday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6))
  return cookies.data === undefined
    ? <div></div>
    : (
      <div className='page-container'>
        <LogoutButton cookies={cookies} cookieReset = {cookieReset}/>
        {employeeData.isManager && <NavigationTab />}
        <div className='content-container'>
          <div className='daybuttons-container' style={isListPresent ? { opacity: '0%', zIndex: -1, maxHeight: '0vh' } : { opacity: '100%', zIndex: 1, maxHeight: '100vh' }}>
            <div className='info-container'>
              <div className='employee-name'>Hello, {employeeData.firstName}</div>
              <div className='current-date'>{`${sunday.toLocaleDateString()} — ${saturday.toLocaleDateString()}`}</div>
            </div>
            <form onSubmit={submitTime} className='daybuttons-form'>
              <div className='inner-daybuttons-container'>
                {nums.map(num => <TimeEntry key={num} num={num} day={days[num]} time={time} timeUpdater={handleTimeChange}/>)}
              </div>
              <button className='time-entry-submit' type='submit'>Submit</button>
            </form>
          </div>
          <PaymentHistoryWindow isListPresent={isListPresent} setListPresence={setListPresence} employeeData={employeeData} graphUpdates={graphUpdates} cookies={cookies} forItself={'true'} subordinateId = {null} type='employee'/>
        </div>
      </div>
      )
}

export default EmployeePage
