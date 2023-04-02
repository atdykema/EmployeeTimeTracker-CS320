import { useState } from 'react'
import './Login.css'
import logo from './punchtime.png'
import requests from '../services/requests'

const Login = ({ pageUpdater, employeeDataUpdater }) => {
  const [usernameText, setUsername] = useState('')
  const [passwordText, setPassword] = useState('')
  const [invalidInput, setInvalidInput] = useState('')
  const [errorMessage, seterrorMessage] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    console.log(`${usernameText} | ${passwordText}`)

    //  if we do not add await, we will get a promise. If we add await, we will get the data
    // however, even if we get the data, the status code might still not be 200, so we need to check for that
    const promise = requests.validateLogin(usernameText, passwordText)
    promise.then((result) => {
      console.log('Promise fulfilled:', result)
      if (result.status === 200) {
        employeeDataUpdater(result.data.value)
        pageUpdater(1) // switch to employee page
      } else {
        // display an error
        setInvalidInput('Your username or password or both was incorrect')
        seterrorMessage(true)
        setUsername('')
        setPassword('')
      }
    }).catch((error) => {
      console.log('Promise rejected:', error)
      setInvalidInput('Your username or password or both was incorrect')
      seterrorMessage(true)
      setUsername('')
      setPassword('')
    })
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return <div className='outerContainer'>
      <div className='login-form'>
          <div ><img className = 'logo' src={logo} alt='Logo'></img></div>
          <h1 className='TEXT'>   PunchTime</h1>
          <div className={`transparent-box${errorMessage ? ' error' : ''}`}>
              <p className='error-message'>{invalidInput}</p>
              <form onSubmit={submit}>
                <input id='Inputs' value={usernameText} placeholder = 'Email Address' onChange={handleUsernameChange}/><br/>
                <input id='Inputs' value={passwordText} placeholder = 'Password' onChange={handlePasswordChange}/><br/>
                <button className='loginBut' id='Inputs' type="submit">Login</button>
              </form>
          </div>
      </div>
    </div>
}

export default Login
