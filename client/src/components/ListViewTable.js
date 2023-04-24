
import './ListViewTable.css'
/* import { useNavigate } from 'react-router-dom' */

const ListViewTable = ({ dayObjs /*,  selectionUpdater */ }) => {
  /*
  const navigator = useNavigate()

  const handleRowClick = (employeeObj) => (e) => {
    selectionUpdater('subData', employeeObj, { path: '/', expires: new Date(Date.now() + 50000000) })
    navigator('/manager/view/id')
  }
  */

  return <div className='table-container-list'>
    <table>
      <tbody>
        <tr className='table-top-row' id='table-labels'>
          <th>Date</th>
          <th>Hours worked</th>
        </tr>
        {
          dayObjs.map(dayObjs => {
            console.log(dayObjs)
            return <tr className='table-row' key={dayObjs.date} /* onClick={handleRowClick(employeeObj)} */>
              <th className='table-item'>
                {dayObjs.date}
              </th>
              <th className='table-item'>
                {dayObjs.hoursWorked}
              </th>
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}

export default ListViewTable
