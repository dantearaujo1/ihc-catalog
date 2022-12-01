import { useParams, useNavigate, useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import React from "react";
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
  const [pages, setPages] = useState(1);
  let [page, setPage] = useState(1);
  const [showQuantity, setShowQuantity] = useState(5);
  const [fetching, setFetching] = useState(true);
  const [result, setResult] = useState();
  let {subID} = useParams();
  let { state } = useLocation();
  const [ filterState, setState ] = useState( state.lookedFor || {} );

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
      setFetching(true);
      const better = state.data.map( (result) => {
        return {
          Article:{
            _id:result.data[0]._id,
            name:result.data[0].name,
            reference:result.data[0].reference,
            year:result.data[0].year,
            main:result.data[0].main,
            general:result.data[0].general,
          }
        }
      } )
      setResult(better);
      setFetching(false);

    }
    setState(state.lookedFor);

  }, [state] );

  useEffect( () => {
    if(state.lookedFor !== filterState){
      setFetching(true);
      let newSelections = [];
      for (let index = 0; index < filterState.length; index++) {
        const element = filterState[index];
        newSelections.push(element);
      }
      const fetch_data = async (selections) => {
        const result = await fetch('/api/v1/article/group/look', {
          headers: {
            'Accepts': 'application/json',
            'Content-Type': 'application/json',
          },
          method:"POST",
          body: JSON.stringify(selections),
        });
        const json = await result.json();
        const better = json.map( (result) => {
          return {
            Article:{
              _id:result.data[0]._id,
              name:result.data[0].name,
              reference:result.data[0].reference,
              year:result.data[0].year,
              main:result.data[0].main,
              general:result.data[0].general,
            }
          }
        } )
        setResult(better);
        setFetching(false);
      }
      fetch_data(newSelections).catch(console.error);

    }

  }, [filterState] );

  useEffect( () => {
    if(result){
      if(result.length/showQuantity > 1){
        setPages(( Math.floor(result.length/showQuantity) ));
      }
      else{
        setPages(1);
      }
    }
  }, [result] );



  const handleSubClick = async (sub) => {
    const data = await fetch('/api/v1/article/cat/id/' + sub.categoryID);
    const category = await data.json();
    navigate("/result/" + sub._id, { state: {
      lookedFor: [{
        category:{
          id:sub.categoryID,
          name:category.name,
          selections:[{ _id:sub._id, name: sub.name, categoryID: sub.categoryID, }],
        },
      }],
    }})
  }
  const setFilterFromChild = (newFilter) => {
    setFetching(true);
    setState(newFilter);
  }


  return (
    <Stack>
      <NavigationHeader></NavigationHeader>
      <NavigationBar></NavigationBar>
      <Stack pb={4}  direction="row" >
        <SideFilter setParentData={setFilterFromChild}></SideFilter>
        <Stack alignItems="flex-start" ml={4} mt={4} width="80vw">
          <Stack direction="row" alignItems="center" spacing={2} width="100%" >
            <Typography variant="h5">Searching results for: </Typography>
            <Stack pt={2} pb={2} direction="row" spacing={2} flexWrap="wrap">
              {filterState.map( (value) => {
                return value.category.selections.map( ( selections, idx ) => {
                  return (
                    <Stack key={selections._id}>
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
                {(result?.length > 0)?<Pagination sx={{mt:4}}  color="secondary" count={pages} page={page} onChange={(e,value)=>{setPage(value);}}></Pagination>:null
                }
              </Stack>
            </Stack >

          :
          <Stack alignItems="center" justifyContent="center" sx={{width:"100%", height:"80vh", ml:"auto"}}>
              <CircularProgress color="primary" />
          </Stack>

          }
        </Stack>
      </Stack>
      {fetching?null:<Footer></Footer>}
    </Stack>
  )
}

