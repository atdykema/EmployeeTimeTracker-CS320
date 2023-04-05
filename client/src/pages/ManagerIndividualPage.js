import { useState } from 'react'
import NavigationTab from '../components/NavigationTab'
import BarGraph from '../components/BarGraph'
import LogoutButton from '../components/LogoutButton'
const ManagerIndividualPage = ({ pageUpdater, employeeData, subordinateData, employeeDataUpdater }) => {
  const [graphDisplayOption, setGraphDisplayOption] = useState('D')
  const setDaily = (e) => setGraphDisplayOption('D')
  const setMonthly = (e) => setGraphDisplayOption('M')
  const setYearly = (e) => setGraphDisplayOption('Y')
  console.log(subordinateData)
  return <div className='page-container'>
        <LogoutButton pageUpdater={pageUpdater} employeeDataUpdater={employeeDataUpdater}/>
        {employeeData.isManager && <NavigationTab pageUpdater={pageUpdater}/>}
        <div className='back-button' onClick={() => pageUpdater(2)}>Back</div>
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
