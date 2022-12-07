import React from 'react'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import SuggestionManagerPanel from '../Panels/SuggestionManagerPanel';
import InstrumentAddPanel from '../Panels/InstrumentAddPanel';
import InstrumentEditPanel from '../Panels/InstrumentEditPanel';
import SuggestionDialogView from '../SuggestionDialogView'


export default function SuggestionManager() {

  const [snack,setSnack] = useState(false);
  const [snackData,setSnackData] = useState();
  const [showData,setShowData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if ( reason === 'clickaway' ){
      return;
    }
    setSnack(false);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  const handleDisapproval = async (data) => {

    const suggestion = {
      id:data._id,
      name:data.name,
      email:data.email,
      description:data.description,
      link:data.link,
      status: "Disapproved"
    }
    const result = await fetch('/api/v1/suggestion/p/d',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(suggestion),
    })

    const toJson = await result.json();
    console.log(toJson);
    setSnackData(
      {
        title:toJson.message
      }
    );
    setSnack(true);
  }
  const handleApproval = async (data) => {

    const suggestion = {
      id:data._id,
      status: "Approved",
      name:data.name,
      email:data.email,
      description:data.description,
      link:data.link,
    }
    const result = await fetch('/api/v1/suggestion/p/a',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(suggestion),
    })

    const toJson = await result.json();
    console.log(toJson);
    setSnackData(
      {
        title:toJson.message
      }
    );
    setSnack(true);
  }

  return(
    <Stack width="100vw" alignItems='center' justifyContent='center'>
      <SuggestionDialogView info={showData}  open={dialogOpen} handler={handleCloseDialog}></SuggestionDialogView>
      <SuggestionManagerPanel dataHandler={[setShowData,handleApproval,handleDisapproval]} showDialog={setDialogOpen}/>
      {snack && <Snackbar open={snack} autoHideDuration={6000} message={snackData?.title} onClose={handleCloseSnack}/>}
    </Stack>
  )
}
