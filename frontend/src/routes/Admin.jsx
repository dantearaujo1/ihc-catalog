import React from 'react';
import {Link} from 'react-router-dom';
import NavigationHeader from '../components/Navigation/NavigationHeader'


function Admin() {

  return(
    <div>
      <NavigationHeader></NavigationHeader>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Admin
