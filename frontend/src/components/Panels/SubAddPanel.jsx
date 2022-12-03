import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'


import TagSelect from '../Filter/TagSelect'
import { IHCButtonRounded } from '../../assets/ComponentStyle'
import { IHCTextField } from '../../assets/ComponentStyle'
import { IHCSelect } from '../../assets/ComponentStyle'



export default function SubAddPanel(props) {

  const [cat, setCat] = useState();
  const [categorySelection, setCategorySelection] = useState('');

  const getCategories = async () => {
    const categories = await fetch('/api/v1/article/cat/all');
    const toJson = await categories.json();
    const ordered = toJson.sort((a, b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    })

    setCat(ordered);
  }

  useEffect(() => {
    const fetch_data = async () => {
      await getCategories();
    };
    fetch_data().catch(console.error);
  }, []);

  const handleCancelButton = () => {
    props.pageHandler(false);
  }

  const handleAddButton = () => {
    props.pageHandler(false);
    props.snackHandler(true);
  }

  const handleDropSelection = (event) => {
    setCategorySelection(event.target.value)
  }

  return(
    <Stack width='80%' height='100%' alignItems='flex-start' spacing={4} justifyContent='center'>
      <Typography variant="h3"> Add Category Panel</Typography>
      <Paper width='100%' sx={{height:'100%'}} elevation={8}>
        <Grid container p={5}  height='100%' spacing={4}>
          <Grid item xs={8}>
            <IHCTextField id='sublb' label='Category' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{width:"100%"}}>
              <InputLabel id="groupSelect" >Group</InputLabel>
              <IHCSelect
                labelId="groupSelect"
                label="Group"
                id="groupSelect"
                value={categorySelection}
                onChange={handleDropSelection}
              >
                {cat?.map( (value) => {
                  return <MenuItem value={value}>{value.name}</MenuItem>
                } )}
              </IHCSelect>
            </FormControl>
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
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ width: '100%', flexWrap: "wrap", alignItems: "center", marginBottom: 10, paddingLeft: 14, paddingRight: 14 }}
      >
      </Stack>
