import { useState } from 'react';
import './Login.css';
import logo from './punchtime.png';

const Login = ({ pageUpdater }) => {
  const [usernameText, setUsername] = useState('yourUsername')
  const [passwordText, setPassword] = useState('yourPassword')
  
  const submit = (event) => {
    event.preventDefault()
    console.log(`${usernameText} | ${passwordText}`)
    pageUpdater(1) // this should be validated remove later
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
          <div className="transparent-box">
              <form onSubmit={submit}>
                <input id='Inputs' value={usernameText} placeholder = 'Email Address' onChange={handleUsernameChange}/><br/>
                <input id='Inputs' value={passwordText} placeholder = 'Password' onChange={handlePasswordChange}/><br/>
                <button className='loginBut' id='Inputs' type="submit">Login</button>
              </form>
          </div>
      </div>
    </div>
}

export default Login;
