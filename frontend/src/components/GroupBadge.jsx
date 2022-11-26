import React, {useState} from 'react'

import Stack from '@mui/material/Stack'
import { IHCButtonRounded } from '../assets/ComponentStyle'
import Typography from '@mui/material/Typography'

const GroupBadge = () => {
  const [data, setData] = useState();
  return (
    <Stack spacing={0.5} width="auto">
      <Typography variant="h6">
        {data?data.category:"Category"}
      </Typography>
      <Stack direction="row" spacing={2}>
        <IHCButtonRounded  variant="contained" sx={{width:"auto", borderRadius:10}}>
          <Typography variant="buttonSmall">
            {data?data.subcategory:"SubCategory"}
          </Typography>
        </IHCButtonRounded>
      </Stack>
    </Stack>

  )
}

export default GroupBadge
