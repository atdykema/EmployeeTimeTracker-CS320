import { useState } from 'react'
import Login from './pages/Login'
import EmployeePage from './pages/EmployeePage'


const App = () => {
  const [pageNum, setPageNum] = useState(0)
  console.log(pageNum)

  if (pageNum === 0) {
    return <Login pageUpdater={setPageNum}/>
  } else if (pageNum === 1) {
    return <EmployeePage/>
  } else {
    return <div>Error</div>
  }
}

export default App;
