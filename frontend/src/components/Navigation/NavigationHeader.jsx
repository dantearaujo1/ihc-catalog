import "./NavigationHeader.css"
import {Link} from 'react-router-dom'

function NavigationHeader({Filter}) {


  return (
    <div className="nav-container">
      <div className="nav-items">
        <div className="nav-title">
          <h1>TIHCI</h1>
        </div>
        <div className="nav-right-container">
          <div className="search-container">
            <input type="text"
              id="instrument"
              name="instrument"
              placeholder="Buscar"
              onChange={(e) =>Filter(e.target.value)}
            />
          </div>
          <div className="adm-container">
            <Link to="/dboard_admin">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationHeader
