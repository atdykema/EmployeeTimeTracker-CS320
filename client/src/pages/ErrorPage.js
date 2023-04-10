import './ErrorPage.css'
import { useNavigate } from 'react-router-dom'
import logo from './dancing-gopher.gif'

const ErrorPage = () => {
  const navigator = useNavigate()
  return (
    <div className="error-container">
      <div className="error-words">
        Whoops!
      </div>
      <img className = 'secret-gopher' src={logo} alt='gopher'></img>
      <div className="error-words">
        Page requested is not found.
      </div>
      <div className='back-button' onClick={() => navigator('/')}>Back to safety</div>
    </div>
  )
}

export default ErrorPage
