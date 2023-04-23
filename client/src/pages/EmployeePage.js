import { useState, useEffect } from 'react'
import TimeEntry from '../components/TimeEntry'
import LogoutButton from '../components/LogoutButton'
import NavigationTab from '../components/NavigationTab'
import BarGraph from '../components/BarGraph'
import loadingLogo from './loading.svg'
import listpic from './listpic.png'
import graphpic from './graphpic.png'
import requests from '../services/requests'
import './EmployeePage.css'
import { useNavigate } from 'react-router-dom'

const EmployeePage = ({ employeeData, employeeDataUpdater, cookieReset, cookies }) => {
  const navigator = useNavigate()
  useEffect(() => {
    if (cookies.data === undefined) {
      // Display login form
      navigator('/')
    }
  }, [])

  const [time, setTime] = useState(['0', '0', '0', '0', '0', '0', '0'])
  const [graphDisplayOption, setGraphDisplayOption] = useState('week')
  const [graphLoaded, updateGraphLoad] = useState(0)
  const [listLoaded, updateListLoad] = useState(0)
  const [currentDisplay, updateDisplay] = useState(0)
  const [data, setData] = useState(0)
  const setDaily = (e) => setGraphDisplayOption('week')
  const setMonthly = (e) => setGraphDisplayOption('month')
  const setYearly = (e) => setGraphDisplayOption('year')
  const setGraph = (e) => updateDisplay(0)
  const setList = (e) => updateDisplay(1)

  const fetchData = async () => {
    updateGraphLoad(0)
    const result = await requests.getTimeData(
      employeeData.employeeId,
      employeeData.companyId,
      graphDisplayOption
    )
    setData(result.data.value)
    updateGraphLoad(1)
  }

  const fetchListData = async () => {
    updateListLoad(0)
    /*
    put list request here
    */
    updateListLoad(1)
  }

  const loadTimeEntry = async () => {
    const result = await requests.getTimeData(
      employeeData.employeeId,
      employeeData.companyId,
      'week'
    )
    setTime(result.data.value)
  }

  useEffect(() => {
    fetchListData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [graphDisplayOption]) // runs on first render and whenever the graph display changes

  useEffect(() => {
    loadTimeEntry()
  }, []) // populates time entry, only once

  const sendData = async () => {
    // get current date
    const currentDate = new Date()

    const timeEntries = time.map(
      (e, i) => ({ date: new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + i)).toISOString().slice(0, 10), hoursWorked: e })
    )
    const resp = await requests.sendTimeData(employeeData.employeeId, employeeData.companyId, timeEntries)
    console.log(resp) // TODO: Error handling

    // reload the graph
    fetchData()
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
  }

  const setDisplay = () => {
    if (currentDisplay === 0) {
      if (!graphLoaded) {
        return <img src={loadingLogo}></img>
      } else {
        return (
          <div className='graph'>
            <BarGraph timeOption={graphDisplayOption} dataArr={data}/>
          </div>
        )
      }
    } else if (currentDisplay === 1) {
      if (!listLoaded) {
        return <img src={loadingLogo}></img>
      } else {
        return (
          <div className='graph'>
            List here
          </div>
        )
      }
    }
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
        <LogoutButton employeeDataUpdater={employeeDataUpdater} cookieReset = {cookieReset}/>
        {employeeData.isManager && <NavigationTab />}
        <div className='content-container'>
          <div className='daybuttons-container' style={currentDisplay === 1 ? { opacity: '0%', zIndex: -1, maxHeight: '0vh' } : { opacity: '100%', zIndex: 1, maxHeight: '100vh' }}>
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
          <div className='outer-di-container'>
            <div className='side-tab-container'>
              <div className='side-tab' id='graph-tab' style={currentDisplay === 0 ? { backgroundColor: 'rgba(220,220,220, 1)' } : { backgroundColor: 'rgba(220,220,220, .5)' }} onClick={setGraph}><img className='graphpic' src={graphpic}></img></div>
              <div className='side-tab' id='list-tab' style={currentDisplay === 1 ? { backgroundColor: 'rgba(220,220,220, 1)' } : { backgroundColor: 'rgba(220,220,220, .5)' }} onClick={setList}><img className='listpic' src={listpic}></img></div>
            </div>
            <div className='date-info-container'>
              <div className='time-scale-button-container'>
                <div className='pht-container'>
                  <div className='payment-history-title'>Payment History</div>
                </div>
                <button className='timescale-button' onClick={setDaily}>Weekly</button>
                <button className='timescale-button' onClick={setMonthly}>Monthly</button>
                <button className='timescale-button' onClick={setYearly}>Yearly</button>
              </div>

              <div className='graph-container' style={currentDisplay === 1 ? { minHeight: '70vh' } : { minHeight: '0vh' }}>
              {
                setDisplay()
              }
              </div>

            </div>
          </div>
        </div>
      </div>
      )
}

export default EmployeePage
