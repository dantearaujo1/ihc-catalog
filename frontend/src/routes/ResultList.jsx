import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

import NavigationHeader from "../components/Navigation/NavigationHeader"
import NavigationBar from "../components/Navigation/NavigationBar"
import ArticleCard from "../components/ArticleCard"

export default function ResultList() {
  const [pages, setPages] = useState(5);
  const [fetching, setFetching] = useState(true);
  const [result, setResult] = useState();
  let [page, setPage] = useState(1);
  let {subID} = useParams();

  // This need to fetch article Data
  useEffect( () => {
    setFetching(true);
    const fetch_data = async () => {
      const data = await fetch('/api/v1/article/group/g/a/s/' + subID)
      const json = await data.json();
      setResult(json);
      setFetching(false);
    }
    fetch_data();
  }, [subID] );

  useEffect( () => {
    if(result){
      setPages(( Math.floor(result.length/2) ));
    }
  }, [result] );

  return (
    <Stack>
      <NavigationHeader data={result?[]:[]}></NavigationHeader>
      <NavigationBar></NavigationBar>
      <Stack justifyContent="center" alignItems="center">
        {!fetching?
            <Stack height="100%" alignItems="center">
              { result?result.slice(page-1, page+1).map( (article) => {
                  return <ArticleCard key={article.Article._id} data={article}></ArticleCard>
                })
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
              <Pagination sx={{mt:4}}  count={pages} page={page} onChange={(e,value)=>{setPage(value); console.log(value)}}></Pagination>
            </Stack>

        :
          <Stack>
            <CircularProgress color="primary"/>
          </Stack>

        }
      </Stack>
    </Stack>
  )
}

