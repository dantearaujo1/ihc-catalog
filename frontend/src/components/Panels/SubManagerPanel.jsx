import React from 'react'
import { useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton'

import { IHCButtonRounded } from '../../assets/ComponentStyle'
import { IHCTextField } from '../../assets/ComponentStyle'
import IHCDataGrid from '../IHCDataGrid'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faSearch,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function SubManagerPanel(props) {
  const theme = useTheme();
  const [selecteds,setSelecteds] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [textFilter, setTextFilter] = useState();

  const getSubs = async () => {
    const subcategories = await fetch("/api/v1/article/sub/allf/");
    const toJson = await subcategories.json();
    const ordered = toJson.sort( (a,b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    } )

    const withIndexID = ordered.map( (value, index) => {
      const subcategory = {
        id:index,
        _id:value._id,
        name:value.name,
        category:value.categoryID,
      }
      return subcategory;
    })
    setSubcategoriesData(withIndexID);
  }

  useEffect( () => {
    const fetch_data = async () => {
      await getSubs();
    }
    fetch_data();
  }, [] )

  useEffect( () => {
    const fetch_data = async () => {
      await getSubs();
    }
    fetch_data();
  }, [props.refresh] )

  useEffect( () => {
    setFilteredData(subcategoriesData);
  }, [subcategoriesData] )

  const handleButtonClickAddPage = () => {
      props.showPanel[0](true);
  }
  const handleButtonClickRemoveSelecteds = () => {
    props.dataHandler(selecteds);
    props.showManyDialog(true);
  }

  const handleCheckboxSelection = (selectionModel, details) => {
    setSelecteds(selectionModel)
  }
  const handleTextFieldFilter = (event) => {
    setTextFilter(event.target.value);
    const filtered = subcategoriesData.filter( (value) => {
      return (value.name.toLowerCase().includes(event.target.value.toString().toLowerCase()));
    } )
    setFilteredData(filtered);
  }

  const handleRowEditIconClick = (e,params) => {
    e.stopPropagation();
    props.showPanel[1](true);
    props.dataHandler(params.row);
  }
  const handleRowDeleteIconClick = (e,params) => {
    e.stopPropagation();
    props.setRefresh( (prevState) => !prevState );
    props.dataHandler(params.row);
    props.showDialog(true);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Subcategory',
      minWidth: 600,
      width: 600,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex:0.8,
      headerAlign: 'left',
      align: 'left',
      editable: false,
      valueGetter: (params) => {
        return params.row.category.name
      }
    },
    {
      field: 'edit',
      headerName: '',
      description: 'This column has a value getter and is not sortable.',
      minWidth:90,
      flex:0.1,
      align: 'center',
      sortable:false,
      disableColumnMenu:true,
      disableColumnFilter:true,
      renderCell: (params) => {
        return(
          <Stack direction="row">
            <IconButton onClick={(e) => {handleRowEditIconClick(e,params)}}>
              <Typography variant="h6" color="black">
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
              </Typography>
            </IconButton>
            <IconButton onClick={(e) => {handleRowDeleteIconClick(e,params)}}>
              <Typography variant="h6" color="black">
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </Typography>
            </IconButton>
          </Stack>
        )
      }
    },
  ];


  return (
      <Stack alignItems='center'>
        <Stack direction='row' width='100%' spacing={4} alignItems='center' justifyContent='space-between'>
          <Stack direction='row' spacing={4} height='80%' justifyContent='flex-start'>
            <IHCButtonRounded onClick={handleButtonClickAddPage} variant="contained">
              <Typography variant="button">
                Add Subcategory
              </Typography>
            </IHCButtonRounded>
            {(selecteds.length > 0) ?
                <IHCButtonRounded onClick={handleButtonClickRemoveSelecteds} variant="contained" color='error' sx={{backgroundColor:'error.light'}}>
                  <Typography variant="button">
                    Remove Selecteds
                  </Typography>
                </IHCButtonRounded>
                :null
            }
          </Stack>
        <IHCTextField
          sx={{width:'40%'}}
          value={textFilter}
          onChange={handleTextFieldFilter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon color={theme.palette.primary.main} icon={faSearch}/>
              </InputAdornment>
            )
          }}
        />
        </Stack>
        <IHCDataGrid rows={filteredData} columns={columns} selection={handleCheckboxSelection}></IHCDataGrid>
      </Stack>
  )

}
