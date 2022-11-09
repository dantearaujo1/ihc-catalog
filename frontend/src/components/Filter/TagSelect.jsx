import React, {useState} from 'react'

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

export default function TagSelect(props) {
  const [selected, setSelected] = useState([]);
  const data = props.data;

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;

    setSelected( typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <div>
      <FormControl size="medium" sx={{minWidth:190, mr: 2, mt: 2}}>
        <InputLabel id="multi-label">{props.placeHolder}</InputLabel>
          <Select
          size="lg"
          labelId="multi-label"
          id="multi-select"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="multi-select" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {data.map((item) => (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
