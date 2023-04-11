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
   <div className='logout-button' onClick={logout}>Logout</div>
  </div>
}

export default LogoutButton
