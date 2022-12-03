import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'


import TagSelect from '../Filter/TagSelect'
import { IHCButtonRounded } from '../../assets/ComponentStyle'
import { IHCTextField } from '../../assets/ComponentStyle'



export default function InstrumentEditPanel(props) {

  const [cat, setCat] = useState();
  const [sub, setSub] = useState();
  const [selections, setSelection] = useState([])

  const getCategories = async () => {
    const categories = await fetch('/api/v1/article/cat/all');
    const toJson = await categories.json();
    const ordered = toJson.sort((a, b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    })

    setCat(ordered);
  }

  const getSubcategories = async () => {
    const subcategories = await fetch('/api/v1/article/sub/all');
    const toJson = await subcategories.json();
    const ordered = toJson.sort((a, b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    })
    setSub(ordered);
  }

  useEffect(() => {
    const fetch_data = async () => {
      await getCategories();
      await getSubcategories();

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

  const handleFilterCategory = (value , del) => {
    if(del){
      let newArr = [...selections];
      let shouldCreateNew = true;
      newArr.map((obj, idx) => {
        if (obj.category.id === value.category.id) {
          obj.category.selections = value.category.selections;
          if(value.category.selections.length === 0){
            newArr.splice(idx,1);
          }
          shouldCreateNew = false;
        }
      })
      if (shouldCreateNew){
        setSelection(prev =>[...prev, value])
        console.log(value);
        return
      }
      setSelection(newArr);
        console.log(newArr);
      return
    }
    let newArr = [...selections];
    let shouldCreateNew = true;
    newArr.map((obj) => {
      if (obj.category.id === value.category.id) {
        obj.category.selections = value.category.selections;
        shouldCreateNew = false;
      }
    })
    if (shouldCreateNew) {
      setSelection(prev => [...prev, value]);
    }
    else {
      setSelection(newArr);
    }
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


        {cat ? cat.map((value) => {
          return (
          <Grid item xs={4}>
            <TagSelect key={value._id} handler={handleFilterCategory} data={(sub) ? sub.filter((obj) => { return (value._id === obj.categoryID) ? obj : null }) : []} cat={value}></TagSelect>
          </Grid>
          )
        })
          : null
        }


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
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ width: '100%', flexWrap: "wrap", alignItems: "center", marginBottom: 10, paddingLeft: 14, paddingRight: 14 }}
      >
      </Stack>
