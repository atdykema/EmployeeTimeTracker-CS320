const EmployeeTable = ({ employeeObjs }) => {
  return <div>
    <table>
      <tbody>
      {
        employeeObjs.map(employeeObj => {
          return <tr key={employeeObj.id}>
            <th>
              {employeeObj.firstName}
            </th>
            <th>
              {employeeObj.lastName}
            </th>
            <th>
              {employeeObj.pay}
            </th>
          </tr>
        })
      }
      </tbody>
    </table>
  </div>
}

export default EmployeeTable;