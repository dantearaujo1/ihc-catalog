import React, { useState, useEffect, Item } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faInbox, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { useTheme } from '@mui/material/styles'
import { IHCList } from '../../assets/ComponentStyle';
import { Collapse } from '@mui/material'


// TODO: tooltip should show categories from the groups
function Suggestion({ info, value, onChange }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };


  return (
    <IHCList>
      <ListItem>
        <Stack
          direction="row"
          width="100%"
          borderRadius="10px"
          alignItems="center"
          justifyContent="center"
          p="10px"
        >
          <Checkbox
            size="small"
            checked={value}
            onChange={onChange}
          >
          </Checkbox>
          <Typography color="text.content.dark" width="75%" textAlign="left">{info.title}</Typography>
          <Typography color="text.content.dark" width="75%" textAlign="left">{info.email}</Typography>
          <Typography color="text.content.dark" width="75%" textAlign="left">{info.sentDate}</Typography>
          <Stack alignItems="flex-start" direction="row">
            <Button variant='contained' size="small" sx={{ boxShadow: 'none', backgroundColor: '#fafafa', color: '#68B36B' }}>
              <Typography><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Typography>
            </Button>
            <Button variant="contained" size="small" sx={{ boxShadow: 'none', backgroundColor: '#fafafa', color: '#EA605D' }}>
              <Typography><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></Typography>
            </Button>
            <Button variant="contained"  onClick={handleClick} sx={{ boxShadow: 'none', backgroundColor: '#fafafa', color: 'text.primary' }}>
            {open ? <FontAwesomeIcon color="text.primary" icon={faAngleUp}/> : <FontAwesomeIcon color="text.primary" icon={faAngleDown}/>}
            </Button>
          </Stack>
        </Stack>
      </ListItem>
      <Collapse in={open} sx={{ paddingLeft: '40px' }}>
        <Stack alignItems="flex-start" direction="row">
          <Typography color="text.content.dark" width="50%" textAlign="left">Link</Typography>
          <Typography color="text.content.dark" width="50%" textAlign="left">Description</Typography>
        </Stack>
        <Stack alignItems="flex-start" direction="row">
          <Typography color="text.content.dark" width="50%" textAlign="left">{info.link}</Typography>
          <Typography color="text.content.dark" width="50%" textAlign="left">{info.description}</Typography>
        </Stack>
      </Collapse>
    </IHCList>
  )
};

export default function SuggestionList() {
  const theme = useTheme();
  //TODO: Remove local data to database
  const [sideMenu, setSideMenu] = useState(
    [
      {
        "title": "Inbox",
        "icon": faInbox,
        "color": "text.secondary"
      },
      {
        "title": "Pending",
        "icon": faEnvelope,
        "color": "secondary.main"
      },
      {
        "title": "Approved",
        "icon": faCheck,
        "color": "secondary.main"
      },
      {
        "title": "Disapproved",
        "icon": faXmark,
        "color": "secondary.main"
      }
    ]
  );
  const [data, setData] = useState([
    {
      title: "Expressing Experiences and Emotions (3E)",
      email: "emailqualquer2330@mail.com",
      sentDate: "12/10/2022",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S1071581906001935",
      description: "This paper presents experiences on using five different self-report methods, two adopted from literature and three self-created.",
      status: "approved",
      group: [
        {
          title: "Ux Qualities",
          color: "#00ff00",
          categorys: ["Category 1", "Category 3"]
        },
        {
          title: "Target",
          color: "#ff00ff",
          categorys: ["Category 1", "Category 5"]
        },
        {
          title: "Domain",
          color: "#00ffff",
          categorys: ["Category 2", "Category 6"]
        },
        {
          title: "Approach",
          color: "#ffff00",
          categorys: ["Category 3", "Category 8"]
        },
        {
          title: "Type",
          color: "#303030",
          categorys: ["Category 10", "Category 9"]
        },
      ],
    },
    {
      title: "Expressing Experiences and Emotions (3E)",
      email: "emailqualquer2330@mail.com",
      sentDate: "12/10/2022",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S1071581906001935",
      description: "This paper presents experiences on using five different self-report methods, two adopted from literature and three self-created.",
      status: "approved",
      group: [{
        title: "Target",
        color: "#ff00ff",
        categorys: ["Category 1", "Category 2"]
      },
      {
        title: "Domain",
        color: "#00ffff",
        categorys: ["Category 1", "Category 2"]
      }]
    }
  ]);
  const [isChecked, setCheckedState] = useState(new Array(data.length).fill(false));

  const handleSelected = (position) => {
    const updateCheckedState = isChecked.map((item, index) => {
      return (index === position ? !item : item);
    });

    setCheckedState(updateCheckedState);
  }
  return (
    <IHCList>
      <Stack direction="row" width="90%" backgroundColor="transparent" alignItems="center" divider={<Divider orientation="horizontal" flexItem />}>
        <Stack width="10%" sx={{ borderRight: "2px solid", borderColor: theme.palette.text.disabled }} >
          {sideMenu.map((item, index) => {
            return (
              <Stack m={2} width="100%">
                <Typography color={item.color} variant="buttonMedium">
                  <FontAwesomeIcon icon={item.icon} /> {item.title}
                </Typography>
                <Divider orientation="horizontal" flexItem width="80%" />
              </Stack>
            )
          })}
        </Stack>
        <Stack width="90%" direction="column">
          <Stack alignItems="flex-start" gap={3} direction="row" pl={4} pb={4}>
            <Button variant='contained' size="small" sx={{ borderRadius: "20px", padding: "10px 20px" }}>
              <Typography variant="buttonMedium" color="#FFFFFF">Approve Selected</Typography>
            </Button>
            <Button variant='contained' size="small" sx={{ borderRadius: "20px", padding: "10px 20px", backgroundColor: "#EA605D" }}>
              <Typography variant="buttonMedium" color="FFFFFF">Disapprove Selected</Typography>
            </Button>
          </Stack>

          <Stack width="100%" boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" borderRadius="10px" sx={{ ml: 4 }} >
            {data.map((item, index) => {
              return <Suggestion info={item} value={isChecked[index]} onChange={() => handleSelected(index)}></Suggestion>
            })}
          </Stack>
        </Stack>
      </Stack>
    </IHCList>
  )

};

