
import './EmployeeTable.css'
import { useNavigate } from 'react-router-dom'

const EmployeeTable = ({ employeeObjs, selectionUpdater }) => {
  const navigator = useNavigate()
  const handleRowClick = (employeeObj) => (e) => {
    selectionUpdater('subData', employeeObj, { path: '/', expires: new Date(Date.now() + 50000000) })
    navigator('/manager/view/id')
  }
  // the slice is to make a copy, since sort is in place
  const sortedEmployees = employeeObjs.slice().sort((e1, e2) => e1.employeeId - e2.employeeId)
  console.log(sortedEmployees)

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
          sortedEmployees.map(employeeObj => {
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
