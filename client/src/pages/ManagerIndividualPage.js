import { useState } from 'react'
import NavigationTab from '../components/NavigationTab'
import BarGraph from '../components/BarGraph'
import LogoutButton from '../components/LogoutButton'
import { useCookies } from 'react-cookie'
const ManagerIndividualPage = ({ pageUpdater, employeeData, subordinateData, employeeDataUpdater }) => {
  const [graphDisplayOption, setGraphDisplayOption] = useState('D')
  const setDaily = (e) => setGraphDisplayOption('D')
  const setMonthly = (e) => setGraphDisplayOption('M')
  const setYearly = (e) => setGraphDisplayOption('Y')
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'data', 'subData'])
  const onBack = () => {
    setCookie('user', 2, { path: '/', expires: new Date(Date.now() + 50000) })
    setCookie('data', cookies.data, { path: '/', expires: new Date(Date.now() + 50000) })
    removeCookie('subData')
  }
  console.log(subordinateData)
  return <div className='page-container'>
        <LogoutButton pageUpdater={pageUpdater} employeeDataUpdater={employeeDataUpdater}/>
        {employeeData.isManager && <NavigationTab pageUpdater={pageUpdater}/>}
        <div className='back-button' onClick={onBack}>Back</div>
        <div className='date-info-container'>
          <h1>
            {subordinateData.firstName + ' ' + subordinateData.lastName}
          </h1>
          {/* <div className=''> */}
            {/* <h1>
              {employeeData.Id}
            </h1> */}
          {/* </div> */}
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
export default ManagerIndividualPage
