import React from 'react'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import SubManagerPanel from '../Panels/SubManagerPanel';
import SubAddPanel from '../Panels/SubAddPanel';
import SubEditPanel from '../Panels/SubEditPanel';
import ConfirmDialog from '../ConfirmDialog'



export default function SubcategoriesManager() {

  const [addPage,setAddPage] = useState(false);
  const [editPage,setEditPage] = useState(false);
  const [snack,setSnack] = useState(false);
  const [snackData,setSnackData] = useState();
  const [editData,setEditData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const handleDelete = async () => {

    const data = {
      id:editData._id
    }
    const result = await fetch('/api/v1/article/sub/d',
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
  }

  return(
    <Stack width="100vw" alignItems='center' justifyContent='center'>
      <ConfirmDialog doit={handleDelete} open={dialogOpen} handler={handleCloseDialog}></ConfirmDialog>
      {
        addPage?<SubAddPanel setRefresh={setShouldRefresh} pageHandler={setAddPage} snackHandler={[setSnack,setSnackData]}/>
        :editPage?<SubEditPanel setRefresh={setShouldRefresh} snackHandler={[setSnack,setSnackData]} dataRef={editData} pageHandler={setEditPage}/>
        :<SubManagerPanel setRefresh={setShouldRefresh} refresh={shouldRefresh} dataHandler={setEditData} showDialog={setDialogOpen} showPanel={[setAddPage,setEditPage]}/>
      }
      {snack?
        <Snackbar open={snack} autoHideDuration={6000} message={snackData?.title} onClose={handleCloseSnack}/>
      :
        null
      }
    </Stack>
  )
}
