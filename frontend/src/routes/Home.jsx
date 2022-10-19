import React from 'react';
import {Link} from 'react-router-dom';
import BodyFilter from '../components/BodyFilter/BodyFilter'
import NavigationHeader from '../components/Navigation/NavigationHeader'

import { useState, useEffect } from 'react'

function Home() {

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState('');
  const [data_filtered, setDataFiltered] = useState();

  // Getting data from the backend
  useEffect( ()=>{

    const fetch_data = async() => {
      const data = await fetch('/api/v1');
      const json = await data.json();
      // Setting data to data using useState
      setData(json.complete_detailed_list);
    }
    fetch_data().catch(console.error);

  }, [filtered]);

  // This will work as our searchBar filter
  useEffect( ()  => {
    // Check if search bar is not Empty
    if(filtered !== ""){
      //Setting our data_filtered to only contains what is
      // in the searchBox
      setDataFiltered(data.filter((article)=>{
        if(article.ux_instruments){
          return article.ux_instruments.toLowerCase().includes(filtered.toLowerCase());
        }
      }));
    }
    // if searchBar is empty we should set our full data to the list
    else{
      // checking if we already have some data
      if(data.lenght !== 0){
        setDataFiltered([]);
      }
    }
  }, [filtered] ); /* This last parameters means that we gonna call useEffect
                      Everytime that filtered is diferrent;
  */
  return(
    <div>
      <NavigationHeader Filter={setFiltered}>
      </NavigationHeader>
      <BodyFilter articles={data_filtered?data_filtered:data}>
      </BodyFilter>
    </div>
  );
}

export default Home
