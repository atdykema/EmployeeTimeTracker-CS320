const EmployeeTable = ({ employeeObjs }) => {
  // TODO: If employeeObjs is empty, because the useEffect
  //       hasn't been retrived, it will be empty at first.
  //       Possible may be able to use a sentinel value to
  //       indicate that it's not ready to render.
  return <div>
    <table>
      <tbody>
      {
        employeeObjs.map(employeeObj => {
          console.log(employeeObj)
          return <tr key={employeeObj.employeeId}>
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
              {'$15.00'}
            </th>
          </tr>
        })
      }
      </tbody>
    </table>
  </div>
}

export default EmployeeTable
