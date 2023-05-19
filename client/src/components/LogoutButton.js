import './LogoutButton.css'
import { useNavigate } from 'react-router-dom'
import requests from '../services/requests'

const LogoutButton = ({ cookies, cookieReset }) => {
  const navigator = useNavigate()

  const logout = async (event) => {
    // console.log(cookies.data.employeeId, cookies.data.companyId, cookies.token)
    try {
      console.log('Sending deleteToken request...')
      const resp = await requests.deleteToken(cookies.data.employeeId, cookies.data.companyId, cookies.token)
      console.log('deleteToken response:', resp)
    } catch (err) {
      console.error('deleteToken error:', err)
      if (err.message === 'Network Error') {
        navigator('/serverdown')
      }
    }
    // console.log(cookies.data)
    // console.log(cookies.data.employeeId, cookies.data.companyId, cookies.token)
    cookieReset('data', { path: '/' })
    cookieReset('token', { path: '/' })
    navigator('/')
    console.log('logout')
    // console.log(cookies.data.employeeId, cookies.data.companyId, cookies.token)
  }

  return <div className='Button'>
   <div className='logout-button' onClick={logout}>{}Logout</div>
  </div>
}

export default LogoutButton
