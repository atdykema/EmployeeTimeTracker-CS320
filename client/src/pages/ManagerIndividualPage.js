import { useState, useEffect } from 'react'
import NavigationTab from '../components/NavigationTab'
import BarGraph from '../components/BarGraph'
import LogoutButton from '../components/LogoutButton'
import requests from '../services/requests'
import loadingLogo from './loading.svg'
import { useNavigate } from 'react-router-dom'

const ManagerIndividualPage = ({ employeeData, employeeDataUpdater, subordinateData, cookieReset, cookies }) => {
  const [graphDisplayOption, setGraphDisplayOption] = useState('week')
  const [loaded, updateLoad] = useState(0)
  const [data, setData] = useState(0)
  const setDaily = (e) => setGraphDisplayOption('week')
  const setMonthly = (e) => setGraphDisplayOption('month')
  const setYearly = (e) => setGraphDisplayOption('year')

  const navigator = useNavigate()
  useEffect(() => {
    if (cookies.data === undefined) {
      // Display login form
      navigator('/')
    }
  }, [])
  console.log(subordinateData)

  useEffect(() => {
    const fetchData = async () => {
      updateLoad(0)
      let result
      try {
        result = await requests.getTimeData(
          subordinateData.employeeId,
          subordinateData.companyId,
          graphDisplayOption)
      } catch (err) {
        console.log(err)
        if (err.message === 'Network Error') {
          // reroute to an error page saying that the server is down
          navigator('/serverdown')
        }
      }
      console.log(result.data.value)
      setData(result.data.value)
      updateLoad(1)
    }
    fetchData()
  }, [graphDisplayOption]) // runs on first render and whenever the graph display changes

  const loadGraph = () => {
    if (!loaded) {
      return <img src={loadingLogo}></img>
    } else {
      return (
        <div className='graph-container'>
          <div className='graph'>
            <BarGraph timeOption={graphDisplayOption} dataArr={data}/>
          </div>
        </div>
      )
    }
  }

  return (cookies.data === undefined)
    ? <div/>
    : (<div className='page-container'>
        <LogoutButton employeeDataUpdater={employeeDataUpdater} cookieReset={cookieReset}/>
        {employeeData.isManager && <NavigationTab />}
        <div className='back-button' onClick={() => navigator('/manager/view')}>Back</div>
        <div className='content-container'>
          <div className='name-container-man'>
            <div className='employee-name-man'>
              {subordinateData.firstName + ' ' + subordinateData.lastName}
            </div>
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

            <div className='graph-container'>
            {
              loadGraph()
            }
            </div>

          </div>
        </div>
      </div>)
}
export default ManagerIndividualPage
