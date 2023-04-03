import './EmployeeTable.css'

const EmployeeTable = ({ employeeObjs }) => {
  // TODO: If employeeObjs is empty, because the useEffect
  //       hasn't been retrived, it will be empty at first.
  //       Possible may be able to use a sentinel value to
  //       indicate that it's not ready to render.
  return <div className='table-container'>
    <table>
      <tbody>
        <tr className='table-item' id='table-labels'>
          <th>ID</th>
          <th>E-Mail</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Payrate</th>
        </tr>
        {
          employeeObjs.map(employeeObj => {
            console.log(employeeObj)
            return <tr className='table-item' key={employeeObj.employeeId}>
              <th>
                {employeeObj.employeeId}
              </th>
              <th>
                {employeeObj.email}
              </th>
              <th>
                {employeeObj.firstName}
              </th>
              <th>
                {employeeObj.lastName}
              </th>
              <th>
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
