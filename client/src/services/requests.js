import axios from 'axios'

const baseURL = "http://localhost:3000"

const validateLogin = async (username, password) => {
  try{
    return await axios.post(`${baseURL}/user/get`, {
      username: username,
      password: password
    })
  } catch(e){
    return e
  }
}

const methods = {validateLogin: validateLogin} // Recent React needs this to be a separate obj

export default methods;
