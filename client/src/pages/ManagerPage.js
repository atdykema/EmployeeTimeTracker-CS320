import { useState } from 'react'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeSearch from '../components/EmployeeSearch'

const testData = [{ firstName: "tamo", lastName: "g", pay: 33, id: 0 }, { firstName: "pacsi", lastName: "a", pay: 88, id: 2}, { firstName: "ramon", lastName: "f", pay: 23, id: 23}];
const Managerpage = () => {
  return <div>
    <EmployeeSearch/>
    <EmployeeTable employeeObjs={testData}/>
  </div>
}

export default Managerpage;