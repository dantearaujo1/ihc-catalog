import React from 'react'
import { useState } from 'react'

import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import InstrumentManagerPanel from '../Panels/InstrumentManagerPanel';
import InstrumentAddPanel from '../Panels/InstrumentAddPanel';
import InstrumentEditPanel from '../Panels/InstrumentEditPanel';
import ConfirmDialog from '../ConfirmDialog'





export default function InstrumentManager() {

  const [addPage,setAddPage] = useState(false);
  const [editPage,setEditPage] = useState(false);
  const [snack,setSnack] = useState(false);
  const [snackData,setSnackData] = useState();
  const [editData,setEditData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogManyOpen, setDialogManyOpen] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if ( reason === 'clickaway' ){
      return;
    }
    setSnack(false);
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }
  const handleCloseManyDialog = () => {
    setDialogManyOpen(false);
  }
  const handleDeleteManyDialog = async () => {
    setDialogManyOpen(false);
    const list = editData
    console.log(list);
    const method = {
      method: 'DELETE',
      headers:{
        'Accepts':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(list)
    }
    const fetching = await fetch('/api/v1/article/ds/', method);
    const result = await fetching.json();
    console.log(result);

    setSnackData(
      {
        title:result.message
      }
    );
    setSnack(true);
    setShouldRefresh( (prevState) => !prevState );
  }


  const handleDelete = async () => {

    const data = {
      id:editData._id
    }
    const result = await fetch('/api/v1/article/d/',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    const toJson = await result.json();
    setSnackData(
      {
        title:toJson.message
      }
    );
    setSnack(true);
    setShouldRefresh( (prevState) => !prevState );
  }

  return(
    <Stack width="100vw" alignItems='center' justifyContent='center'>
      {dialogManyOpen?<ConfirmDialog doit={handleDeleteManyDialog} open={dialogManyOpen} handler={handleCloseManyDialog}/>:<ConfirmDialog doit={handleDelete} open={dialogOpen} handler={handleCloseDialog}/>}
      {
        addPage?<InstrumentAddPanel setRefresh={setShouldRefresh} pageHandler={setAddPage} snackHandler={[ setSnack,setSnackData ]}/>
        :editPage?<InstrumentEditPanel setRefresh={setShouldRefresh} dataRef={editData} pageHandler={setEditPage} snackHandler={[setSnack,setSnackData]}/>
        :<InstrumentManagerPanel dataHandler={setEditData} setRefresh={setShouldRefresh} refresh={shouldRefresh} showDialog={setDialogOpen} showManyDialog={setDialogManyOpen} showPanel={[setAddPage,setEditPage]}/>
      }
      {snack?
        <Snackbar open={snack} autoHideDuration={6000} message={snackData?.title} onClose={handleCloseSnack}/>
      :
        null
      }
    </Stack>
  )
}
