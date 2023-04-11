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
   <button className='logout-button' onClick={logout}>Logout</button>
  </div>
}

export default LogoutButton
