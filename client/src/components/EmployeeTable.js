import './EmployeeTable.css'
import { useNavigate } from 'react-router-dom'

const EmployeeTable = ({ employeeObjs, selectionUpdater }) => {
  const navigator = useNavigate()
  const handleRowClick = (employeeObj) => (e) => {
    selectionUpdater(employeeObj)
    navigator('/manager/view/id')
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
