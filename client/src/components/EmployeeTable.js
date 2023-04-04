import './EmployeeTable.css'

const EmployeeTable = ({ employeeObjs }) => {
  // TODO: If employeeObjs is empty, because the useEffect
  //       hasn't been retrived, it will be empty at first.
  //       Possible may be able to use a sentinel value to
  //       indicate that it's not ready to render.
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
            return <tr className='table-row' key={employeeObj.employeeId}>
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
