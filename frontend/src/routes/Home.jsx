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
  const [cat, setCat] = useState();
  const [sub, setSub] = useState();

  const getCategories = async () => {
    const categories = await fetch('/api/v1/article/cat/all');
    const toJson = await categories.json();
    const ordered = toJson.sort( (a,b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    } )

    setCat(ordered);
  }

  const getSubcategories = async () => {
    const subcategories = await fetch('/api/v1/article/sub/all');
    const toJson = await subcategories.json();
    const ordered = toJson.sort( (a,b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    } )
    setSub(ordered);
  }

  useEffect(() => {
    const fetch_data = async () => {
      await getCategories();
      await getSubcategories();

    };
    fetch_data().catch(console.error);
  }, []);

  /* This last parameters means that we gonna call useEffect
      Everytime that filtered is diferrent */
  const handleClick = () => {
    console.log("Clicked");
  }

  return (
    <Box style={{height:"100vh"}}>
      <NavigationHeader />
      <NavigationBar categories={cat} subcategories={sub}/>
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
        {cat?cat.map((value) => {
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
