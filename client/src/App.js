import { useState } from 'react'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'
import ManagerIndividualPage from './pages/ManagerIndividualPage'

const App = () => {
  const [pageNum, setPageNum] = useState(0)
  const [employeeData, setEmployeeData] = useState({})
  const [subordinateData, setSubordinateData] = useState({})
  console.log(pageNum)

  if (pageNum === 0) {
    return <Login pageUpdater={setPageNum} employeeDataUpdater={setEmployeeData}/>
  } else if (pageNum === 1) {
    return <EmployeePage pageUpdater={setPageNum} employeeData={employeeData} employeeDataUpdater={setEmployeeData}/>
  } else if (pageNum === 2) {
    return <ManagerPage pageUpdater={setPageNum} employeeData={employeeData} employeeDataUpdater={setEmployeeData} subordinateUpdater={setSubordinateData}/>
  } else if (pageNum === 3) {
    return <ManagerIndividualPage pageUpdater={setPageNum} employeeData={employeeData} subordinateData={subordinateData}/>
  }
}

export default App
