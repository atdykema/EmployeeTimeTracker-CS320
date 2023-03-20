import { useState } from 'react'

const App = () => {
  const [usernameText, setUsername] = useState('yourUsername')
  const [passwordText, setPassword] = useState('yourPassword')

  const submit = (event) => {
    event.preventDefault()
    console.log(`${usernameText} | ${passwordText}`)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return <div>
            <h1>Login page</h1>
            <form onSubmit={submit}>
              <div>Username:</div>
              <input value={usernameText} onChange={handleUsernameChange}/><br/>
              <div>Password:</div>
              <input value={passwordText} onChange={handlePasswordChange}/><br/>
              <button type="submit">Login</button>
            </form>
         </div>

}

export default App;
