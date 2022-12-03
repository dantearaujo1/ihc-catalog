import React from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
    <Stack style={{ height: "100vh" }}>
      <NavigationHeader />
      <NavigationBar categories={cat} subcategories={sub} />
      <Stack
        direction="row"
        width="80%"
        minHeight="60vh"
        alignItems="center"
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
            variant="h6"
            sx={{ marginTop: 4 }}
            color="text.secondary"
          >
            Combine categories and find the best UX Evaluation Methods for your project
          </Typography>
        </Stack>
        <Image width="auto" height="auto" sx={{marginTop: 10}} src="../../header-teal.png"/>
      </Stack>
      <Stack mb={1} sx={{ alignItems: "center", marginTop: 4 }}>
        { ( selections.length > 0 ) ?
          <IHCButtonRounded
          variant="contained"
          sx={{ minWidth: 160, minHeight: "3rem", width: 300, height: 80 }}
          startIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          onClick={handleClick}
        >
          <Typography variant="buttonMedium">Search</Typography>
        </IHCButtonRounded>
        :null
        }
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ width: '100%', flexWrap: "wrap", alignItems: "center", marginBottom: 10, paddingLeft: 14, paddingRight: 14 }}
      >
        {cat ? cat.map((value) => {
          return (
            <TagSelect key={value._id} handler={handleFilterCategory} data={(sub) ? sub.filter((obj) => { return (value._id === obj.categoryID) ? obj : null }) : []} cat={value}></TagSelect>
          )
        })
          : null
        }
      </Stack>
      <Stack
        direction="row"
        width="80%"
        alignItems="center"
        justifyContent="space-around"
        sx={{ m: "auto", mb:13 }}
      >
        <MultiActionAreaCard link="/about"></MultiActionAreaCard>
        <MultiActionAreaCard link="/tutorial" img={"/about-teal.png"} title={"Know more"}  content={"If you want to know who build the website, who did the UI Design, this is the best place to find us! Check it Out"}></MultiActionAreaCard>
      </Stack>
      <InstrumentAddModal></InstrumentAddModal>
      <Stack height="100%">
        <IHCFooter></IHCFooter>
      </Stack>
    </Stack>

  );
}

export default Home;
