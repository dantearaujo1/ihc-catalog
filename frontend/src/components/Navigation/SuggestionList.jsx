import React , { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function List(){
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Checkbox></Checkbox>
      <Stack alignItems="center">
        <Typography>Categoria</Typography>
        <Box sx={{backgroundColor:"#ff0000", width:"25px", height:"15px"}}></Box>
      </Stack>
      <Typography color="secondary" m={10}> Sugestão</Typography>
      <Typography color="success" m={2}> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Typography>
      <Typography color="error" m={2}> <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></Typography>
    </Stack>
  )
};

export default function SuggestionList() {

  const [data,setData] = useState(['Hello','Our']);

  return (
    <Box>
      <Stack>
        {data.map((item) => {
          "oi"
        })}
      </Stack>
    </Box>
  )
};

