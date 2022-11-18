import React, {useState} from 'react'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const GroupBadge = () => {
  const [data, setData] = useState();
  return (
    <Stack spacing={0.5} width="auto">
      <Typography variant="h6">
        {data?data.category:"Category"}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" sx={{width:"auto", borderRadius:10}}>
          <Typography variant="h7">
            {data?data.subcategory:"SubCategory"}
          </Typography>
        </Button>
        <Button variant="contained" sx={{width:"auto", borderRadius:10}}>
          <Typography variant="h7">
            {data?data.subcategory:"SubCategory"}
          </Typography>
        </Button>
      </Stack>
    </Stack>

  )
}

export default GroupBadge
