import { useState, useEffect } from 'react'
import NavigationTab from '../components/NavigationTab'
import LogoutButton from '../components/LogoutButton'
import { useNavigate } from 'react-router-dom'
import PaymentHistoryWindow from '../components/PaymentHistoryWindow'

const ManagerIndividualPage = ({ employeeData, employeeDataUpdater, subordinateData, cookieReset, cookies }) => {
  const [isListPresent, setListPresence] = useState(false)
  const navigator = useNavigate()
  useEffect(() => {
    if (cookies.data === undefined) {
      // Display login form
      navigator('/')
    }
  }, [])
  console.log(subordinateData)

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
          <PaymentHistoryWindow isListPresent={isListPresent} setListPresence={setListPresence} employeeData={subordinateData}/>
        </div>
      </div>)
}
export default ManagerIndividualPage
