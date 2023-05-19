import './LogoutButton.css'
import { useNavigate } from 'react-router-dom'
import requests from '../services/requests'

const LogoutButton = ({ employeeData, cookieReset }) => {
  const navigator = useNavigate()
  const logout = (event) => {
    let resp
    try {
      resp = requests.deleteToken(employeeData.employeeId, employeeData.companyId, employeeData.token)
    } catch (err) {
      console.log(err)
      if (err.message === 'Network Error') {
        // reroute to an error page saying that the server is down
        navigator('/serverdown')
      }
    }
    console.log(resp)
    cookieReset('data', { path: '/' })
    cookieReset('token', { path: '/' })
    navigator('/')
    console.log('logout')
  }

  return <div className='Button'>
   <div className='logout-button' onClick={logout}>Logout</div>
  </div>
}

export default LogoutButton
