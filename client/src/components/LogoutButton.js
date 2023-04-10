import './LogoutButton.css'
import { useNavigate } from 'react-router-dom'

const LogoutButton = ({ employeeDataUpdater }) => {
  const navigator = useNavigate()
  const logout = (event) => {
    employeeDataUpdater('username', 'undefined', { path: '/', expires: new Date(Date.now() + 50000) })
    employeeDataUpdater('password', 'undefined', { path: '/', expires: new Date(Date.now() + 50000) })
    employeeDataUpdater('data', {}, { path: '/', expires: new Date(Date.now() + 50000) })
    navigator('/')
    console.log('logout')
  }

  return <div className='Button'>
   <button className='logout-button' onClick={logout}>Logout</button>
  </div>
}

export default LogoutButton
