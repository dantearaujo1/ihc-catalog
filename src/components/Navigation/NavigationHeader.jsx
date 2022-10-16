import "./NavigationHeader.css"

function NavigationHeader() {

  return (
    <div className="nav-container">
      <div className="nav-items">
        <div className="nav-title">
          <h1>TIHCI</h1>
        </div>
        <div className="nav-right-container">
          <div className="search-container">
            <input type="text" id="instrument" name="instrument" placeholder="Buscar" />
          </div>
          <div className="adm-container">
            <h3><a href="#">Admin</a></h3>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationHeader
