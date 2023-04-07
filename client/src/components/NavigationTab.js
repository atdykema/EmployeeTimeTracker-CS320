import './NavigationTab.css'
import { useCookies } from 'react-cookie'

const NavigationTab = ({ pageUpdater }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'data'])

  const onHome = () => {
    setCookie('user', 1, { path: '/', expires: new Date(Date.now() + 50000) })
    setCookie('data', cookies.data, { path: '/', expires: new Date(Date.now() + 50000) })
  }

  const onManager = () => {
    setCookie('user', 2, { path: '/', expires: new Date(Date.now() + 50000) })
    setCookie('data', cookies.data, { path: '/', expires: new Date(Date.now() + 50000) })
  }

  return <div className='home-buttons'>
    <div className='home-single' id='employee_home_single' onClick={onHome}>
      Employee Home
    </div>
    <div className='home-single' id='manager_home_single' onClick={onManager}>
      Manager Home
    </div>
  </div>
}

export default NavigationTab
