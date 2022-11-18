import React, {useState} from 'react'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import NavigationHeader from '../components/Navigation/NavigationHeader'
import NavigationBar from '../components/Navigation/NavigationBar'
import ArticleCard from '../components/ArticleCard'
import GroupBadge from '../components/GroupBadge'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

const InstrumentDetail = () => {
  const [data, setData] = useState({});
  return (
    <Box>
      <NavigationHeader/>
      <NavigationBar/>
      <Stack  height="auto" backgroundColor="page.background.primary.main" alignItems="center">
          <Stack width="70%" height="100%" sx={{mt:8}}  alignItems="flex-start">
            <Typography variant="h2">Title</Typography>
            <Stack  direction='row' width="100%" height="100%">
              <Stack width="100%" height="auto" >
                <Stack mt={5} >
                  <Typography  variant="h6" sx={{fontWeight:"bold"}}>Main Idea</Typography>
                  <Typography variant="p" mt={2}>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</Typography>
                </Stack>
                <Stack mt={3} >
                  <Typography variant="h6" sx={{fontWeight:"bold"}}>General Procedure</Typography>
                  <Typography variant="p" mt={2}>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</Typography>
                </Stack>
                <Stack mt={3} >
                  <Typography variant="h6" sx={{fontWeight:"bold"}}>Reference</Typography>
                  <Typography variant="p" mt={2}>Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</Typography>
                </Stack>
              </Stack>
              <Stack  width="50%" height="auto" mt={5} pl={2} >
                <GroupBadge></GroupBadge>
              </Stack>
            </Stack>
          <Button  variant='contained' sx={{mt: 5, mb: 6, borderRadius: 10}}>
            <FontAwesomeIcon  icon={faArrowLeftLong}/>
            <Typography ml={2}>Back</Typography></Button>
          <Stack height="40%" spacing={3}>
                <Typography variant="h4">You may also be Interessed in ...</Typography>
                <Stack direction="row"  spacing={2}>
                  <ArticleCard ml={2}/>
                  <ArticleCard ml={2}/>
                </Stack>
          </Stack>
          </Stack>
      </Stack>
    </Box>
  )
}

export default InstrumentDetail;
