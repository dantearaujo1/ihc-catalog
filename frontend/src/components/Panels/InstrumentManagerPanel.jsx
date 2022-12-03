import React from 'react'
import { useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton'
import Pagination from '@mui/material/Pagination';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, } from '@mui/x-data-grid';

import { IHCButtonRounded } from '../../assets/ComponentStyle'
import { IHCTextField } from '../../assets/ComponentStyle'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faSearch,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";




function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="secondary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function ListGrid(props) {

  return (
  <Stack justifyContent='center' sx={{width:'80vw', height:'70vh'}} mt={4}>
    <div style={{display:'flex', width:'100%', height:'100%'}}>
      <div style={{flexGrow:1}}>
        <DataGrid
          rows={props.rows?props.rows:[]}
          getRowId={(row) => {return (row._id)}}
          columns={props.columns?props.columns:[]}
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={props.selection}
          components={{
            Pagination: CustomPagination
          }}
          sx={{
            boxShadow: 8,
            borderRadius:2,
            '& .MuiDataGrid-footerContainer': {
              // backgroundColor:'#ff0000',
              justifyContent: 'center',
            }
          }}
        />
      </div>
    </div>
  </Stack>
        )
}

export default function InstrumentManagerPanel(props) {
  const theme = useTheme();
  const [selecteds,setSelecteds] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [textFilter, setTextFilter] = useState();

  const getArticles = async () => {
    const articles = await fetch("/api/v1/article/");
    const toJson = await articles.json();
    const ordered = toJson.sort( (a,b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    } )

    const withIndexID = ordered.map( (value, index) => {
      const article = {
        id:index,
        _id:value._id,
        name:value.name,
        reference:value.reference,
        year:value.year,
        main:value.main,
        general:value.general,
      }
      return article;
    })
    setArticleData(withIndexID);
  }

  useEffect( () => {
    const fetch_data = async () => {
      await getArticles();
    }
    fetch_data();
  }, [] )

  useEffect( () => {
    setFilteredData(articleData);
  }, [articleData] )

  const handleButtonClickAddPage = () => {
      props.showPanel[0](true);
  }
  const handleButtonClickEditPage = () => {
      props.showPanel[1](true);
  }
  const handleCheckboxSelection = (selectionModel, details) => {
    setSelecteds(selectionModel)
    console.log(selectionModel);
  }
  const handleTextFieldFilter = (event) => {
    setTextFilter(event.target.value);
    const filtered = articleData.filter( (value) => {
      return (value.name.toLowerCase().includes(event.target.value.toString().toLowerCase()));
    } )
    setFilteredData(filtered);
  }

  const handleRowAddIconClick = (e,params) => {
    e.stopPropagation();
    console.log(params);
  }
  const handleRowDeleteIconClick = (e,params) => {
    e.stopPropagation();
    console.log(params);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Instrument',
      minWidth: 600,
      width: 600,
      editable: false,
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      flex:0.5,
      headerAlign: 'center',
      align: 'center',
      editable: false,
    },
    {
      field: 'modifyDate',
      headerName: 'Last modified',
      type: 'number',
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
            <IconButton onClick={(e) => {handleRowAddIconClick(e,params)}}>
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
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    },
  ];


  return (
      <Stack alignItems='center'>
        <Stack direction='row' width='100%' spacing={4} justifyContent='space-between'>
          <Stack direction='row' spacing={4} justifyContent='flex-start'>
            <IHCButtonRounded onClick={handleButtonClickAddPage} variant="contained">
              <Typography>
                Add Instrument
              </Typography>
            </IHCButtonRounded>
            {(selecteds.length > 0) ?
                <IHCButtonRounded variant="contained" color='error' sx={{backgroundColor:'error.light'}}>
                  <Typography>
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
        <ListGrid rows={filteredData} columns={columns} selection={handleCheckboxSelection}></ListGrid>
      </Stack>
  )

}
