import { useState } from 'react'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'
import ManagerIndividualPage from './pages/ManagerIndividualPage'
import { useCookies } from 'react-cookie'

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['user', 'data', 'subData'])
  const [pageNum, setPageNum] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [employeeData, setEmployeeData] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [subordinateData, setSubordinateData] = useState({})
  console.log(pageNum)
  console.log(cookies.subData)

  if (Number(cookies.user) >= 1) {
    if (Number(cookies.user) === 1) {
      return <EmployeePage pageUpdater={Number(cookies.user)} employeeData={cookies.data} />
    } else if (Number(cookies.user) === 2) {
      return <ManagerPage pageUpdater={Number(cookies.user)} employeeData={cookies.data} subordinateUpdater={setSubordinateData} />
    } else if (Number(cookies.user) === 3) {
      console.log('test')
      return <ManagerIndividualPage pageUpdater={Number(cookies.user)} employeeData={cookies.data} subordinateData={cookies.subData}/>
    }
  } else {
    return <Login pageUpdater={setPageNum} employeeDataUpdater={setEmployeeData} />
  }
}

export default App
