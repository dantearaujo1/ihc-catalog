import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"

import { IHCButtonRounded } from "../assets/ComponentStyle"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const ArticleCard = (props) => {
  const [data, setData] = useState(props.data);
  const [subHeaderData, setSubs] = useState();
  const [filterData, setFilterData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect( (  ) => {
    const fetch_data = async () => {
      const result = await fetch('/api/v1/article/fulldata/' + data.Article._id);
      const toJson = await result.json();
      const dataHeader = toJson.map( (value, index) => {
        return {
          categories:value.categories,
          subcategories:value.subcategories,
        }
      })
      setSubs(dataHeader[0]);
    }
    fetch_data();
    props?.matches(setFilterData);
  }, [data] )

  const handleClick = async (e,value) => {
    const result = await fetch('/api/v1/article/id/' + data.Article._id);
    const toJson = await result.json();
    navigate('../../instrument_detail', { state: { article: toJson } });
  }
  const handleTagClick = async (index) => {
    const sub = subHeaderData.subcategories[index];
    const cat = subHeaderData.categories[index];
    navigate("/result/" + sub._id, { state: {
      lookedFor: [{
        category:{
          id:cat._id,
          name:cat.name,
          selections:[{ _id:sub._id, name: sub.name, categoryID: sub.categoryID, }],
        },
      }],
    }})
  }

  const handleOpen = () => {
    console.log(data)
    setOpen(!open);
  }

  return (
    <Stack width="100%">
      <Stack alignItems="left" justifyContent='center'>
        <Card  sx={{ width: "auto", height: "auto", mr:9, ml:props.ml, borderRadius: 10, mt: 4}} >
          <CardHeader
            title={data?data.Article.name:"Title of the Instrument"}
            action={
              <IconButton onClick={handleOpen}>
                {open?<FontAwesomeIcon icon={faAngleUp}/>:<FontAwesomeIcon icon={faAngleDown}/>}
              </IconButton>
            }
            subheader={subHeaderData?
            <Stack mt={2} spacing={1} direction='row'>
              {subHeaderData.subcategories.map( (value, index) => {
                  let colorfull = false;
                  for (let idx = 0; idx < filterData.length; idx++) {
                    const element = filterData[idx];
                    if(element.name === value.name){
                      colorfull = true;
                    }
                  }

                  if(colorfull){
                    return (
                        <IHCButtonRounded key={value._id} onClick={() => handleTagClick(index)}variant='contained' sx={{backgroundColor:subHeaderData.categories[index].color}}>
                      <Typography color="black" variant="caption">
                            {value.name}
                      </Typography>
                    </IHCButtonRounded>
                    )
                  }
                  else{
                    return (
                        <IHCButtonRounded key={value._id} onClick={() => handleTagClick(index)}variant='contained' sx={{backgroundColor:"text.disabled"}}>
                      <Typography color="black" variant="caption">
                            {value.name}
                      </Typography>
                    </IHCButtonRounded>
                    )

                  }
                } )}
              </Stack>
              :null}
            sx={{ml:2}}
          />
          <Collapse in={open} timeout='auto' unmountOnExit>
            <CardContent
              sx={{ml:5, }}
            >
              <Typography variant="body2">
                {data?data.Article.main:"Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IHCButtonRounded onClick={handleClick} variant="contained" sx={{ minHeight:50, ml:"auto", mr: 10, mb: 4 }}>
                <Typography variant="buttonMedium" pr={2}>Read more</Typography>
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
              </IHCButtonRounded>
            </CardActions>
          </Collapse>
        </Card>
      </Stack>
    </Stack>
  )
}

export default ArticleCard;
