import { useState, useEffect } from 'react'
import NavigationTab from '../components/NavigationTab'
import LogoutButton from '../components/LogoutButton'
import requests from '../services/requests'
import { useNavigate, useParams } from 'react-router-dom'
import PaymentHistoryWindow from '../components/PaymentHistoryWindow'

const ManagerIndividualPage = ({ employeeData, employeeDataUpdater, cookieReset, cookies }) => {
  const [isListPresent, setListPresence] = useState(false)
  const [subordinateData, setSubordinateData] = useState(undefined)
  const { id: subordinateId } = useParams()
  const navigator = useNavigate()

  const fetchEmployee = async (employeeId, companyId) => {
    try {
      const resp = await requests.getEmployee(employeeId, companyId)
      setSubordinateData(resp.data.value)
      return resp
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (cookies.data === undefined) {
      // Display login form
      navigator('/')
      return
    }
    fetchEmployee(subordinateId, employeeData.companyId)
  }, [])

  return ((cookies.data === undefined) || subordinateData === undefined)
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
