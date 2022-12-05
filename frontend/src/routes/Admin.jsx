import React from 'react';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import NavigationHeader from '../components/Navigation/NavigationHeader'

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { useTheme } from '@mui/material/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import SuggestionList from '../components/Navigation/SuggestionList'
import InstrumentManager from '../components/Navigation/InstrumentManager'

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

  const theme = useTheme()

  const refreshToken = async () => {
    // TODO: Remove all the url from here
    const res = await fetch("api/v1/login/refresh", { credentials: 'include' }).catch(
      err => console.log(err)
    );
    const data = await res.data;
    return data;
  }

  const sendRequest = async () => {
    const res = await fetch("api/v1/login/user", { credentials: 'include' }).catch(
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

  return (
    <div>
      <NavigationHeader show={false}></NavigationHeader>
      <div className="menu-container">
        <Box sx={{
          width: '100%',
          backgroundColor: 'page.background.primary.dark',
        }} >
          <Tabs value={value} onChange={handleChange}
            sx={{
              backgroundColor: 'primary.main',
              '& .MuiTab-textColorPrimary.Mui-selected': {
                color: 'secondary.dark',
              },
              '& .MuiTab-textColorPrimary': {
                color: 'white',
              },
            }}
            aria-label="nav tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.secondary.dark,
              }
            }}>
            <Tab sx={{ ml: 12, mb: -1 }} component="a" label="Instrument Manager"  {...a11yProps(0)} />
            <Tab sx={{ mb: -1 }} icon={<FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>} iconPosition="start" label={<Typography variant="buttonMedium">Suggestions</Typography>} {...a11yProps(1)} />
            <Tab sx={{ mb: -1 }} component="a" label="Group Manager"  {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}><InstrumentManager></InstrumentManager></TabPanel>
        <TabPanel value={value} index={1}><SuggestionList></SuggestionList></TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
      </div>
    </div>
  );
}

export default Admin
