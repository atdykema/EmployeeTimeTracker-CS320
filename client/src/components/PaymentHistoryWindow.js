/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import BarGraph from '../components/BarGraph'
import ListViewTable from '../components/ListViewTable'
import loadingLogo from '../pages/loading.svg'
import listpic from './listpic.png'
import graphpic from './graphpic.png'
import requests from '../services/requests'
import DaySearch from './DaySearch'
import './PaymentHistoryWindow.css'

const PaymentHistoryWindow = ({ isListPresent, setListPresence, employeeData }) => {
  const [graphDisplayOption, setGraphDisplayOption] = useState('week')
  const [graphLoaded, updateGraphLoad] = useState(0)
  const [listLoaded, updateListLoad] = useState(0)
  const [listData, updateListData] = useState(undefined)
  const [searchText, updateSearchText] = useState('')

  const setDaily = (e) => setGraphDisplayOption('week')
  const setMonthly = (e) => setGraphDisplayOption('month')
  const setYearly = (e) => setGraphDisplayOption('year')
  const setGraph = (e) => setListPresence(false)
  const setList = (e) => {
    setListPresence(true)
    fetchData()
  }

  const [graphData, setGraphData] = useState(0)

  const fetchData = async () => {
    updateGraphLoad(0)
    const result = await requests.getTimeData(
      employeeData.employeeId,
      employeeData.companyId,
      graphDisplayOption
    )
    setGraphData(result.data.value)
    updateGraphLoad(1)
  }

  const fetchListData = async () => {
    updateListLoad(0)
    const result = await requests.getAllTime(
      employeeData.employeeId,
      employeeData.companyId
    )
    console.log(result)
    updateListData(result.data.value)
    // console.log(listData)
    updateListLoad(1)
  }

  const filterDays = (days, text) => {
    // return all employees if text is empty
    console.log(days)
    console.log(text)
    if (text === '') {
      return days
    }

    // otherwise check if text is in the ID or name
    // currently assumes that the manager will type
    // in first name, then last name, but can change
    const hasText = (txt) => (day) => {
      return day.date.toString().startsWith(txt)
    }
    return days.filter(hasText(text))
  }

  const setDisplay = () => {
    if (!isListPresent) {
      if (!graphLoaded) {
        return <img src={loadingLogo}></img>
      } else {
        return (
          <div className='graph'>
            <BarGraph timeOption={graphDisplayOption} dataArr={graphData}/>
          </div>
        )
      }
    } else if (isListPresent) {
      if (!listLoaded) {
        return <img src={loadingLogo}></img>
      } else {
        return (
          <div className='list'>
            <DaySearch text={searchText} updateText={updateSearchText} />
            <ListViewTable dayObjs={filterDays(listData, searchText)}/>
          </div>
        )
      }
    }
  }

  useEffect(() => {
    fetchListData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [graphDisplayOption]) // runs on first render and whenever the graph display changes

  return (
    <div className='outer-di-container'>
      <div className='side-tab-container'>
        <div className='side-tab' id='graph-tab' style={!isListPresent ? { backgroundColor: 'rgba(220,220,220, 1)' } : { backgroundColor: 'rgba(220,220,220, .5)' }} onClick={setGraph}><img className='graphpic' src={graphpic}></img></div>
        <div className='side-tab' id='list-tab' style={isListPresent ? { backgroundColor: 'rgba(220,220,220, 1)' } : { backgroundColor: 'rgba(220,220,220, .5)' }} onClick={setList}><img className='listpic' src={listpic}></img></div>
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

        <div className='graph-container' style={isListPresent ? { minHeight: '70vh' } : { minHeight: '0vh' }}>
        {
          setDisplay()
        }
        </div>
      </div>
    </div>
  )
}

export default PaymentHistoryWindow
