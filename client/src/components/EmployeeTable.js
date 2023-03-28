const EmployeeTable = ({ employeeObjs }) => {
  console.log("Table")
  console.log(employeeObjs);
  employeeObjs.then(

  )
  return <div>
    <table>
      <tbody>
      {
        employeeObjs.map(employeeObj => {
          return <tr key={employeeObj.employeeId}>
            <th>
              {employeeObj.firstName}
            </th>
            <th>
              {employeeObj.lastName}
            </th>
            <th>
              {"15"}
            </th>
          </tr>
        })
      }
      </tbody>
    </table>
  </div>
}

export default EmployeeTable;