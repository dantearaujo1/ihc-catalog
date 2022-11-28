import React, { useState , useEffect } from 'react'

import Stack from '@mui/material/Stack'
import { IHCButtonRounded } from '../assets/ComponentStyle'
import Typography from '@mui/material/Typography'

const GroupBadge = ({category, subcategory}) => {
  const [data, setData] = useState({});

  useEffect( () => {
    setData({category:category, subcategory:subcategory});
  }, [data] )

  return (
    <Stack spacing={1} mt={4} width="auto">
      <Typography variant="inputLabel">
        {data?data.category:"Category"}
      </Typography>
      <Stack direction="row" spacing={2}>
        <IHCButtonRounded  variant="contained" sx={{width:"auto", borderRadius:10}}>
          <Typography variant="caption">
            {data?data.subcategory:"SubCategory"}
          </Typography>
        </IHCButtonRounded>
      </Stack>
    </Stack>

  )
}

export default GroupBadge
