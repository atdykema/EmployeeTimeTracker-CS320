import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'
import ManagerIndividualPage from './pages/ManagerIndividualPage'
import ServerDownPage from './pages/ServerDownPage'
import ErrorPage from './pages/ErrorPage'

const App = () => {
  const [employeeData, setEmployeeData] = useState({})
  const [subordinateData, setSubordinateData] = useState({})
  return (
    <Routes>
      <Route path='/' element={<Login employeeDataUpdater={setEmployeeData}/>}/>
      <Route path='/time' element={<EmployeePage employeeData={employeeData} employeeDataUpdater={setEmployeeData}/>}/>
      <Route path='/manager/view' element={<ManagerPage employeeData={employeeData} employeeDataUpdater={setEmployeeData} subordinateUpdater={setSubordinateData}/>}/>
      <Route path='/manager/view/id' element={<ManagerIndividualPage employeeData={employeeData} employeeDataUpdater={setEmployeeData} subordinateData={subordinateData}/>}/>
      <Route path='/serverdown' element={<ServerDownPage/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default App
