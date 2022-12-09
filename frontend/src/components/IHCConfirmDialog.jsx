import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { IHCButtonRounded } from '../assets/ComponentStyle';


export default function IHCConfirmDialog({open, handler, doit, dataTitle, dataContent}){

  const [data, setData] = useState( {
    title:'Are you sure you want to delete?',
    content:'This will delete all your data!',
  })

  useEffect( () => {
    const obj = {
      title:dataTitle,
      content:dataContent
    }
    setData(obj);
  }, [dataTitle, dataContent] );

  const handleClose = () => {
    handler();
  }
  const handleOk = () => {
    doit(true);
    handler();
  }


  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <Typography variant="h3">
            {data?.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1">
            {data?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IHCButtonRounded onClick={handleClose}><Typography variant="button">Cancel</Typography></IHCButtonRounded>
          <IHCButtonRounded variant='contained' onClick={handleOk}><Typography variant="button">Ok</Typography></IHCButtonRounded>
        </DialogActions>
      </Dialog>
    </div>
  )
}
