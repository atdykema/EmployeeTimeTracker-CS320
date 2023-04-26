import axios from 'axios'

const baseURL = 'http://localhost:5001'

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
    throw e
  }
}

const sendTimeData = (employeeId, companyId, times) => {
  try {
    return axios.post(`${baseURL}/user/addTime`, {
      employeeId, companyId, times // employeeID company id, times (array of objs {"date" YYYY-MM-DD, "hoursWorked"})
    })
  } catch (e) {
    console.log('Error: Unable to get sendTimeData')
    console.log(e)
    throw e
  }
}

const getTimeData = (employeeId, companyId, timeOption) => {
  try {
    return axios.post(`${baseURL}/user/time`, {
      employeeId, companyId, timeOption
    })
  } catch (e) {
    // console.log('Error: Unable to get getTimeData')
    // console.log(e)
    console.log('Error: Unable to get getTimeData')
    throw e
  }
}

const methods = { validateLogin, getManagerViewData, sendTimeData, getTimeData } // Recent React needs this to be a separate obj

export default methods
