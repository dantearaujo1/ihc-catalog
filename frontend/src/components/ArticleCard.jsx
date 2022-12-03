import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box"
import { IHCButtonRounded } from "../assets/ComponentStyle"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

const ArticleCard = (props) => {
  const [data, setData] = useState(props.data);
  const navigate = useNavigate();

  const handleClick = async (e,value) => {
    const result = await fetch('/api/v1/article/id/' + data.Article._id);
    const toJson = await result.json();
    navigate('../../instrument_detail', { state: { article: toJson } });
  }

  return (
    <Stack width="100%">
      <Stack alignItems="left">
        <Card  sx={{ width: "auto", height: "auto", mr:9, ml:props.ml, borderRadius: 10, mb: 4, mt: 4}} >
          <CardHeader
            title={data?data.Article.name:"Title of the Instrument"}
            subheader={data?data.Article.reference:"Subheader"}
            sx={{ml:5, mt:2, }}
          />
          <CardContent
            sx={{ml:5, }}
          >
            <Typography variant="h6">
              {data?data.Article.main:"Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IHCButtonRounded onClick={handleClick} variant="contained" sx={{borderRadius: 10, ml:"auto", mr: 10, mb: 4 }}>
              <Typography>Read more</Typography>
            </IHCButtonRounded>
          </CardActions>
        </Card>
      </Stack>
    </Stack>
  )
}

export default ArticleCard;
