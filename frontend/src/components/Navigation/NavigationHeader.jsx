import "./NavigationHeader.css"
import {Link} from 'react-router-dom'

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faLock } from '@fortawesome/free-solid-svg-icons'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

function NavigationHeader({Filter, data, isAdmin}) {

  return (
    <Box
      className="nav-container"
      backgroundColor="page.background.primary.dark"
      alignItems="center"
      justifyContent="space-around"
    >
        <Stack
          direction="row"
          spacing={2}
          marginLeft={3}
          marginRight={ 10 }
          justifyContent="space-between"
          alignItems="center"
          className="nav-items"
        >
          <Typography color="primary" variant="h1">
              IHC-Catalog
          </Typography>
        <Box
          sx={{width: 0.3 }}
        >
          {data?<Autocomplete
          multiple
          size='small'
          id="search-by-instrument"
          options={data}
          getOptionLabel={(option) => option.ux_instruments.toString()}
          onInputChange={(e) => Filter(e.target.value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              sx={{"& .MuiOutlinedInput-root":{borderRadius:"50px"}}}
            />
          )}/>:null}
        </Box>
        <Box className="adm-button">
          {isAdmin?<Link to="/"><FontAwesomeIcon icon={ faRightToBracket } size="sm"></FontAwesomeIcon></Link>:<Link to="/Login"><FontAwesomeIcon icon={ faLock } size="sm"></FontAwesomeIcon></Link>}
        </Box>
        </Stack>
    </Box>
  )
}

export default NavigationHeader
