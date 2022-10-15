import './BodyFilter.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function CategoryFilter(props){
  return (
    <select id="public" name="public" size="1">
      <option value="" disabled selected hidden>{props.placeholder}</option>
      <option value="">Velho</option>
      <option value="">Criança</option>
      <option value="">Jornalistas</option>
    </select>
  )
}
function BodyFilter() {

  return (
    <div className="body-container">
      <div className="title-container">
        <h1>This is Human Computer Interaction - TIHCI</h1>
        <h3>Find the better Instrument for you project</h3>
      </div>
      <div className="filter-container">
        <div className="filter-category">
          <CategoryFilter placeholder="Target"></CategoryFilter>
          <CategoryFilter placeholder="Approach"></CategoryFilter>
          <CategoryFilter placeholder="Quality UX"></CategoryFilter>
          <CategoryFilter placeholder="Type"></CategoryFilter>
          <CategoryFilter placeholder="Domain"></CategoryFilter>
        </div>
      </div>
      <div className="filter-buttons">
        <button>
          <div>
            <FontAwesomeIcon icon={ faFilter }/>
            <p>Filter</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default BodyFilter
