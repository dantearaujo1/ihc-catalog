import React from 'react'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import SubManagerPanel from '../Panels/SubManagerPanel';
import SubAddPanel from '../Panels/SubAddPanel';



export default function SubcategoriesManager() {

  const [addPage,setAddPage] = useState(false);
  const [editPage,setEditPage] = useState(false);
  const [snack,setSnack] = useState(false);
  const [snackData,setSnackData] = useState();

  const handleCloseSnack = (event, reason) => {
    if ( reason === 'clickaway' ){
      return;
    }
    setSnack(false);
  }

  return(
    <Stack width="100vw" alignItems='center' justifyContent='center'>
      {addPage?<SubAddPanel pageHandler={setAddPage} snackHandler={setSnack}/>:<SubManagerPanel showPanel={[setAddPage,setEditPage]}/> }
      {snack?
        <Snackbar open={snack} autoHideDuration={6000} message="Added!" onClose={handleCloseSnack}/>
      :
        null
      }
    </Stack>
  )
}
