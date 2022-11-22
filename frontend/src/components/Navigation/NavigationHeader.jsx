import "./NavigationHeader.css"
import {useNavigate} from 'react-router-dom'

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { IHCAutocomplete } from '../../assets/ComponentStyle';
import { IHCTextField } from '../../assets/ComponentStyle';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link'

function NavigationHeader({Filter, data, show}) {
  const navigate = useNavigate();

  const handleClickSelection = () => {
    navigate('/instrument_detail');
  }
  const handleEnterSelection = (event) => {
    if(event.keyCode === 13){
      // TODO: look inside database if there is some
      console.log("Pressed enter");
      navigate('/instrument_detail');

    }
  }

  return (
    <Box
      className="nav-container"
      backgroundColor="primary.main"
      height={88}
      alignItems="center"
    >
        <Stack
          direction="row"
          height="100%"
          justifyContent="space-around"
          alignItems="center"
          className="nav-items"
        >
        <Box width="33%">
            <Typography color="text.primary"  ml={9} variant="h4">
            <Link href="/" underline="hover" color="inherit">
                HCI-Catalog
              </Link>
            </Typography>
        </Box>
        <Box
          sx={{ width: "33%",  }}
        >
          {/* {data? */}
          {show?
          <IHCAutocomplete
            size='small'
            id="search-by-instrument"
            options={data}
            getOptionLabel={(option) => option.name.toString()}
            // onChange={(e,value) => {if(value !== null) navigate('/instrument_detail');}}
            onChange={handleClickSelection}
            onInputChange={(e) => Filter(e.target.value)}
              onKeyDown={handleEnterSelection}
            renderOption={(props,option,state) => {props.key = option._id; return <li {...props}>{option.name}</li>;}}
            renderInput={(params) => (
              <IHCTextField
                {...params}
                label="Search"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                      </InputAdornment>
                    )
                  }}
              />
            )}/>
            :null}
          {/* :null} */}
        </Box>
        <Box width="33%" ></Box>
      </Stack>
    </Box>
  )
}

NavigationHeader.defaultProps = {
  show: true,
}

export default NavigationHeader
