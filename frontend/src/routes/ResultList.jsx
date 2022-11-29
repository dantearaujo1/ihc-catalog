import React, {useState, useEffect} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";


import NavigationHeader from "../components/Navigation/NavigationHeader"
import NavigationBar from "../components/Navigation/NavigationBar"
import Footer from "../components/Navigation/Footer"
import ArticleCard from "../components/ArticleCard"
import SideFilter from "../components/Filter/SideFilter"
import ResultNotFound from "../components/ResultNotFound"
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

  // This is used when searching for NavigationBar
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

  // This is used when searching from Filter
  useEffect( () => {
    if(!subID){
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
              },
          }
        });

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



  const handleSubClick = (sub) => {
    navigate("/result/" + sub._id, { state: {
      lookedFor: [{
        category:{
          id:sub.categoryID,
          selections:[{ _id:sub._id, name: sub.name, categoryID: sub.categoryID, }],
        },
      }],
    }})

  }

  return (
    <Stack flexGrow={1}>
      <NavigationHeader></NavigationHeader>
      <NavigationBar></NavigationBar>
      <Stack mb={4}  direction="row" >
        <SideFilter></SideFilter>
        <Stack alignItems="flex-start" ml={4} mt={4} width="80vw">
          <Stack direction="row" alignItems="center" spacing={2} width="100%" >
            <Typography variant="h5">Searching results for: </Typography>
            <Stack pt={2} pb={2} direction="row" spacing={2} flexWrap="wrap">
              {state.lookedFor.map( (value) => {
                return value.category.selections.map( ( selections ) => {
                  return (
                    <Stack>
                      <IHCButtonRounded onClick={()=>handleSubClick(selections)} variant="buttonSmall">
                        <Typography color="white">
                          {selections.name}
                        </Typography>
                      </IHCButtonRounded>
                    </Stack>
                  )

                } ) }  )}
            </Stack>
          </Stack>
          {!fetching?
              <Stack width="100%" minHeight="59.9vh" justifyContent="center" alignItems="flex-start">
                { ( result?.length > 0 ) ? result?.slice( (page-1) * showQuantity, page * showQuantity).map( (article) => {
                    return <ArticleCard key={article.Article._id} data={article}></ArticleCard>
                  }
                )
                  :
                  <ResultNotFound></ResultNotFound>
                }
              <Stack alignItems="center" width="100%">
                {(result?.length > 0)?<Pagination sx={{mt:4}}  color="secondary" count={pages} page={page} onChange={(e,value)=>{setPage(value); console.log(value)}}></Pagination>:null
                }
              </Stack>
            </Stack >

          :
          <Stack alignItems="center" justifyContent="center" sx={{width:"80vw", height:"80vh", ml:"auto"}}>
              <CircularProgress color="primary" />
          </Stack>

          }
        </Stack>
      </Stack>
      {fetching?null:<Footer></Footer>}
    </Stack>
  )
}

