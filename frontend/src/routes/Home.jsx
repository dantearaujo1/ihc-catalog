import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { IHCButtonRounded } from "../assets/ComponentStyle"

import NavigationHeader from "../components/Navigation/NavigationHeader";
import NavigationBar from "../components/Navigation/NavigationBar"
import InstrumentAddModal from "../components/Modals/InstrumentAdd"
import TagSelect from "../components/Filter/TagSelect.jsx";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";




function Home() {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState();
  const [sub, setSub] = useState();

  const [filtered, setFiltered] = useState("");
  const [data_filtered, setDataFiltered] = useState([]);
  const [filterItems, setFilterItems] = useState();

  // Getting data from the backend
  // WARN: we should use useQuery hook for this
  useEffect(() => {
    const fetch_data = async () => {
      let data = await fetch("/api/v1/article/");
      let json = await data.json();

      // Setting data to data using useState
      setData(json);

      data = await fetch('/api/v1/article/cat/all');
      json = await data.json();
      setCat(json);

      data = await fetch('/api/v1/article/sub/all');
      json = await data.json();
      setSub(json);

    };
    fetch_data().catch(console.error);
  }, []);

  // This will work as our searchBar filter
  useEffect(() => {
    // Check if search bar is not Empty
    if (filtered !== "") {
      //Setting our data_filtered to only contains what is
      // in the searchBox
      setDataFiltered(
        data.filter((article) => {
          if (article.ux_instruments) {
            console.log(filtered);
            return article.ux_instruments
              .toLowerCase()
              .includes(filtered.toLowerCase());
          }
        })
      );
    }
    // if searchBar is empty we should set our full data to the list
    else {
      // checking if we already have some data
      setDataFiltered([]);
    }
  }, [filtered]);
  /* This last parameters means that we gonna call useEffect
      Everytime that filtered is diferrent */
  const handleClick = () => {
    console.log("Clicked");
  }
  return (
    <Box style={{height:"100vh"}}>
      <NavigationHeader
        Filter={setFiltered}
        data={( data_filtered.length > 0 ) ? data_filtered : data }
        isAdmin={false}
      >
      </NavigationHeader>
      <NavigationBar></NavigationBar>
      <Stack
        justifyContent="center"
        width="100%"
        alignItems="center"
        sx={{ m: "auto"}}
      >
        <Typography
          variant="h1"
          color="text.primary"
          sx={{marginTop: 10 }}
        >
          UX Instruments Catalog
        </Typography>
        <Typography
          variant="h4"
          color="text.secondary"
        >
          Combine categories and find the best UX Evaluation Methods for your project
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ width: '100', flexWrap: "wrap",  alignItems: "center", marginTop: 10, paddingLeft: 14, paddingRight: 14  }}
      >
        {cat?cat.sort(((a,b) => { return b.name < a.name ? 1 : b.name > a.name ? -1 : 0}))
          .map((value) => {
            return (
              <TagSelect key={value._id} data={(sub)?sub.filter((obj) => {return (value._id === obj.categoryID)?obj:null}):[]} placeHolder={value.name}></TagSelect>
            )
          })
          :null
        }
      </Stack>
      <Stack sx={{ alignItems: "center", marginTop: 6 }}>
        <IHCButtonRounded
          variant="contained"
          sx={{  minWidth: 160, height: "3rem"}}
          startIcon={<FontAwesomeIcon  icon={faMagnifyingGlass} />}
          onClick={handleClick}
        >
          <Typography>Search</Typography>
        </IHCButtonRounded>
      </Stack>
      <InstrumentAddModal></InstrumentAddModal>
    </Box>

  );
}

export default Home;
