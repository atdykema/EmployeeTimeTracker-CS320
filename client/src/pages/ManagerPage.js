import { useState, useEffect } from 'react'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeSearch from '../components/EmployeeSearch'
import LogoutButton from '../components/LogoutButton'
// import NavigationTab from '../components/NavigationTab'
import requests from '../services/requests'
import loadingLogo from './loading.svg'
import './ManagerPage.css'
import { useCookies } from 'react-cookie'

const Managerpage = ({ pageUpdater, employeeData, employeeDataUpdater, subordinateUpdater }) => {
  // call useState on employeeObjs to be updated in useEffect
  const [employeeObjs, setEmployeeObjs] = useState([])
  const [searchText, updateSearchText] = useState('')
  const [loaded, updateLoad] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'data', 'subData'])

  // note: HTTP calls are considered side effects to rendering
  //       react components, so this must be separate, since
  //       HTTP calls must be asynchronous
  useEffect(() => {
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
      <EmployeeTable employeeObjs={filterEmployees(employeeObjs, searchText)} selectionUpdater={subordinateUpdater} pageUpdater={pageUpdater}/></div>
    }
  }
  const onBack = () => {
    setCookie('user', 1, { path: '/', expires: new Date(Date.now() + 50000) })
    setCookie('data', cookies.data, { path: '/', expires: new Date(Date.now() + 50000) })
  }

  return <div className='page-container'>
      <LogoutButton pageUpdater={pageUpdater} employeeDataUpdater={employeeDataUpdater}/>
      <div className='back-button' onClick={onBack}>Back</div>
      {loadFunction()}
      </div>
}

export default Managerpage
