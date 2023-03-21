import { useState } from 'react'

const App = () => {
  const [pageNum, setPageNum] = useState(0)

  const [usernameText, setUsername] = useState('yourUsername')
  const [passwordText, setPassword] = useState('yourPassword')

  const submit = (event) => {
    event.preventDefault()
    console.log(`${usernameText} | ${passwordText}`)
    setPageNum(1) // this should be validated remove later
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  //---------------------------------------------------------------
  const [time, setTime] = useState(["-1","-1","-1","-1","-1","-1","-1"])

  const onHome = (e) => {
    console.log('employee home')
    setPageNum(1)
  }

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]

  const nums = [0,1,2,3,4,5,6]

  const handleTimeChange = (num) => (event) => {
    const timeCopy = [...time]
    timeCopy[num] = event.target.value    
    setTime(timeCopy)
  }

  const submitTime = (event) => {
    event.preventDefault()
    console.log(time)
  }

  if (pageNum === 0) {
    return <div>
    <h1>PunchTime</h1>
            <form onSubmit={submit}>
              <div>Username:</div>
              <input value={usernameText} onChange={handleUsernameChange}/><br/>
              <div>Password:</div>
              <input value={passwordText} onChange={handlePasswordChange}/><br/>
              <button type="submit">Login</button>
            </form>
         </div>

  } else if (pageNum === 1) {
    return <div>
      <div className='homebuttons'>
        <div className='homesingle' id='employee_home_single' onClick={onHome}>
          Employee Home
        </div>
        <div className='homesingle' id='manager_home_single'>
          Manny
        </div>
      </div>
      <div className='daybuttons_container'>
        <form onSubmit={submitTime}>
          {nums.map(num => <div>
            <div className='day-label'key={num} id={days[num]}>{days[num]}</div> 
            <br/> 
              <input value={time[num]} placeholder='Enter your time' onChange={handleTimeChange(num)}/>
              <br/>
          </div>)}
          <button type="submit">Submit</button>
        </form> 
      </div>
      <div className='date-info-container'>
        <div className='title'>Payment Histoy</div>
        <div className='timescale-container'>
          <div className='timescale-button' id='weekly'></div>
          <div className='timescale-button' id='monthly'></div>
          <div className='timescale-button' id='yearly'></div>
        </div>
        <div className='graph-container'>
          <div className='graph'>
            *graph goes here*
          </div>
        </div>
        
      </div>            
    </div>
    
  } else {
    return <div>Error</div>
  }
}

export default App;
