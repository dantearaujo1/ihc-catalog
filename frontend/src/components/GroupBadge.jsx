import React, { useState , useEffect } from 'react'

import Stack from '@mui/material/Stack'
import { IHCButtonRounded } from '../assets/ComponentStyle'
import Typography from '@mui/material/Typography'

import { useNavigate } from "react-router-dom";

const GroupBadge = ({category, subcategory}) => {
  const [data, setData] = useState({});
  const navigate= useNavigate();

  const handleClick = async () => {
    const split = data.subcategory.split('/');
    const joined = split.join('%2f');
    const query = await fetch('/api/v1/article/sub/n/' + joined);
    const toJson = await query.json();
    console.log(toJson);
    navigate('/result/' + toJson._id, {state: {lookedFor:[{category:{
      id:toJson.categoryID,
      selections:[{_id:toJson._id,name:data.subcategory,categoryID:toJson.categoryID}]
    }}]}});
  }

  useEffect( () => {
    setData({category:category, subcategory:subcategory});
  }, [] )

  return (
    <Stack spacing={1} mt={4} width="auto">
      <Typography variant="inputLabel">
        {data?data.category:"Category"}
      </Typography>
      <Stack direction="row" spacing={2}>
        <IHCButtonRounded  onClick={handleClick} variant="contained" sx={{width:"auto", borderRadius:10}}>
          <Typography variant="caption">
            {data?data.subcategory:"SubCategory"}
          </Typography>
        </IHCButtonRounded>
      </Stack>
    </Stack>

  )
}

export default GroupBadge
