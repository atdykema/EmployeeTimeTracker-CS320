import './LogoutButton.css'
import { useNavigate } from 'react-router-dom'

const LogoutButton = ({ pageUpdater, employeeDataUpdater }) => {
  const navigator = useNavigate()
  const logout = (event) => {
    navigator('/')
    employeeDataUpdater({})
    console.log('logout')
  }

  return <div className='Button'>
   <button className='logout-button' onClick={logout}>Logout</button>
  </div>
}

export default LogoutButton
