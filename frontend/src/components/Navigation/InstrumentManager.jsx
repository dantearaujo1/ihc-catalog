import React from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import { DataGrid } from '@mui/x-data-grid'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'Instrument',
    width: 600,
    editable: false,
  },
  {
    field: 'creationDate',
    headerName: 'Creation Date',
    width: 150,
    editable: false,
  },
  {
    field: 'modifyDate',
    headerName: 'Last modified',
    type: 'number',
    width: 150,
    editable: false,
  },
  {
    field: 'edit',
    headerName: '',
    description: 'This column has a value getter and is not sortable.',
    width: 'auto',
    renderCell: (params) => {
      return(
        <Stack direction="row">
          <IconButton>
            <Typography variant="h6" color="black">
              <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </Typography>
          </IconButton>
          <IconButton>
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

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', edit: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ManagementPanel = () => {

  return (
    <Stack width="80%" alignItems="center">
      <Box sx={{height:400, width:"80%"}}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Stack>
        )
}


export default function InstrumentManager(article_data) {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h1">Instrument Manager Tab</Typography>
      <ManagementPanel></ManagementPanel>
    </Stack>
  )
}
