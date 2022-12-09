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


import { IHCButtonRounded } from '../../assets/ComponentStyle'
import { IHCTextField } from '../../assets/ComponentStyle'
import { IHCSelect } from '../../assets/ComponentStyle'



export default function SubAddPanel(props) {

  const [cat, setCat] = useState();
  const [categorySelection, setCategorySelection] = useState('');
  const [subName, setSubName] = useState('');

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

  const handleAddButton = async () => {
    if(subName !== ''){
      let subcategory =  {
        name:subName,
        categoryID:categorySelection._id
      }

      const result = await fetch('/api/v1/article/sub/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subcategory)
      })

      const toJson = await result.json();
      props.pageHandler(false);
      props.snackHandler[1](
        {
          title:toJson.message
        }
      );
      props.snackHandler[0](true);
      props.setRefresh( (prevState) => !prevState );
    }
  }

  const handleOnChangeSelection = (event) => {
    setCategorySelection(event.target.value)
  }

  return(
    <Stack width='80%' height='100%' alignItems='center' spacing={4} justifyContent='center'>
      <Typography variant="h3"> Add Category Panel</Typography>
      <Paper width='auto' sx={{height:'100%'}} elevation={8}>
        <Grid container p={5}  width='100%' height='100%' spacing={4}>
          <Grid item xs={8}>
            <FormControl sx={{width:"100%"}}>
              <InputLabel id="sublb" ></InputLabel>
              <IHCTextField id='sublb'  label='Category' value={subName} onChange={(event) => setSubName(event.target.value)} sx={{width:'100%'}}></IHCTextField>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl size="large" sx={{width:"100%"}}>
              <InputLabel id="gsel">Group</InputLabel>
              <IHCSelect
                label="Group"
                labelId="gsel"
                id="groupSelect"
                value={categorySelection}
                onChange={handleOnChangeSelection}
                sx={{width:'100%', minWidth:300}}
              >
                {cat?.map( (value) => {
                  return <MenuItem key={value._id} value={value}>{value.name}</MenuItem>
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
