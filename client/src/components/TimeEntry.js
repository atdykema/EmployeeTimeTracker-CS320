import "./TimeEntry.css"

const TimeEntry = ({ num, day, time, timeUpdater }) => {
  return <div className="day-container">
           <br/>
           <div className='day-label' id={day}>{day}</div> 
           <input value={time[num]} placeholder='Enter your time' onChange={timeUpdater(num)}/>
           <br/>
         </div>
}

export default TimeEntry;