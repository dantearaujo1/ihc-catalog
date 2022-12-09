import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { IHCButtonRounded } from '../assets/ComponentStyle';


export default function SuggestionDialogView({info, open, handler}){

  const [data, setData] = useState( info )

  const handleOk = () => {
    handler();
  }

  return (
    <div>
      <Dialog sx={{width:"100%"}} open={open}>
        <DialogTitle>
          <Typography variant="h2">
            {info?.name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h3">
              Description: {info?.description}
            </Typography>
          </DialogContentText>
          <DialogContentText>
            <Typography variant="body1">Link:
            <Link href={info?info.link:'#'} variant="body1">
                {" "}{info?.link}
            </Link>
            </Typography>
          </DialogContentText>
          <DialogContentText>
            <Typography variant="body2">
              Email: {info?.email}
            </Typography>
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <IHCButtonRounded onClick={handleOk}>Ok</IHCButtonRounded>
        </DialogActions>
      </Dialog>
    </div>
  )
}
