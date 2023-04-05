import './LogoutButton.css'

const LogoutButton = ({ pageUpdater, employeeDataUpdater }) => {
  const logout = (event) => {
    pageUpdater(0)
    employeeDataUpdater({})
    console.log('logout')
  }

  return <div className='Button'>
   <button className='logout-button' onClick={logout}>Logout</button>
  </div>
}

export default LogoutButton
