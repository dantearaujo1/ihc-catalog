import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { IHCAutocomplete } from '../../assets/ComponentStyle';
import { IHCTextField } from '../../assets/ComponentStyle';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

function NavigationHeader({data, show}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [art, setArt] = useState();

  const getArticles = async () => {
    const articles = await fetch("/api/v1/article/");
    const toJson = await articles.json();
    const ordered = toJson.sort( (a,b) => {
      return (b.name < a.name ? 1 : b.name > a.name ? -1 : 0);
    } )
    setArt(ordered);
  }

  useEffect( () => {
    const fetch_data = async () => {
      await getArticles();
    }
    if(show){
      fetch_data();
    }
  }, [] )

  const handleClickSelection = async (event, value) => {
    const fetching = await fetch("/api/v1/article/id/"+value._id);
    const article = await fetching.json();
    navigate('/instrument_detail', { state: {article : article} });
  }

  // Handle pressing enter with a random search inside search bar
  const handleEnterSelection = (event) => {
    // if(event.keyCode === 13){
    //   navigate('/instrument_detail', { state: { article: { Article: event.target, Categorys:[], Subcategorys:[]} } });
    //
    // }
  }

  return (
    <Stack
      className="nav-container"
      backgroundColor="primary.main"
      minHeight={77}
      height="auto"
      justifyContent="center"
      pl={19}
      pr={19}
    >
        <Stack
          direction="row"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="33%">
              <Typography color="white" variant="h3">
                <Link href="/" underline="hover" color="inherit">
                  HCI Catalog
                </Link>
              </Typography>
          </Box>
          <Box
            sx={{ width: "33%",  }}
          >
            {show?
            <IHCAutocomplete
              size='small'
              id="search-by-instrument"
              autoHighlight
              options={art?art:[]}
              getOptionLabel={(option) => option.name.toString()}
              onChange={handleClickSelection}
              // onKeyDown={handleEnterSelection}
              renderOption={(props,option,state) => {props.key = option._id; return <li {...props}>{option.name}</li>;}}
              renderInput={(params) => (
                <IHCTextField
                  {...params}
                  label={<Typography variant="button">Search</Typography>}
                  sx={{
                    '& label.Mui-focused': {
                      color: 'black'
                    },
                  }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon color={theme.palette.primary.main} icon={faSearch}/>
                        </InputAdornment>
                      )
                    }}
                />
              )}/>
              :null}
          </Box>
          <Box width="33%" ></Box>
        </Stack>
      </Stack>
  )
}

NavigationHeader.defaultProps = {
  show: true,
}

export default NavigationHeader
