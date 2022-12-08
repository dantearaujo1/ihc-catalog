import React, {useState} from 'react'

import { IHCOutlinedInput } from '../../assets/ComponentStyle';
import Box from '@mui/material/Box';
import { IHCSelect } from '../../assets/ComponentStyle';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark
} from "@fortawesome/free-solid-svg-icons";

export default function TagSelect(props) {
  const [selected, setSelected] = useState([]);
  const data = props.data;

  const handleChange = (event) => {
    const { target: {value} } = event;
    setSelected( typeof value === 'string' ? value.split(',') : value);
    const obj = {
      category: {
        id: props.cat._id,
        name: props.cat.name,
        selections: value
      }
    }
    props.handler(obj);
  };

  const handleDelete = (e, value) => {
    const result = selected.filter( (name) => name !== value );
    setSelected(result);
    const obj = {
      category: {
        id: props.cat._id,
        name: props.cat.name,
        selections: result
      }
    }
    props.handler(obj, true);
  }

  return (
    <div>
      <FormControl size="large" sx={{width:'100%', minWidth:250}}>
        <InputLabel id="multi-label"><Typography variant="body2">{props.cat?.name}</Typography></InputLabel>
          <IHCSelect
          size="lg"
          labelId="multi-label"
          id="multi-select"
          multiple
          value={selected}
          onChange={(event) => { handleChange(event);}}
          input={<IHCOutlinedInput id="select-multiple-chip" label="multi-select" />}
          MenuProps={{
            disablePortal: true,
            sx: {
              height: '30%',
            }
          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value._id}
                  label={<Typography variant="body2">{value.name}</Typography>}
                  clickable
                  deleteIcon={<FontAwesomeIcon onMouseDown={(e) => e.stopPropagation()} icon={faCircleXmark}/>}
                  onDelete={(e) => {handleDelete(e,value)}}

                />
              ))}
            </Box>
          )}
        >
          {data?.map((item) => (
            <MenuItem
              key={item._id}
              value={item}
            >
              {item.name}
            </MenuItem>
          ))}
        </IHCSelect>
      </FormControl>
    </div>
  )
}
