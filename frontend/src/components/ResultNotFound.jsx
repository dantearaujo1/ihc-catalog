import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "mui-image"

import { IHCButtonRounded } from "../assets/ComponentStyle"

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

export default function ResultNotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
      navigate("/");
  }
  return (
    <Stack width="100%" alignItems="center" justifyContent="center">
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Stack spacing={4} width="50%">
          <Typography variant="h2" color="secondary.main">Oops!</Typography>
          <Typography variant="h3" color="secondary.main">We couldn't find what you are looking for.</Typography>
          <Typography variant="inputText" color="text.primary" >Please, try another category combination or search for a keyword.</Typography>
        </Stack>
        <Stack alignItems="center" width="50%">
          <Image width="50%" src="../result-not-found-teal.png"/>
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <IHCButtonRounded variant="contained" onClick={handleClick} sx={{ mt: 4}}>
          <FontAwesomeIcon  icon={faArrowLeftLong}/>
          <Typography ml={2}>Back to Homepage</Typography>
        </IHCButtonRounded>
      </Stack>
    </Stack>
  )
}
