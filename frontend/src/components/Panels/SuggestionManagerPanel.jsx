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
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function SuggestionManagerPanel(props) {
  const theme = useTheme();
  const [selecteds,setSelecteds] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [textFilter, setTextFilter] = useState();

  const getSuggestions = async () => {
    const suggestions = await fetch("/api/v1/suggestion");
    const toJson = await suggestions.json();
    const ordered = toJson.sort( (a,b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    } )
    setSuggestionList(ordered);
  }

  useEffect( () => {
    const fetch_data = async () => {
      await getSuggestions();
    }
    fetch_data();
  }, [] )

  useEffect( () => {
    setFilteredData(suggestionList);
  }, [suggestionList] )

  const handleApproveSelectedsClick = () => {
      // props.showPanel[0](true);
  }
  const handleDisapproveSelectedsClick = () => {
      // props.showPanel[1](true);
  }
  const handleCheckboxSelection = (selectionModel, details) => {
    setSelecteds(selectionModel)
    console.log(selectionModel);
  }

  const handleTextFieldFilter = (event) => {
    setTextFilter(event.target.value);

    const filtered = suggestionList.filter( (value) => {
      return (value.name.toLowerCase().includes(event.target.value.toString().toLowerCase()));
    } )
    setFilteredData(filtered);
  }

  // TODO: Only update our row instead of all the data from the database
  const handleDisapproveRowClick = async (e,params) => {
    e.stopPropagation();
    props.dataHandler[2](params.row);
    await getSuggestions();
  }

  const handleApproveRowClick = async (e,params) => {
    e.stopPropagation();
    props.dataHandler[1](params.row);
    await getSuggestions();
  }
  const handleLookMoreRowClick = (e,params) => {
    e.stopPropagation();
    props.dataHandler[0](params.row);
    props.showDialog(true);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Suggestion',
      minWidth: 400,
      width: 400,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex:0.5,
      headerAlign: 'center',
      align: 'center',
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex:0.5,
      headerAlign: 'center',
      align: 'center',
      editable: false,
    },
    {
      field: 'sentDate',
      headerName: 'Sent date',
      type: 'date',
      flex:0.5,
      headerAlign: 'center',
      align: 'center',
      editable: false,
    },
    {
      field: 'edit',
      headerName: '',
      description: 'This column has a value getter and is not sortable.',
      minWidth:90,
      flex:0.2,
      align: 'center',
      sortable:false,
      disableColumnMenu:true,
      disableColumnFilter:true,
      renderCell: (params) => {
        return(
          <Stack direction="row">
            <IconButton onClick={(e) => {handleApproveRowClick(e,params)}}>
              <Typography variant="h6" color="green">
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </Typography>
            </IconButton>
            <IconButton onClick={(e) => {handleDisapproveRowClick(e,params)}}>
              <Typography variant="h6" color="red">
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </Typography>
            </IconButton>
            <IconButton onClick={(e) => {handleLookMoreRowClick(e,params)}}>
              <Typography variant="h6" color="black">
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </Typography>
            </IconButton>
          </Stack>
        )
      }
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    },
  ];


  return (
      <Stack alignItems='center'>
        <Stack direction='row' width='100%' spacing={4} alignItems='center' justifyContent='space-between'>
          <Stack direction='row' spacing={4} height='80%' justifyContent='flex-start'>
            <IHCButtonRounded sx={{backgroundColor:'success.main'}} onClick={handleApproveSelectedsClick} variant="contained">
              <Typography>
                Approve Selecteds
              </Typography>
            </IHCButtonRounded>
            {(selecteds.length > 0) ?
            <IHCButtonRounded sx={{backgroundColor:'error.light'}} onClick={handleDisapproveSelectedsClick} color='error' variant="contained">
              <Typography>
                Disapprove Selecteds
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
