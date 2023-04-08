import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'
import ManagerIndividualPage from './pages/ManagerIndividualPage'

const App = () => {
  const [employeeData, setEmployeeData] = useState({})
  const [subordinateData, setSubordinateData] = useState({})

  return (
    <Routes>
      <Route exact path='/' element={<Login employeeDataUpdater={setEmployeeData}/>} />
      <Route exact path='/time' element={<EmployeePage employeeData={employeeData} employeeDataUpdater={setEmployeeData}/>}/>
      <Route exact path='/manager/view' element={<ManagerPage employeeData={employeeData} employeeDataUpdater={setEmployeeData} subordinateUpdater={setSubordinateData}/>}/>
      <Route exact path='/manager/view/id' element={<ManagerIndividualPage employeeData={employeeData} subordinateData={subordinateData}/>}/>
    </Routes>
  )
}

export default App
