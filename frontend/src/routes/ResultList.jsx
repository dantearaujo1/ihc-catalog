import React, {useState, useEffect} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

import NavigationHeader from "../components/Navigation/NavigationHeader"
import NavigationBar from "../components/Navigation/NavigationBar"
import Footer from "../components/Navigation/Footer"
import ArticleCard from "../components/ArticleCard"
import { IHCButtonRounded } from "../assets/ComponentStyle"


export default function ResultList() {
  const navigate = useNavigate();
  const [pages, setPages] = useState(5);
  let [page, setPage] = useState(1);
  const [showQuantity, setShowQuantity] = useState(2);
  const [fetching, setFetching] = useState(true);
  const [result, setResult] = useState();
  let {subID} = useParams();
  let { state } = useLocation();

  // This need to fetch article Data
  useEffect( () => {
    setFetching(true);
    const fetch_data = async () => {
      const data = await fetch('/api/v1/article/group/g/a/s/' + subID);
      const json = await data.json();
      setResult(json);
      setFetching(false);
    }
    if(subID){
      fetch_data();
    }
  }, [subID] );

  useEffect( () => {
    if(state){
      console.log(state.data);
      const fetch_data = async () => {
        const data = await fetch('/api/v1/article/group/populate',
        {
          headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
          },
          method:"POST",
          body: JSON.stringify(state.data),
        });
        const toJson = await data.json();
        const better = toJson.map( (article) => { return {
          Article: {
                _id:article.articleID._id,
                name:article.articleID.name,
                reference:article.articleID.reference,
                year:article.articleID.year,
                main:article.articleID.main,
                general:article.articleID.general,
              }
          }
        });
        console.log(better);
        setResult(better);
        setFetching(false);
      }
      fetch_data();

    }

  }, [state] );

  useEffect( () => {
    if(result){
      setPages(( Math.floor(result.length/showQuantity) ));
    }
  }, [result] );


  const handleClick = () => {
      navigate("/");
  }

  return (
    <Stack>
      <NavigationHeader data={result?[]:[]}></NavigationHeader>
      <NavigationBar></NavigationBar>
      <Stack justifyContent="center" alignItems="center">
        {!fetching?
            <Stack height="100%" alignItems="center">
              { ( result?.length > 0 ) ? result?.slice( (page-1) * showQuantity, page * showQuantity).map( (article) => {
                  return <ArticleCard key={article.Article._id} data={article}></ArticleCard>
                }
              )
                :
                <Stack alignItems="center" justifyContent="center" spacing={4} height="100%" m={ 20} width="35%">
                  <Typography variant="h3" textAlign="center">Oops!</Typography>
                  <Typography variant="h6" textAlign="center">We couldn't find what you are looking for.</Typography>
                  <Typography variant="h8" textAlign="center">Please, try another category combination or search for a keyword.</Typography>
                  <Box>
                    <IHCButtonRounded variant="contained" onClick={handleClick} sx={{ mt: 4}}>
                      <FontAwesomeIcon  icon={faArrowLeftLong}/>
                      <Typography ml={2}>Back to Homepage</Typography>
                    </IHCButtonRounded>
                  </Box>
                </Stack>
              }
              {(result?.length > 0)?<Pagination sx={{mt:4}}  color="secondary" count={pages} page={page} onChange={(e,value)=>{setPage(value); console.log(value)}}></Pagination>:null
              }
          </Stack>

        :
          <Stack>
            <CircularProgress color="primary"/>
          </Stack>

        }
      </Stack>
      <Footer></Footer>
    </Stack>
  )
}

