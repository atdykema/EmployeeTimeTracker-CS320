import { useState, useEffect } from 'react'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeSearch from '../components/EmployeeSearch'
import requests from '../services/requests'

const Managerpage = ({ employeeData }) => {
  // call useState on employeeObjs to be updated in useEffect
  const [employeeObjs, setEmployeeObjs] = useState([])

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

  return (
    <div>
      <EmployeeSearch />
      <EmployeeTable employeeObjs={employeeObjs} />
    </div>
  )
}

export default Managerpage
