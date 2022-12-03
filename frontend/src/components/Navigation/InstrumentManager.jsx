import React from 'react'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import InstrumentManagerPanel from '../Panels/InstrumentManagerPanel';
import InstrumentAddPanel from '../Panels/InstrumentAddPanel';





export default function InstrumentManager() {

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
      {addPage?<InstrumentAddPanel pageHandler={setAddPage} snackHandler={setSnack}/>:<InstrumentManagerPanel showPanel={[setAddPage,setEditPage]}/> }
      {snack?
        <Snackbar open={snack} autoHideDuration={6000} message="Added!" onClose={handleCloseSnack}/>
      :
        null
      }
    </Stack>
  )
}
