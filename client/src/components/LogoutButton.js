import './LogoutButton.css'
import { useCookies } from 'react-cookie'

const LogoutButton = ({ pageUpdater, employeeDataUpdater }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'data', 'subData'])
  const logout = (event) => {
    removeCookie('user')
    removeCookie('data')
    removeCookie('subData')
    pageUpdater(0)
    employeeDataUpdater({})
    console.log('logout')
  }

  return <div className='Button'>
   <button className='logout-button' onClick={logout}>Logout</button>
  </div>
}

export default LogoutButton
