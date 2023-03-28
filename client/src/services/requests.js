import axios from 'axios'

const baseURL = "http://localhost:5000"

const validateLogin = (username, password) => {
  try{
    return axios.post(`${baseURL}/user/get`, {
      username: username,
      password: password
    })
  } catch(e){
    return e
  }
}

const methods = {validateLogin: validateLogin} // Recent React needs this to be a separate obj

export default methods;
