import './EmployeeTable.css'
import { useCookies } from 'react-cookie'

const EmployeeTable = ({ employeeObjs, selectionUpdater, pageUpdater }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'data', 'subData'])
  const handleRowClick = (employeeObj) => (e) => {
    setCookie('user', 3, { path: '/', expires: new Date(Date.now() + 50000) })
    setCookie('data', cookies.data, { path: '/', expires: new Date(Date.now() + 50000) })
    setCookie('subData', employeeObj, { path: '/', expires: new Date(Date.now() + 50000) })
    selectionUpdater(employeeObj)
    // pageUpdater(3)
  }

  return <div className='table-container'>
    <table>
      <tbody>
        <tr className='table-top-row' id='table-labels'>
          <th>ID</th>
          <th>E-Mail</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Payrate</th>
        </tr>
        {
          employeeObjs.map(employeeObj => {
            console.log(employeeObj)
            return <tr className='table-row' key={employeeObj.employeeId} onClick={handleRowClick(employeeObj)}>
              <th className='table-item'>
                {employeeObj.employeeId}
              </th>
              <th className='table-item'>
                {employeeObj.email}
              </th>
              <th className='table-item'>
                {employeeObj.firstName}
              </th>
              <th className='table-item'>
                {employeeObj.lastName}
              </th>
              <th className='table-item'>
                {`$${Math.floor(Math.random() * (150 - 20 + 1)) + 20}`}
              </th>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}

export default EmployeeTable
