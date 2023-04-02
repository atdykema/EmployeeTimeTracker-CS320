import './NavigationTab.css'

const NavigationTab = ({ pageUpdater }) => {
  const onHome = (e) => {
    pageUpdater(1)
  }

  const onManager = (e) => {
    pageUpdater(2)
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
