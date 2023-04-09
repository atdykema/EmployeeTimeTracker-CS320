import './NavigationTab.css'
import { useNavigate } from 'react-router-dom'

const NavigationTab = () => {
  const navigator = useNavigate()
  const onHome = (e) => {
    navigator('/time')
  }

  const onManager = (e) => {
    navigator('/manager/view')
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
