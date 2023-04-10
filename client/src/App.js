import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'
import ManagerIndividualPage from './pages/ManagerIndividualPage'
import ServerDownPage from './pages/ServerDownPage'
import ErrorPage from './pages/ErrorPage'
// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react'
import { Cookies, useCookies } from 'react-cookie'

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['username', 'password', 'data', 'subData'])
  const [subordinateData, setSubordinateData] = useState({})

  /*  The code inside the useEffect hook will run only once after the component mounts because an empty dependency array [] is passed as the second argument. Therefore, the setCookie function will always be called to set the username and password cookies to empty strings before the component is rendered. This means that the console.log statement inside the useEffect hook will always log the empty string values for username and password. */
  useEffect(() => {
    if (cookies.username === undefined && cookies.password === undefined) {
      setCookie('username', '', { path: '/', expires: new Date(Date.now() + 50000) })
      setCookie('password', '', { path: '/', expires: new Date(Date.now() + 50000) })
    }
    console.log(cookies.username, cookies.password)
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Login cookies = {cookies} cookieSetter = {setCookie}/>}/>
      <Route path='/time' element={<EmployeePage employeeData={cookies.data} employeeDataUpdater = {setCookie}/>}/>
      <Route path='/manager/view' element={<ManagerPage employeeData={cookies.data} employeeDataUpdater={setCookie} subordinateUpdater={setSubordinateData}/>}/>
      <Route path='/manager/view/id' element={<ManagerIndividualPage employeeData={cookies.data} employeeDataUpdater={setCookie} subordinateData={subordinateData}/>}/>
      <Route path='/serverdown' element={<ServerDownPage/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  )
}

export default App
