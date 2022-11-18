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
      height={88}
      alignItems="center"
    >
        <Stack
          direction="row"
          height="100%"
          backgroundColor="page.background.primary.main"
          justifyContent="space-around"
          alignItems="center"
          className="nav-items"
        >
        <Box width="33%">
          <Typography color="secondary"  ml={9} variant="h4">
              HCI-Catalog
          </Typography>
        </Box>
        <Box
          sx={{ width: "33%",  }}
        >
          {data?
          <Autocomplete
            size='small'
            id="search-by-instrument"
            options={data}
            getOptionLabel={(option) => option.name.toString()}
            onChange={(e,value) => {if(value !== null) console.log(value._id);}}
            onInputChange={(e) => Filter(e.target.value)}
            renderOption={(props,option,state) => {props.key = option._id; return <li {...props}>{option.name}</li>;}}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                sx={{"& .MuiOutlinedInput-root":{borderRadius:"50px"}}}
              />
            )}/>
          :null}
        </Box>
        <Box width="33%" ></Box>

        {/* <Box className="adm-button"> */}
        {/*   {isAdmin?<Link to="/"><FontAwesomeIcon icon={ faRightToBracket } size="sm"></FontAwesomeIcon></Link>:<Link to="/Login"><FontAwesomeIcon icon={ faLock } size="sm"></FontAwesomeIcon></Link>} */}
        {/* </Box> */}

        </Stack>
    </Box>
  )
}

export default NavigationHeader
