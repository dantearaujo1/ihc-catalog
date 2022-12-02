import React from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { IHCButtonRounded } from "../assets/ComponentStyle"

import NavigationHeader from "../components/Navigation/NavigationHeader";
import NavigationBar from "../components/Navigation/NavigationBar"
import IHCFooter from "../components/Navigation/Footer"
import Image from "mui-image"



import { useState, useEffect } from "react";


function Tutorial() {
  const navigate = useNavigate();
  const [cat, setCat] = useState();
  const [sub, setSub] = useState();

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


  return (
    <Stack style={{ height: "100vh" }}>
      <NavigationHeader />
      <NavigationBar categories={cat} subcategories={sub} />
      <Stack  alignItems="center" sx={{ alignItems: "center", marginTop: 16 }}>
        <Typography variant="h1"> How to use our Application </Typography>
        <Stack direction="row" spacing={8} ml={19} mr={19} mb={8} alignItems="center" justifyContent="space-between">
          <Image width="50%" src='../../header-teal.png'></Image>
          <Stack width="50%">
            <Typography variant="h3"> Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={8} ml={19} mr={19} mb={8} alignItems="center" justifyContent="space-between">
          <Stack width="50%">
            <Typography variant="h3"> Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</Typography>
          </Stack>
          <Image width="50%" src='../../header-teal.png'></Image>
        </Stack>
      </Stack>
      <Stack height="100%">
        <IHCFooter></IHCFooter>
      </Stack>
    </Stack>

  );
}

export default Tutorial;
