import axios from 'axios'

const baseURL = 'http://localhost:5000'

const validateLogin = (username, password) => {
  const promise = axios.post(`${baseURL}/user/get`, {
    username, password
  })

  return promise
}

const getManagerViewData = (employeeId, companyName, isManager) => {
  try {
    return axios.post(`${baseURL}/user/manage`, {
      employeeId, companyName, isManager
    })
  } catch (e) {
    console.log('Error: Unable to get managerViewData')
    console.log(e)
    return e
  }
}

const methods = { validateLogin, getManagerViewData } // Recent React needs this to be a separate obj

export default methods
