import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Calendar = (startDate, setStartDate) => {
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  )
}

export default Calendar
