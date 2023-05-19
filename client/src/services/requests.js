import axios from 'axios'

const baseURL = 'http://localhost:5000'

const getEmployee = async (employeeId, subordinateId, companyId, token) => {
  try {
    return axios.post(`${baseURL}/employeeGet`, {
      employeeId, subordinateId, companyId, token
    })
  } catch (e) {
    console.log(`Error detected: ${e}`)
    throw e
  }
}

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

const getManagerViewData = (employeeId, companyId, companyName, isManager, token) => {
  try {
    return axios.post(`${baseURL}/user/manage`, {
      employeeId, companyId, companyName, isManager, token
    })
  } catch (e) {
    console.log('Error: Unable to get managerViewData')
    console.log(e)
    throw e
  }
}

const sendTimeData = (employeeId, companyId, times, token) => {
  try {
    return axios.post(`${baseURL}/user/addTime`, {
      employeeId, companyId, times, token // employeeID company id, times (array of objs {"date" YYYY-MM-DD, "hoursWorked"})
    })
  } catch (e) {
    console.log('Error: Unable to get sendTimeData')
    console.log(e)
    throw e
  }
}

const getTimeData = (employeeId, subordinateId, companyId, token, timeOption) => {
  try {
    return axios.post(`${baseURL}/user/time`, {
      employeeId, subordinateId, companyId, timeOption, token
    })
  } catch (e) {
    // console.log('Error: Unable to get getTimeData')
    // console.log(e)
    console.log('Error: Unable to get getTimeData')
    throw e
  }
}

const getAllTime = (employeeId, subordinateId, companyId, token) => {
  try {
    return axios.post(`${baseURL}/user/time`, {
      employeeId, subordinateId, companyId, timeOption: '', token
    })
  } catch (e) {
    console.log('Error: Unable to get getAllTime')
    console.log(e)
    return e
  }
}

const getAggregateData = (employeeId, companyId, companyName, isManager, timeOption, token) => {
  try {
    return axios.post(`${baseURL}/aggregateData`, {
      employeeId, companyId, companyName, isManager, timeOption, token
    })
  } catch (e) {
    // console.log('Error: Unable to get getTimeData')
    // console.log(e)
    console.log('Error: Unable to get getTimeData')
    throw e
  }
}

const getAllAggregate = (employeeId, companyId, companyName, isManager, token) => {
  try {
    return axios.post(`${baseURL}/aggregateData`, {
      employeeId, companyId, companyName, isManager, timeOption: '', token
    })
  } catch (e) {
    console.log('Error: Unable to get getAllTime')
    console.log(e)
    return e
  }
}

const deleteToken = async (employeeId, companyId, token) => {
  try {
    // console.log('deleteToken')
    return axios.post(`${baseURL}/logout`, {
      employeeId, companyId, token
    })
  } catch (e) {
    console.log(`Error detected: ${e}`)
    throw e
  }
}

const methods = { validateLogin, getEmployee, getManagerViewData, sendTimeData, getTimeData, getAllTime, getAggregateData, deleteToken, getAllAggregate } // Recent React needs this to be a separate obj

export default methods
