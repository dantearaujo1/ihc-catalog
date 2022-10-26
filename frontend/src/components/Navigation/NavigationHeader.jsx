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
    <Box className="nav-container">
        <Stack direction="row" spacing={2} marginLeft={3} marginRight={ 10 } justifyContent="space-between" className="nav-items" >
          <Typography variant="h1">
              TIHCI
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
              variant='standard'
              sx={{width: 0.9, left:20, borderRadius:50}}
              label="Search"
              placeholder="Instrument UX"
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
