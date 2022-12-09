import React from 'react';
import {useState, useEffect} from 'react'
import NavigationHeader from '../components/Navigation/NavigationHeader'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faEnvelope,
  faList,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

import SuggestionManager from '../components/Navigation/SuggestionManager'
import InstrumentManager from '../components/Navigation/InstrumentManager'
import SubcategoriesManager from '../components/Navigation/SubcategoriesManager'

// Copied code from mui.com ==========================
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h1">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
// ===============================================

function Admin() {
  const [value, setValue] = useState(0);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const refreshToken = async () => {
    const res = await fetch("api/v1/login/refresh", {credentials:'include'}).catch(
      err => console.log(err)
    );
    const data = await res.data;
    return data;
  }

  const sendRequest = async () => {
    const res = await fetch("api/v1/login/user", {credentials:'include'} ).catch(
      err => console.log(err)
    );
    const data = await res.data;
    return data;
  }


  useEffect(() => {
    if(firstRender) {
      setFirstRender((prev) => !firstRender);
      sendRequest().then( (data) => setUser(data) ).then( () => {setLogged(true)});
    }
    let interval = setInterval(() => {
      refreshToken().then(data=>setUser(data))
    }, 1000 * 50);

    return () => clearInterval(interval);
  }, []);

  return(
    <div>
      <NavigationHeader show={false}></NavigationHeader>
      { logged &&
        <Box className="menu-container">
        <Stack sx={{ width: '100%', backgroundColor: 'text.primary', pl:6 }} >
          <Tabs value={value} onChange={handleChange}
            sx={{
              '& .MuiTab-textColorPrimary.Mui-selected': {
                color:'effects.primary.lighter',
              },
              '& .MuiTab-textColorPrimary': {
                color:'text.secondary',
              },

            }}
            aria-label="nav tabs example"
            TabIndicatorProps={{
            sx:{
              backgroundColor: 'effects.secondary.lighter',
            }

          }}>
            <Tab sx={{ml:12}} component="a" label={<Typography variant="h5"><Icon sx={{pr:4}}><FontAwesomeIcon icon={faSitemap}></FontAwesomeIcon></Icon>Subcategory Manager</Typography>}  {...a11yProps(1)}/>
            <Tab component="a" label={<Typography variant="h5"><Icon sx={{pr:4}}><FontAwesomeIcon icon={faList}></FontAwesomeIcon></Icon>Instrument Manager</Typography>}  {...a11yProps(0)}/>
            <Tab component="a" label={<Typography variant="h5"><Icon sx={{pr:4}}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon></Icon>Suggestion Manager</Typography>}  {...a11yProps(2)}/>
          </Tabs>
          </Stack>
        <TabPanel value={value} index={0}><SubcategoriesManager></SubcategoriesManager></TabPanel>
        <TabPanel value={value} index={1}><InstrumentManager></InstrumentManager></TabPanel>
        <TabPanel value={value} index={2}><SuggestionManager></SuggestionManager></TabPanel>
      </Box>
        }
        </div>
  );
}

export default Admin
