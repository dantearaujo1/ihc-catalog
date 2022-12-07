import React from 'react';
import {useState, useEffect} from 'react'
import NavigationHeader from '../components/Navigation/NavigationHeader'

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

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
          <Typography>{children}</Typography>
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const refreshToken = async () => {
    // TODO: Remove all the url from here
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

  // useEffect(() => {
  //   if(firstRender) {
  //     setFirstRender((prev)!firstRender);
  //     sendRequest().then((data) => setUser(data.user));
  //   }
  //   let interval = setInterval(() => {
  //     refreshToken().then(data=>setUser(data.user))
  //   }, 1000 * 35);
  //
  //   return () => clearInterval(interval);
  // }, []);

  return(
    <div>
      <NavigationHeader show={false}></NavigationHeader>
      <div className="menu-container">
        <Stack sx={{
          width: '100%',
          backgroundColor: 'primary.main',
          pl:6
        }} >
          <Tabs value={value} onChange={handleChange}
            sx={{
              '& .MuiTab-textColorPrimary.Mui-selected': {
                color:'secondary.dark',
              },
              '& .MuiTab-textColorPrimary': {
                color:'white',
              },

            }}
            aria-label="nav tabs example"
            TabIndicatorProps={{
            style:{
              backgroundColor: '#00ddaa',
            }

          }}>
            <Tab sx={{ml:12}} component="a" label="Subcategory Manager"  {...a11yProps(1)}/>
            <Tab component="a" label="Instrument Manager"  {...a11yProps(0)}/>
            <Tab component="a" label="Suggestion List"  {...a11yProps(2)}/>
          </Tabs>
          </Stack>
        <TabPanel value={value} index={0}><SubcategoriesManager></SubcategoriesManager></TabPanel>
        <TabPanel value={value} index={1}><InstrumentManager></InstrumentManager></TabPanel>
        <TabPanel value={value} index={2}><SuggestionManager></SuggestionManager></TabPanel>
      </div>
    </div>
  );
}

export default Admin
