import { useState } from 'react'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'
import ManagerPage from './pages/ManagerPage'


const App = () => {
  const [pageNum, setPageNum] = useState(0) //DREW FIX LATER
  console.log(pageNum)

  if (pageNum === 0) {
    return <Login pageUpdater={setPageNum}/>
  } else if (pageNum === 1) {
    return <EmployeePage pageUpdater={setPageNum}/>
  } else if (pageNum === 2) {
    return <ManagerPage/>
  }
}

export default App;
