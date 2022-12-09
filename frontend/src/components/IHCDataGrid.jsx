import React from 'react'

import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector, } from '@mui/x-data-grid';



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

export default function IHCDataGrid(props) {

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
