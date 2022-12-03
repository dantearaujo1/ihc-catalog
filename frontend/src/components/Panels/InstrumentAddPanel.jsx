import React from 'react'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'


import TagSelect from '../Filter/TagSelect'
import { IHCButtonRounded } from '../../assets/ComponentStyle'
import { IHCTextField } from '../../assets/ComponentStyle'



export default function InstrumentAddPanel(props) {

  const handleCancelButton = () => {
    props.pageHandler(false);
  }

  const handleAddButton = () => {
    props.pageHandler(false);
    props.snackHandler(true);
  }

  return(
    <Stack width='80%' height='100%' alignItems='flex-start' spacing={4} justifyContent='center'>
      <Typography variant="h3"> Add Instrument Panel</Typography>
      <Paper width='100%' sx={{height:'100%'}} elevation={8}>
        <Grid container p={5}  height='100%' spacing={4}>
          <Grid item xs={8}>
            <IHCTextField id='namelb' required label='Instrument Name' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={4}>
            <IHCTextField id='namelb' label='Year' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={12}>
            <IHCTextField id='namelb' label='Reference' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={4}>
            {/* <IHCTextField id='cat0lb' label='Application Domain' sx={{width:'100%'}}></IHCTextField> */}
            <TagSelect cat={"Hello"} data={[]}></TagSelect>
          </Grid>
          <Grid item xs={4}>
            {/* <IHCTextField id='cat1lb' label='Framework' sx={{width:'100%'}}></IHCTextField> */}
            <TagSelect cat={"Hello"} data={[]}></TagSelect>
          </Grid>
          <Grid item xs={4}>
            {/* <IHCTextField id='cat2lb' label='Target User' sx={{width:'100%'}}></IHCTextField> */}
            <TagSelect cat={"Hello"} data={[]}></TagSelect>
          </Grid>
          <Grid item xs={4}>
            {/* <IHCTextField id='cat3lb' label='Type of Approach' sx={{width:'100%'}}></IHCTextField> */}
            <TagSelect cat={"Hello"} data={[]}></TagSelect>
          </Grid>
          <Grid item xs={4}>
            {/* <IHCTextField id='cat4lb' label='Type of Instrument' sx={{width:'100%'}}></IHCTextField> */}
            <TagSelect cat={"Hello"} data={[]}></TagSelect>
          </Grid>
          <Grid item xs={4}>
            {/* <IHCTextField id='cat5lb' label='UX Quality' sx={{width:'100%'}}></IHCTextField> */}
            <TagSelect cat={"Hello"} data={[]}></TagSelect>
          </Grid>
          <Grid item xs={6}>
            <IHCTextField multiline rows={6} id='mainlb' label='Main Idea' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={6}>
            <IHCTextField multiline rows={6} id='generallb' label='General Procedure' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={2}>
            <IHCButtonRounded sx={{width:'100%'}} onClick={handleCancelButton} variant="text" color='secondary'>Cancel</IHCButtonRounded>
          </Grid>
          <Grid item xs={2}>
            <IHCButtonRounded sx={{width:'100%'}} onClick={handleAddButton} variant="contained">Add</IHCButtonRounded>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  )
}
