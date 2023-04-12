import './LogoutButton.css'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const LogoutButton = ({ employeeDataUpdater, cookieReset }) => {
  const navigator = useNavigate()
  const logout = (event) => {
    cookieReset('data', { path: '/' })
    navigator('/')
    console.log('logout')
  }

  return <div className='Button'>
   <div className='logout-button' onClick={logout}>Logout</div>
  </div>
}

export default LogoutButton
