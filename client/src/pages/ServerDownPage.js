import './ServerDownPage.css'
import logo from './dancing-gopher.gif'

const ServerDownPage = () => {
  return (
    <div className="error-container">
      <div className="error-words">
        Sorry! Looks like our servers are down.
      </div>
      <img className = 'secret-gopher' src={logo} alt='gopher'></img>
      <div className="error-words">
        Please try again later
      </div>
    </div>
  )
}

export default ServerDownPage
