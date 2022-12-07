import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import Stack from '@mui/material/Stack'
import { IHCButtonRounded } from '../assets/ComponentStyle'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

import NavigationHeader from '../components/Navigation/NavigationHeader'
import Footer from '../components/Navigation/Footer'
import NavigationBar from '../components/Navigation/NavigationBar'
import MultiActionAreaCard from '../components/PageCard'
import { ArticleActionCard } from '../components/PageCard'
import ArticleCard from '../components/ArticleCard'
import GroupBadge from '../components/GroupBadge'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

const InstrumentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [data,setData] = useState(location.state.article);
  const [one,setOne] = useState();
  const [two,setTwo] = useState();

  useEffect( () => {
     setData(location.state.article);
    console.log(data);
  }, [location.state] )

  useEffect( () => {
    const fetch_data = async () => {
      const fetching = await fetch('/api/v1/article/same', {
        method:'POST',
        headers:{
          'AcceptType':'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify(data.Subcategorys)
      })

      const result = await fetching.json();
      setOne(result.article1);
      setTwo(result.article2);
    }
    fetch_data();
  }, [data] )



  return (
    <Box>
      <NavigationHeader/>
      <NavigationBar/>
      <Stack  height="auto" backgroundColor="background.default" alignItems="center">
          <Stack width="70%" height="100%" sx={{mt:8}}  alignItems="flex-start">
            <Typography variant="h2">{data?data.Article.name:"Title"}</Typography>
            <Stack  direction='row' width="100%" height="100%">
              <Stack width="100%" height="auto" >
                <Stack mt={5} >
                  <Typography  color={theme.palette.primary.light} variant="h5">Main Idea</Typography>
                  <Typography variant="body2" mt={2}>{data?data.Article.main:"Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."}</Typography>
                </Stack>
                <Stack mt={3} >
                  <Typography color={theme.palette.primary.light} variant="h5">General Procedure</Typography>
                  <Typography variant="body2" mt={2}>{data?data.Article.general:"Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."}</Typography>
                </Stack>
                <Stack mt={3} >
                  <Typography variant="h5" color={theme.palette.primary.light}>Reference</Typography>
                  <Typography variant="body2" mt={2}>{data?data.Article.reference:"Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."}</Typography>
                </Stack>
                <Stack mt={3} >
                  <Typography variant="h5" color={theme.palette.primary.light}>Link</Typography>
                  <Link variant="body2" href={data.Article.link?data.Article.link:"/#"} mt={2}>{data.Article.link?data.Article.link:"link"}</Link>
                </Stack>
              </Stack>
              <Stack  width="50%" height="auto" mt={5} pl={2} >
              {data.Categorys.map( (value, index) => {
                return <GroupBadge key={index} category={value} subcategory={data.Subcategorys[index]}></GroupBadge>
              } )

              }
              </Stack>
            </Stack>
          <IHCButtonRounded  variant='contained'  onClick={() => {navigate(-1)}} sx={{mt: 5, mb: 6, borderRadius: 10}}>
            <FontAwesomeIcon  icon={faArrowLeftLong}/>
            <Typography ml={2}>Back</Typography>
          </IHCButtonRounded>
          <Stack mb={16} mt={4} height="100%" width="100%" spacing={8}>
                <Typography variant="h4">You may also be Interessed in ...</Typography>
                <Stack direction="row"  width="100%" alignItems='center' justifyContent='flex-start' spacing={2}>
                  <ArticleActionCard link={one?._id} title={one?.name} data={one} content={one?.reference}></ArticleActionCard>
                  <ArticleActionCard link={two?._id} title={two?.name} data={two} content={two?.reference}></ArticleActionCard>
                </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Footer></Footer>
    </Box>
  )
}

export default InstrumentDetail;
