import React, { useState } from 'react'


import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faFilter,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

const SideFilter = () => {
  const theme = useTheme();
  const [panels, setPanels] = useState([]);

  return (
    <Stack width="20%" sx={{borderRight:"2px solid", borderColor:theme.palette.text.disabled}}>
      <Stack m={4} direction="row" spacing={2} width="100%" >
        <Typography color="text.secondary" variant="buttonMedium">
          <FontAwesomeIcon icon={faFilter}/> Filter
        </Typography>
      </Stack>
      <Accordion elevation={0} sx={{height:"5%", backgroundColor:"background.default", boxShadow:"none"}}>
        <AccordionSummary expandIcon={<FontAwesomeIcon color={theme.palette.secondary.main} icon={faAngleDown}/> } color="secondary">
          <Typography color={ theme.palette.secondary.main } variant="button">
             Category
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <Checkbox color="secondary"></Checkbox>
              <ListItemText>
                <Typography color="text.secondary" variant="inputLabel">
                  SubCategory
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <Checkbox color="secondary"></Checkbox>
              <ListItemText>
                <Typography color="text.secondary" variant="inputLabel">
                  SubCategory
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}

export default SideFilter
