const EmployeeSearch = ({ text, updateText }) => {
  // NOTE: This currently is always called when the
  //       textBox is updated: should maybe be
  //       restricted to the button but livesearch is
  //       also good
  const submit = async (event) => {
    event.preventDefault()
    console.log(`submitting: ${text}`)
  }

  const handleEmployeeNameChange = (event) => {
    updateText(event.target.value)
  }

  return <div>
    <form onSubmit={submit}>
      <input value = {text} placeholder = 'Enter the name of employee' onChange={handleEmployeeNameChange}/><br/>
      <button className='employee-search' type="submit">Submit</button>
    </form>
  </div>
}

export default EmployeeSearch
