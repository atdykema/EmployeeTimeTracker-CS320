import axios from 'axios'

const baseURL = 'http://localhost:5000'

const validateLogin = async (username, password) => {
  try {
    return axios.post(`${baseURL}/login`, {

      username, password
    })
  } catch (e) {
    console.log(`Error detected: ${e}`)
    throw e
  }
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
