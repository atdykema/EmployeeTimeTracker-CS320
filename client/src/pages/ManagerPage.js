import { useState, useEffect } from 'react'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeSearch from '../components/EmployeeSearch'
import LogoutButton from '../components/LogoutButton'
import requests from '../services/requests'
import loadingLogo from './loading.svg'
import './ManagerPage.css'
import NavigationTab from '../components/NavigationTab'
import { useNavigate } from 'react-router-dom'

const Managerpage = ({ employeeData, employeeDataUpdater, cookieReset, cookies }) => {
  // call useState on employeeObjs to be updated in useEffect
  const [employeeObjs, setEmployeeObjs] = useState([])
  const [searchText, updateSearchText] = useState('')
  const [loaded, updateLoad] = useState(0)
  const navigator = useNavigate()

  console.log('yup cookies.data: ' + cookies.data)
  useEffect(() => {
    console.log('well hello there')
    if (cookies.data === undefined) {
      // Display login form
      console.log('redirecting to login')
      navigator('/')
    }
  }, [cookies, employeeData, employeeDataUpdater, cookieReset])

  // note: HTTP calls are considered side effects to rendering
  //       react components, so this must be separate, since
  //       HTTP calls must be asynchronous
  useEffect(() => {
    console.log('is it printed?')
    const fetchData = async () => {
      updateLoad(0)
      const result = await requests.getManagerViewData(
        employeeData.employeeId,
        employeeData.companyName,
        employeeData.isManager
      )
      setEmployeeObjs(result.data.value) // update data
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

  return <div className='page-container'>
      {console.log('1 it is' + cookies.data)}
      {console.log('2 it is' + cookies.data)}
      {employeeData.isManager && <NavigationTab />}
      <LogoutButton employeeDataUpdater={employeeDataUpdater} cookieReset= {cookieReset}/>
      {loadFunction()}
      </div>
}

export default Managerpage
