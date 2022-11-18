import React, {useState} from "react";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

const ArticleCard = (props) => {
  const [data, setData] = useState({});
  return (
    <Box>
      <Stack alignItems="center">
        <Card  sx={{maxWidth: 1000, width: "auto", height: "auto", mr:props.mr, ml:props.ml, borderRadius: 10, mb: 4, mt: 4}} >
          <CardHeader
            title={data.title?data.title:"Title of the Instrument"}
            subheader={data.subheader?data.subheader:"Subheader"}
            sx={{ml:5, mt:2, }}
          />
          <CardContent
            sx={{ml:5, }}
          >
            <Typography variant="h6">
              {data.content?data.content:"Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button variant="contained" sx={{borderRadius: 10, ml:"auto", mr: 10, mb: 4 }}>
              <Typography>Read more</Typography>
            </Button>
          </CardActions>
        </Card>
      </Stack>
    </Box>
  )
}

export default ArticleCard;
