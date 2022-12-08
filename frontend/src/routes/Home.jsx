import React from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { IHCButtonRounded } from "../assets/ComponentStyle"

import NavigationHeader from "../components/Navigation/NavigationHeader";
import NavigationBar from "../components/Navigation/NavigationBar"
import MultiActionAreaCard from "../components/PageCard"
import IHCFooter from "../components/Navigation/Footer"
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
    navigate('/result', {state: { data: json, lookedFor: selections }})
  }

  const handleFilterCategory = (value , del) => {
    if(del){
      let newArr = [...selections];
      let shouldCreateNew = true;
      newArr.map((obj, idx) => {
        if (obj.category.id === value.category.id) {
          obj.category.selections = value.category.selections;
          if(value.category.selections.length === 0){
            newArr.splice(idx,1);
          }
          shouldCreateNew = false;
        }
      })
      if (shouldCreateNew){
        setSelection(prev =>[...prev, value])
        console.log(value);
        return
      }
      setSelection(newArr);
        console.log(newArr);
      return
    }
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

  return (
    <Stack style={{ minHeight: "100vh" }}>
      <NavigationHeader />
      <NavigationBar categories={cat} subcategories={sub} />
      <Stack
        justifyContent='center'
        alignItems='center'
        mt={2}
        mb={2}
        sx={{ width: '100%', minHeight: "350px" }}
      >
        {/* <Stack direction='row' flexWrap='wrap' width='70%' justifyContent='center' height='100%' gap={2.5}> */}
        <Grid width="80%" container alignItems="center" justifyContent="center" columnGap={2} rowGap={4}>

          {cat ? cat.map((value, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.5}>
                <TagSelect key={value._id} handler={handleFilterCategory} data={(sub) ? sub.filter((obj) => { return (value._id === obj.categoryID) ? obj : null }) : []} cat={value}></TagSelect>
              </Grid>
            )
          })
            : null
          }
        {/* </Stack> */}
        </Grid>
      </Stack>
      <Stack width='100%'  sx={{minHeight:70}} alignItems='center' justifyContent='center'>
        {/* { ( selections.length > 0 ) ? */}
          <IHCButtonRounded
          variant="contained"
          sx={{width:'20%' ,  height:'auto', minHeight:50}}
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} beatFade  />}
          onClick={handleClick}
        >
          <Typography variant="buttonMedium">Search</Typography>
        </IHCButtonRounded>
        {/* :null */}
        {/* } */}
      </Stack>
      <Stack
        direction="row"
        width="80%"
        minHeight="50vh"
        alignItems="center"
        justifyContent="space-around"
        sx={{ m: "auto" }}
      >
        <Stack
          justifyContent="center"
          width="65%"
          alignItems="center"
          spacing={4}
          sx={{ m: "auto" }}
        >
          <Typography
            variant="h1"
            color="text.primary"
          >
            Find your UX Evaluation Instrument
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
          >
            Combine categories and find the best UX Evaluation Methods for your project
          </Typography>
        </Stack>
        <Image width="auto" height="auto" src="../../header-teal.png"/>
      </Stack>
      <Stack
        direction="row"
        width="80%"
        alignItems="center"
        justifyContent="space-around"
        pt={4}
        pb={4}
        sx={{ m: "auto"}}
      >
        <MultiActionAreaCard showImg link="/tutorial"/>
        <MultiActionAreaCard showImg link="/about" img={"/about-teal.png"} title={"Know more"}  content={"If you want to know who build the website, who did the UI Design, this is the best place to find us! Check it Out"}/>
      </Stack>
      <InstrumentAddModal></InstrumentAddModal>
      <Stack height="100%">
        <IHCFooter></IHCFooter>
      </Stack>
    </Stack>

  );
}

export default Home;
