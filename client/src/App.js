import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'
import ManagerIndividualPage from './pages/ManagerIndividualPage'
import ErrorPage from './pages/ErrorPage'

const App = () => {
  const [employeeData, setEmployeeData] = useState({})
  const [subordinateData, setSubordinateData] = useState({})
  // errorElement={ErrorPage}
  return (
    <Routes>
      <Route path='/' element={<Login employeeDataUpdater={setEmployeeData}/>}/>
      <Route path='/time' element={<EmployeePage employeeData={employeeData} employeeDataUpdater={setEmployeeData}/>}/>
      <Route path='/manager/view' element={<ManagerPage employeeData={employeeData} employeeDataUpdater={setEmployeeData} subordinateUpdater={setSubordinateData}/>}/>
      <Route path='/manager/view/id' element={<ManagerIndividualPage employeeData={employeeData} subordinateData={subordinateData}/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default App
