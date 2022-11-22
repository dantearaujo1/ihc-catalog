import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

import NavigationHeader from "../components/Navigation/NavigationHeader"
import NavigationBar from "../components/Navigation/NavigationBar"
import ArticleCard from "../components/ArticleCard"

export default function ResultList() {
  const [page, setPage] = useState(5);
  const [found, setFound] = useState(true);
  const [result, setResult] = useState({});
  let {subID} = useParams();

  // This need to fetch article Data
  useEffect( () => {
    const fetch_data = async () => {
      const data = await fetch('/api/v1/article/sub/all')
      const json = await data.json();
      console.log(json);
    }
    fetch_data();
    console.log(subID);
  }, [] );

  return (
    <Stack>
      <NavigationHeader data={result?[]:[]}></NavigationHeader>
      <NavigationBar></NavigationBar>
      <Stack sx={{mt:3}} justifyContent="center" alignItems="center">
        {found?
            <Stack alignItems="center">
              <ArticleCard></ArticleCard>
              <ArticleCard></ArticleCard>
              <Pagination sx={{mt:4}}  count={page}></Pagination>
            </Stack>

        :
            <Stack alignItems="center" justifyContent="center" spacing={4} m="auto" width="15%">
              <Typography variant="h3" textAlign="center">Oops!</Typography>
              <Typography variant="h6" textAlign="center">We couldn't find what you are looking for.</Typography>
              <Typography variant="h8" textAlign="center">Please, try another category combination or search for a keyword.</Typography>
            <Box>
              <Button variant="contained" sx={{borderRadius: 10, mt: 4}}>
                <FontAwesomeIcon  icon={faArrowLeftLong}/>
                <Typography ml={2}>Back to Homepage</Typography>
              </Button>
            </Box>
            </Stack>

        }
      </Stack>
    </Stack>
  )
}

