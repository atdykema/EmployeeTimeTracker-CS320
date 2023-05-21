import { useState, useEffect } from 'react'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeSearch from '../components/EmployeeSearch'
import LogoutButton from '../components/LogoutButton'
import requests from '../services/requests'
import loadingLogo from './loading.svg'
import './ManagerPage.css'
import NavigationTab from '../components/NavigationTab'
import { useNavigate } from 'react-router-dom'
import PaymentHistoryWindow from '../components/PaymentHistoryWindow'

const Managerpage = ({ employeeData, employeeDataUpdater, cookieReset, cookies }) => {
  const [isListPresent, setListPresence] = useState(false)
  // call useState on employeeObjs to be updated in useEffect
  const [employeeObjs, setEmployeeObjs] = useState([])
  const [searchText, updateSearchText] = useState('')
  const [loaded, updateLoad] = useState(0)
  const navigator = useNavigate()

  useEffect(() => {
    if (cookies.data === undefined) {
      // Display login form
      console.log('redirecting to login')
      navigator('/')
    }
  }, [])

  // note: HTTP calls are considered side effects to rendering
  //       react components, so this must be separate, since
  //       HTTP calls must be asynchronous
  useEffect(() => {
    const fetchData = async () => {
      // updateLoad(0)
      let result
      try {
        // eslint-disable-next-line no-unused-vars
        result = await requests.getManagerViewData(
          employeeData.employeeId,
          employeeData.companyName,
          employeeData.isManager
        )
      } catch (err) {
        console.log(err)
        if (err.message === 'Network Error') {
          // reroute to an error page saying that the server is down
          navigator('/serverdown')
        }
      }
      // console.log(result.data.value)
      const empDataResult = result.data.value
      const filteredEmployeeData = empDataResult.filter(obj => empDataResult.indexOf(obj) === empDataResult.findIndex(o => o.employeeId === obj.employeeId))
      setEmployeeObjs(filteredEmployeeData) // update data
      updateLoad(1)
    }
    fetchData()
  }, [employeeData]) // runs on first render

  const filterEmployees = (employees, text) => {
    // return all employees if text is empty
    if (text === '') {
      return employees
    }

    // otherwise check if text is in the ID or name
    // currently assumes that the manager will type
    // in first name, then last name, but can change
    const hasText = (txt) => (employee) => {
      return employee.employeeId.toString().startsWith(txt) || (employee.firstName + ' ' + employee.lastName).toLowerCase().startsWith(txt.toLowerCase())
    }
    return employees.filter(hasText(text))
  }

  const loadFunction = () => {
    if (!loaded) {
      return <img src={loadingLogo}></img>
    } else {
      return <div><EmployeeSearch text={searchText} updateText={updateSearchText} />
      <EmployeeTable employeeObjs={filterEmployees(employeeObjs, searchText)} selectionUpdater={employeeDataUpdater} /></div>
    }
  }

  return (cookies.data === undefined)
    ? <div/>
    : (
        <div className='page-container'>
        {employeeData.isManager && <NavigationTab />}
        <LogoutButton employeeDataUpdater={employeeDataUpdater} cookieReset= {cookieReset}/>
        <PaymentHistoryWindow isListPresent={isListPresent} setListPresence={setListPresence} employeeData={employeeData} type='aggregate'/>
        {loadFunction()}
        </div>
      )
}

export default Managerpage
