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



export default function InstrumentAddPanel(props) {

  const [cat, setCat] = useState();
  const [selections, setSelection] = useState(['','','','','',''])
  const [old, setOlds] = useState(['','','','','',''])
  const [options, setOptions] = useState([]);
  const [instrument, setInstrument] = useState(props.dataRef || {
    name:'',
    year:'',
    reference:'',
    main:'',
    general:'',
    link:'',
  })

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

    let arr = new Array(cat?.length).fill([]);
    let fillArray = []
    for (let index = 0; index < cat?.length; index++) {
      const cats = cat[index];
      fillArray = []
      for (let idx = 0; idx < ordered.length; idx++) {
        const subs = ordered[idx];
        if(subs.categoryID === cats._id){
          fillArray.push(subs);
          arr[index] = fillArray;
        }
      }
    }
    setOptions(arr);
  }

  useEffect(() => {
    const fetch_data = async () => {
      await getCategories();

    };
    fetch_data().catch(console.error);
  }, []);

  useEffect( () => {
    const fetch_data = async () => {
      await getSubcategories();

    };
    fetch_data().catch(console.error);
  }, [cat])

  useEffect( () => {
    const fetch_data = async () => {
      const allSubs = await fetch('/api/v1/article/fulldata/'+ props.dataRef?._id)
      const result = await allSubs.json()
      let arr = new Array(cat?.length).fill('');
      for (let index = 0; index < result[0].subcategories?.length; index++) {
        const sub = result[0].subcategories[index];
        for (let idx = 0; idx < cat?.length; idx++) {
          const category = cat[idx];
          if( category._id === result[0].subcategories[index].categoryID ){
            arr[idx] = sub._id;
          }
        }
      }
      setSelection(arr);
      setOlds(arr);
    }
    fetch_data();
  }, [options])

  const handleCancelButton = () => {
    props.pageHandler(false);
  }

  const handleEditButton = async () => {
    const b = {
      ...instrument,
      subs:selections,
      olds:old
    }

    const patchData = {
      method: 'PATCH',
      headers:{
        'Accepts':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(b)
    }
    const fetching = await fetch('/api/v1/article/p/', patchData)
    const result = await fetching.json();

    props.setRefresh( (prevState) => !prevState );
    props.pageHandler(false);
    props.snackHandler[1]({
      title:result.message
    })
    props.snackHandler[0](true);
  }

  const handleOnChangeSelection = (event, idx) => {
    let newArr = [...selections];
    newArr[idx] = event.target.value;
    setSelection(newArr);
  }
  const handleOnChangeName = (event) => {
    setInstrument({
      ...instrument,
      name:event.target.value
    })
  }
  const handleOnChangeYear = (event) => {
    setInstrument({
      ...instrument,
      year:event.target.value
    })
  }
  const handleOnChangeReference = (event) => {
    setInstrument({
      ...instrument,
      reference:event.target.value
    })
  }
  const handleOnChangeMain = (event) => {
    setInstrument({
      ...instrument,
      main:event.target.value
    })
  }
  const handleOnChangeGeneral = (event) => {
    setInstrument({
      ...instrument,
      general:event.target.value
    })
  }
  const handleOnChangeLink = (event) => {
    setInstrument({
      ...instrument,
      link:event.target.value
    })
  }

  return(
    <Stack width='80%' height='100%' alignItems='flex-start' spacing={4} justifyContent='center'>
      <Typography variant="h3"> Edit Instrument Panel</Typography>
      <Paper width='100%' sx={{height:'100%'}} elevation={8}>
        <Grid container p={5}  height='100%' spacing={4}>
          <Grid item xs={8}>
            <IHCTextField id='namelb' onChange={handleOnChangeName} value={instrument.name} required label='Instrument Name' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={4}>
            <IHCTextField id='namelb' onChange={handleOnChangeYear} number value={instrument.year} required label='Year' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={12}>
            <IHCTextField id='namelb' value={instrument.reference} onChange={handleOnChangeReference} label='Reference' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={12}>
            <IHCTextField multiline onChange={handleOnChangeLink} value={instrument.link} id='linklb' label='Link' sx={{width:'100%'}}></IHCTextField>
          </Grid>


        {cat ? cat.map((value, index) => {
          return (
          <Grid item key={value._id} xs={4}>
            <FormControl size="large" sx={{width:"100%"}}>
              <InputLabel id={value._id}>{value.name}</InputLabel>
              <IHCSelect
                label={value.name}
                labelId={value._id}
                value={selections[index]?selections[index]:''}
                onChange={(e) => handleOnChangeSelection(e,index)}
                sx={{width:'100%'}}
              >
                {options[index]?.map( (subcategory, idx) => {
                      return (
                        <MenuItem key={subcategory._id} value={subcategory._id}>{subcategory.name}</MenuItem>
                      )
                } )
                }
              </IHCSelect>
            </FormControl>
          </Grid>
          )
        })
          : null
        }


          <Grid item xs={6}>
            <IHCTextField multiline onChange={handleOnChangeMain} rows={6} value={instrument.main} id='mainlb' label='Main Idea' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={6}>
            <IHCTextField multiline rows={6} id='generallb' onChange={handleOnChangeGeneral} value={instrument.general} label='General Procedure' sx={{width:'100%'}}></IHCTextField>
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={2}>
            <IHCButtonRounded sx={{width:'100%'}} onClick={handleCancelButton} variant="text" color='secondary'>Cancel</IHCButtonRounded>
          </Grid>
          <Grid item xs={2}>
            <IHCButtonRounded sx={{width:'100%'}} onClick={handleEditButton} variant="contained">Edit</IHCButtonRounded>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  )
}
