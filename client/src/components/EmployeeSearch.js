import { useState } from 'react'

const EmployeeSearch = () => {
  const [EmployeeName, setEmployeeName] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    console.log(`${EmployeeName}`)
  }

  const handleEmployeeNameChange = (event) => {
    setEmployeeName(event.target.value)
  }

  return <div>
    <form onSubmit={submit}>
      <input value = {EmployeeName} placeholder = 'Enter the name of employee' onChange={handleEmployeeNameChange}/><br/>
      <button className='employee-search' type="submit">Submit</button>
    </form>
  </div>
}

export default EmployeeSearch
