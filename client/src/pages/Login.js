import { useState } from 'react';
import './Login.css';
import logo from './punchtime.png';
import axios from 'axios'

const Login = ({ pageUpdater }) => {
  const [usernameText, setUsername] = useState('')
  const [passwordText, setPassword] = useState('')
  
  const submit = async (event) => {
    event.preventDefault()
    console.log(`${usernameText} | ${passwordText}`)
    
    let result;
    try{
      result = await axios.post("http://localhost:3000/user/get", {
        username: usernameText,
        password: passwordText,
      });
    }catch(e){
      console.log(e)
      result = e
    }

    console.log(result)

    if(result.status === 0){
      pageUpdater(1) // this should be validated remove later
    }else{
      //throw an error
    }
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
