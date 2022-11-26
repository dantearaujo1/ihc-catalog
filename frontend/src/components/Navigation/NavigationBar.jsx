import React , {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import { useTheme } from "@mui/material/styles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import { IHCMenu } from "../../assets/ComponentStyle"

export default function NavigationBar(props) {

  // TODO: add material-ui-popup-state for handle disabling focus

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  // Theses buttons should come from backend probablye
  const [cats, setCats] = useState();
  const [load, setLoad] = useState(false);
  const [subs, setSubs] = useState();
  const [menuItem, setMenuItem] = useState();
  const [open,setOpen] = useState([false,false,false,false,false]);
  const navigate = useNavigate();

  useEffect(() => {
    setCats(props.categories);
    setSubs(props.subcategories);

  }, [props.categories,props.subcategories]);

  useEffect( () => {
    const fetch_data = async () => {
      const categories = await fetch("/api/v1/article/cat/all");
      const ctoJson = await categories.json();
      const cordered = ctoJson.sort( (a,b) => { return  b.name < a.name ? 1 : b.name > a.name ? -1 : 0 } );
      const subcategories = await fetch ("/api/v1/article/sub/all");
      const stoJson = await subcategories.json();
      const sordered = stoJson.sort( (a,b) => { return  b.name < a.name ? 1 : b.name > a.name ? -1 : 0 } );

      // Setting data to data using useState
      setCats(cordered);
      setSubs(sordered);
    };
      fetch_data().catch(console.error);

  }, []  )

  const handleMenuClick = async (event,catID, index) => {
    setAnchorEl(event.currentTarget);
    let newArray = [...open];
    newArray[index] = true;
    setOpen(newArray);
    const list = subs.filter( (value) => {
      if( value.categoryID == catID ){
        return value;
      }
    } )
    setMenuItem(list);

  }
  const handleClose = (index) => {
    setAnchorEl(null);
    let newArray = [...open];
    newArray[index] = false;
    setOpen(newArray);
  }
  const handleItemClick = (id, index) => {
    handleClose(index);
    navigate('/result/' + id)
  }

  return (
    <Stack
      height={77} // WARN: PUT MAGIC NUMBER IS A GOOD IDEA?
      direction="row"
      width="100%"
      borderColor="primary.dark"
      alignItems="center"
      justifyContent="space-evenly"
      backgroundColor="primary.main"
      p="0px 72px 0px 72px"
    >
      {cats?cats.map((cat, index) => {
        return (
        <Stack key={cat._id} width="25%" alignItems="center">
          <Button  variant="text"  onClick={(event) => handleMenuClick(event, cat._id, index)}>
            <Typography variant="h6" component="h5" color="white">
                {
                  open[index]?
                    ( <FontAwesomeIcon  color={theme.palette.effects.primary.lighter} icon={faAngleDown} bounce></FontAwesomeIcon>)
                  :
                    ( <FontAwesomeIcon  color={theme.palette.white} icon={faAngleRight}></FontAwesomeIcon>)
                } {(cat.name)}
            </Typography>
          </Button>
        <IHCMenu
          variant="menu"
          anchorEl={anchorEl}
          elevation={0}
          sx={{height: "30%"}}
          PaperProps={{
            sx: {
              backgroundColor: "primary.dark",
              color: "white",
              borderTopLeftRadius:0,
              borderTopRightRadius:0,
              borderTop:0,
              mt: 2,
              width: '25%',
            }
          }}
          open={open[index]}
          onClose={() => handleClose(index)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal:"center"
          }}
          transformOrigin={{
            horizontal:"center",
            vertical:"top"
          }}
        >
        {menuItem?menuItem.map( (sub) => {
          return (
            <MenuItem key={sub._id} sx={{justifyContent:"center"}} onClick={() => {handleItemClick(sub._id, index)}}>
              <Typography variant="h7">{ sub.name }</Typography>
            </MenuItem>
          )
        } ):null}
        </IHCMenu>
        </Stack>
        )
      }):null}
    </Stack>
  )
}
