import { useState } from 'react'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'

const App = () => {
  const [pageNum, setPageNum] = useState(0) // DREW FIX LATER
  const [employeeData, setEmployeeData] = useState({})
  console.log(pageNum)

  if (pageNum === 0) {
    return <Login pageUpdater={setPageNum} employeeDataUpdater={setEmployeeData}/>
  } else if (pageNum === 1) {
    return <EmployeePage pageUpdater={setPageNum} employeeData={employeeData}/>
  } else if (pageNum === 2) {
    return <ManagerPage employeeData={employeeData}/>
  }
}

export default App
