import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { IHCButtonRounded } from '../assets/ComponentStyle';


export default function ConfirmDialog({open, handler, doit}){

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
          <Typography>
            Are you sure you want to delete?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Click Ok to delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IHCButtonRounded onClick={handleOk}>Ok</IHCButtonRounded>
          <IHCButtonRounded onClick={handleClose}>Cancel</IHCButtonRounded>
        </DialogActions>
      </Dialog>
    </div>
  )
}
