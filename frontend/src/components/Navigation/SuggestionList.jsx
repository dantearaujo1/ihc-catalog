import React, { useState, useEffect, Item } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

// TODO: tooltip should show categories from the groups
function Suggestion({ info, value, onChange }) {
  return (
    <Stack
      direction="row"
      width="50%"
      border="1px solid black"
      borderRadius="10px"
      alignItems="center"
      justifyContent="center"
      mb={1}
    >
      <Checkbox
        checked={value}
        onChange={onChange}
      >
      </Checkbox>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        width="175px"
      >
        {info.group.map((item) => {
          var tooltipText = "";
          item.categorys.map((category) => {
              tooltipText = category + "\n"+ tooltipText
            }
          )
          return (
            <Stack direction="column" alignItems="center" justifyContent="flex-start" width="45px">
              <Typography fontSize="8px" textAlign="center">{item.title}</Typography>
              <Tooltip title={ <div style={{whiteSpace: 'pre-line'}}>{ tooltipText } </div>} sx={{maxWidth:20}}>
                <Box
                  sx={{ backgroundColor: item.color, borderRadius: "8px", width: "8px", height: "8px" }}
                />
              </Tooltip>
            </Stack>
          )
        })}
      </Stack>
      <Typography color="text.content.dark" width="75%" textAlign="left" ml={2} >{info.message}</Typography>
      <Button variant='contained' size="small"  sx={{minWidth: 0 ,width:"20px",minHeight: 0 ,height:"20px", borderRadius:"50px", marginRight:"10px"}}>
        <Typography color="status.success.main" m={2}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Typography>
      </Button>
      <Button variant='contained' color="primary" size="small"  sx={{minWidth: 0 ,width:"20px",minHeight: 0 ,height:"20px", borderRadius:"50px", marginRight:"10px"}}>
        <Typography color="status.error.main" m={2}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></Typography>
      </Button>
    </Stack>
  )
};

export default function SuggestionList() {

  //TODO: Remove local data to database
  const [data, setData] = useState([
    {
      message: "Instrument 1",
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
      message: "Instrument 2",
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
  const [ isChecked, setCheckedState ] = useState(new Array(data.length).fill(false));

  useEffect(() => { console.log(isChecked) }, [isChecked]);

  const handleSelected = ( position ) => {
    const updateCheckedState = isChecked.map( (item, index) => {
      return (index === position ? !item : item);
    } );

    setCheckedState(updateCheckedState);
  }

  return (
    <Stack backgroundColor="transparent"  alignItems="center">
      {data.map((item, index) => {
        return <Suggestion info={item} value={isChecked[index]} onChange={() => handleSelected(index)}></Suggestion>
      })}
    </Stack>
  )

};

