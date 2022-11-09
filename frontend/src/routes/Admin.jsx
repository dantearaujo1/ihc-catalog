import React from 'react';
import {useState} from 'react'
import {Link} from 'react-router-dom';
import NavigationHeader from '../components/Navigation/NavigationHeader'

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return(
    <div>
      <NavigationHeader isAdmin={true}></NavigationHeader>
      <div className="menu-container">
        <Box sx={{
          width: '100%',
          backgroundColor: 'page.background.primary.main',
        }} >
          <Tabs value={value} onChange={handleChange}
            sx={{
              '& .MuiTab-textColorPrimary.Mui-selected': {
                color:'primary.light',
              },
              '& .MuiTab-textColorPrimary': {
                color:'text.content.main',
              },

            }}
            aria-label="nav tabs example"
            TabIndicatorProps={{
            style:{
              backgroundColor: '#00ddaa',
            }

          }}>
            <Tab component="a" label="Suggestions"  {...a11yProps(0)}/>
            <Tab component="a" label="Group Manager"  {...a11yProps(1)}/>
            <Tab component="a" label="Instrument Manager"  {...a11yProps(2)}/>
          </Tabs>
          </Box>
        <TabPanel value={value} index={0}><SuggestionList></SuggestionList></TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}><InstrumentManager></InstrumentManager></TabPanel>
      </div>
    </div>
  );
}

export default Admin
