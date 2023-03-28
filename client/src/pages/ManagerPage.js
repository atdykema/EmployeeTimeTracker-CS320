import { useState } from 'react'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeSearch from '../components/EmployeeSearch'
import requests from '../services/requests'

const testData = [{ firstName: "tamo", lastName: "g", pay: 33, id: 0 }, { firstName: "pacsi", lastName: "a", pay: 88, id: 2}, { firstName: "ramon", lastName: "f", pay: 23, id: 23}];
const Managerpage = ({ employeeData }) => {
  console.log(employeeData)

  const merger = async () => 
{
  let e = await requests.getManagerViewData(
        employeeData.employeeId,
        employeeData.companyName,
        employeeData.isManager
    )

  return e
  }

  // console.log(merger().then(e => e))

  // return <div>Hellow world </div>

  return <div>
  <EmployeeSearch/>
      <EmployeeTable employeeObjs={merger()}/>
    </div>
    // .then(e =>
    //   {
    //   // console.log(e)
    //   // console.log(e.data.value)
    //   return <div>
    //     Hello World
    //     {/* <EmployeeSearch/>
    //     <EmployeeTable employeeObjs={e.data.value}/> */}
    //     {/* Hello World */}
    //   </div>
    //   }
    // )

  // console.log(result)



  // console.log("dead")

}

export default Managerpage;