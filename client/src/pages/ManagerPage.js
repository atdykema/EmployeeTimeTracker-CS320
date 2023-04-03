import { useState, useEffect } from 'react'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeSearch from '../components/EmployeeSearch'
import NavigationTab from '../components/NavigationTab'
import requests from '../services/requests'
import './ManagerPage.css'

const Managerpage = ({ pageUpdater, employeeData }) => {
  // call useState on employeeObjs to be updated in useEffect
  const [employeeObjs, setEmployeeObjs] = useState([])
  const [searchText, updateSearchText] = useState('')

  // note: HTTP calls are considered side effects to rendering
  //       react components, so this must be separate, since
  //       HTTP calls must be asynchronous
  useEffect(() => {
    const fetchData = async () => {
      const result = await requests.getManagerViewData(
        employeeData.employeeId,
        employeeData.companyName,
        employeeData.isManager
      )
      setEmployeeObjs(result.data.value) // update data
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

  return <div>
    <div className='page-container'>
      <NavigationTab pageUpdater={pageUpdater}/>
      <EmployeeSearch text={searchText} updateText={updateSearchText}/>
      <EmployeeTable employeeObjs={filterEmployees(employeeObjs, searchText)}/>
    </div>
  </div>
}

export default Managerpage
