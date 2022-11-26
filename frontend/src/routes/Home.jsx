import React from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { IHCButtonRounded } from "../assets/ComponentStyle"

import NavigationHeader from "../components/Navigation/NavigationHeader";
import NavigationBar from "../components/Navigation/NavigationBar"
import InstrumentAddModal from "../components/Modals/InstrumentAdd"
import TagSelect from "../components/Filter/TagSelect.jsx";
import Image from "mui-image"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";


function Home() {
  const navigate = useNavigate();
  const [cat, setCat] = useState();
  const [sub, setSub] = useState();
  const [selections, setSelection] = useState([])

  const getCategories = async () => {
    const categories = await fetch('/api/v1/article/cat/all');
    const toJson = await categories.json();
    const ordered = toJson.sort((a, b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    })

    setCat(ordered);
  }

  const getSubcategories = async () => {
    const subcategories = await fetch('/api/v1/article/sub/all');
    const toJson = await subcategories.json();
    const ordered = toJson.sort((a, b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    })
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
  const handleClick = async () => {
    const result = await fetch('/api/v1/article/group/look', {
      headers: {
        'Accepts': 'application/json',
        'Content-Type': 'application/json',
      },
      method:"POST",
      body: JSON.stringify(selections),
    });
    const json = await result.json();
    console.log(json);
    navigate('/result', {state: { data: json }})
  }

  const handleFilterCategory = (value) => {
    let newArr = [...selections];
    let shouldCreateNew = true;
    newArr.map((obj) => {
      if (obj.category.id === value.category.id) {
        obj.category.selections = value.category.selections;
        shouldCreateNew = false;
      }
    })
    if (shouldCreateNew) {
      setSelection(prev => [...prev, value]);
    }
    else {
      setSelection(newArr);
    }
  }
  // useEffect(() => { console.log(selections) }, [selections]);

  return (
    <Box style={{ height: "100vh" }}>
      <NavigationHeader />
      <NavigationBar categories={cat} subcategories={sub} />

      <Stack
        direction="row"
        width="80%"
        alignItems="flex-end"
        justifyContent="space-around"
        sx={{ m: "auto" }}
      >
        <Stack
          justifyContent="center"
          width="65%"
          alignItems="center"
          sx={{ m: "auto" }}
        >
          <Typography
            variant="h1"
            color="text.primary"
            sx={{ marginTop: 10 }}
          >
            Find your UX Evaluation Instrument
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginTop: 4 }}
            color="text.secondary"
          >
            Combine categories and find the best UX Evaluation Methods for your project
          </Typography>
        </Stack>
        <Image sx={{marginTop: 10}} src="../../public/header-teal.png"/>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ width: '100', flexWrap: "wrap", alignItems: "center", marginTop: 10, paddingLeft: 14, paddingRight: 14 }}
      >
        {cat ? cat.map((value) => {
          return (
            <TagSelect key={value._id} handler={handleFilterCategory} data={(sub) ? sub.filter((obj) => { return (value._id === obj.categoryID) ? obj : null }) : []} cat={value}></TagSelect>
          )
        })
          : null
        }
      </Stack>
      <Stack sx={{ alignItems: "center", marginTop: 6 }}>
        <IHCButtonRounded
          variant="contained"
          sx={{ minWidth: 160, height: "3rem" }}
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          onClick={handleClick}
        >
          <Typography>Search</Typography>
        </IHCButtonRounded>
      </Stack>
      <Stack direction="row">
        {/* {selections && selections.map((categorys) => { */}
        {/*   return categorys.category.selections.map((options, index, array) => { */}
        {/*     return ( */}
        {/*       <Typography key={index} ml={1} mt={3} variant="h6" color="#ff0000"> */}
        {/*         {options.name} {(index + 1 < array.length) ? "OR" : (index + 1 > array.lenght) ? null : "|AND|"} */}
        {/*       </Typography> */}
        {/*     ) */}
        {/*   }) */}
        {/* })} */}
      </Stack>
      <InstrumentAddModal></InstrumentAddModal>
    </Box>

  );
}

export default Home;
