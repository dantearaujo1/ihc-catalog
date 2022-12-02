import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom'

import { IHCButtonRounded } from '../assets/ComponentStyle';

export default function MultiActionAreaCard(props) {
  const [title, setTitle] = useState(props.title)
  const [img, setImage] = useState(props.img)
  const [alt, setAlt] = useState(props.alt)
  const [link, setLink] = useState(props.link)
  const [content, setContent] = useState(props.content)
  const navigate = useNavigate();

  const handleClick = () =>{
    if(link){
      navigate(link);
      return;
    }
      navigate(0);
  }
  return (
    <Card sx={{ maxWidth: 500, minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img?img:"/helper-teal.png"}
          alt={alt?alt:"Tutorial Image representation"}
          style={{minHeight:0, height:"100%", width:"100%"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title?title:"How to use it?"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content?content:"If you're struggling with our website applicattion enter here to see some of the actions we can do for you and how to find the best instrument for you"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ml:1, mb:2}}>
        <IHCButtonRounded mb={4} variant="contained" onClick={handleClick}>
          See more
        </IHCButtonRounded>
      </CardActions>
    </Card>
  );
}
