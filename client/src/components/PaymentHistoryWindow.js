import { useState, useEffect } from 'react'
import BarGraph from '../components/BarGraph'
import loadingLogo from '../pages/loading.svg'
import listpic from './listpic.png'
import graphpic from './graphpic.png'
import requests from '../services/requests'
import './PaymentHistoryWindow.css'

const PaymentHistoryWindow = ({ isListPresent, setListPresence, employeeData, graphUpdates }) => {
  const [graphDisplayOption, setGraphDisplayOption] = useState('week')
  const [graphLoaded, updateGraphLoad] = useState(0)
  const [listLoaded, updateListLoad] = useState(0)

  const setDaily = (e) => setGraphDisplayOption('week')
  const setMonthly = (e) => setGraphDisplayOption('month')
  const setYearly = (e) => setGraphDisplayOption('year')
  const setGraph = (e) => setListPresence(false)
  const setList = (e) => setListPresence(true)

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
    /*
    put list request here
    */
    updateListLoad(1)
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
          <div className='graph'>
            List here
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
  }, [graphDisplayOption, graphUpdates]) // runs on first render and whenever the graph display changes

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
