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


function About() {
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
      <Stack direction="row" mb={8} sx={{ alignItems: "center", marginTop: 4 }}>
        <Image width="20%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../header-teal.png'></Image>
        <Image width="20%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../header-teal.png'></Image>
        <Image width="20%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../header-teal.png'></Image>
        <Image width="20%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../header-teal.png'></Image>
        <Image width="20%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../header-teal.png'></Image>
      </Stack>
      <Stack height="100%">
        <IHCFooter></IHCFooter>
      </Stack>
    </Stack>

  );
}

export default About;
