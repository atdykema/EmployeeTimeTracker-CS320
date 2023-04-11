import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'
import ManagerIndividualPage from './pages/ManagerIndividualPage'
import ServerDownPage from './pages/ServerDownPage'
import ErrorPage from './pages/ErrorPage'
import { useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['data', 'subData'])
  const [subordinateData, setSubordinateData] = useState({})

  return (
    <Routes>
      <Route path='/' element={<Login cookies = {cookies} cookieSetter = {setCookie}/>}/>
      <Route path='/time' element={<EmployeePage employeeData={cookies.data} employeeDataUpdater = {setCookie} cookieReset={removeCookie}/>}/>
      <Route path='/manager/view' element={<ManagerPage employeeData={cookies.data} employeeDataUpdater={setCookie} subordinateUpdater={setSubordinateData} cookieReset={removeCookie}/>}/>
      <Route path='/manager/view/id' element={<ManagerIndividualPage employeeData={cookies.data} employeeDataUpdater={setCookie} subordinateData={subordinateData} cookieReset={removeCookie}/>}/>
      <Route path='/serverdown' element={<ServerDownPage/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default App
