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
      <Stack alignItems='center'>
        <Stack mt={4} spacing={3} width='80%'>
          <Typography textAlign='justify' variant='h3'>
            User Experience (UX) has been intensively investigated lately, resulting in the proposal of several evaluation instruments, methods, and techniques. However, the definition of UX and its constructs is still a work in progress, making User Experience a concept open to various interpretations. Consequently, the development of UX evaluation methods and instruments rely on very different assumptions, often making professionals and beginning researchers uncertain about choosing the right methods to evaluate user evaluation aspects.

  Aiming to help fill in this gap, we present the results of a systematic snowballing procedure conducted to investigate the characteristics of the UX evaluation instruments that have been proposed and used by HCI community in the last years. We compiled information about 116 instruments aiming to assist researchers and practitioners in making informed choices about which instruments can support UX data collection, according to their research goals.
          </Typography>

          <Typography textAlign='justify' variant='h3'>
  If you have any doubts or suggestions do not hesitate in contacting me at: ticianne@virtual.ufc.br"
          </Typography>
        </Stack>
        <Stack mt={4} spacing={1} alignItems='center'>
          <Typography variant='h1'>Our Team</Typography>
          <Typography variant='h3'>We're a group of people who helped our HIC Teacher to build an online catalog! </Typography>
          <Typography variant='h3'>We call ourselfs the Graúna Digital Team</Typography>
        </Stack>
        <Stack direction="row" mb={8} mt={8} width='80%' height='100%'>
          <Stack spacing={3} height='100%' width='100%' alignItems='center'>
            <Image height='auto' width="80%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../people/dan.png'></Image>
            <Typography variant='h4' textAlign='center'>
              Dante de Araújo
            </Typography>
            <Typography variant='h5' color='info.main' textAlign='center'>
              Front and Back end Developer
            </Typography>
          </Stack>
          <Stack spacing={3} height='100%' width='100%' alignItems='center'>
              <Image height="auto" width="80%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../people/Luis.jpg'></Image>
            <Typography variant='h4' textAlign='center'>
              Luís Eduardo
            </Typography>
            <Typography variant='h5' color='info.main' textAlign='center'>
              Documenter
            </Typography>
          </Stack>
          <Stack spacing={3} height='100%' width='100%' alignItems='center'>
            <Image height='auto' width="80%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../people/Drielle.jpg'></Image>
            <Typography variant='h4' textAlign='center'>
              Drielle Furtado
            </Typography>
            <Typography variant='h5' color='info.main' textAlign='center'>
              Manager - Creative Leader - Designer
            </Typography>
          </Stack>
          <Stack spacing={3} height='100%' width='100%' alignItems='center'>
            <Image height='auto' width="80%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../people/Manoel.jpg'></Image>
            <Typography variant='h4' textAlign='center'>
              Manoel Costa
            </Typography>
            <Typography variant='h5' color='info.main' textAlign='center'>
              Documenter
            </Typography>
          </Stack>
          <Stack spacing={3} height='100%' width='100%' alignItems='center'>
            <Image height='auto' width="80%" showLoading  style={{aspectRatio: 1/1}} sx={{borderRadius:50}} src='../../people/Max.jpg'></Image>
            <Typography variant='h4' textAlign='center'>
              Maxwell
            </Typography>
            <Typography variant='h5' color='info.main' textAlign='center'>
              Developer - Requirements Planner
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack height="100%">
        <IHCFooter></IHCFooter>
      </Stack>
    </Stack>

  );
}

export default About;
