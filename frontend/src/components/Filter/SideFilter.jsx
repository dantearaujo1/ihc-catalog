import React, { useState, useEffect } from 'react'

import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { IHCList } from '../../assets/ComponentStyle';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import {
  faFilter,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

const CategoryFilterMenu = (props) => {

  const [selecteds, setSelecteds] = useState([ false ]);
  const [open, setOpen] = useState(false);
  const [category, setCats] = useState();
  const [subs, setSubs] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetch_data = async (req, res) => {
      const data = await fetch('/api/v1/article/sub/c/name/' + props.category.name);
      const result = await data.json()
      setSubs(result);
      setSelecteds(new Array(result.length).fill(false));
    }
    fetch_data();
    setCats(props.category);

  }, [props.category]);


  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleCheck = (index) => {
    let newArray = [...selecteds];
    newArray[index] = !selecteds[index];
    setSelecteds(newArray);
    console.log(newArray);
  };

  // TODO: I Probablly should add and KEY FOR EACH CHILD in a LIST
  return (
    <IHCList key={category?._id}>
      <ListItem button onClick={handleClick}>
        <ListItemText primaryTypographyProps={{color:theme.palette.secondary.main, variant:"button"}}  primary={category?.name} />
        {open ? <FontAwesomeIcon color={theme.palette.secondary.main} icon={faAngleUp}/> : <FontAwesomeIcon color={theme.palette.secondary.main} icon={faAngleDown}/>}
      </ListItem>
      <Collapse key={category?._id} sx={{maxHeight:"250px", overflow:"auto"}} in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {subs?subs.map( (sub, index) => {
                return (
                  <ListItem key={sub._id}>
                    <Checkbox color="secondary" checked={selecteds[index]} onChange={ () => {handleCheck(index)} }></Checkbox>
                    <ListItemText primary={sub.name} />
                  </ListItem>
                )
              })
            :null
          }
        </List>
      </Collapse>
    </IHCList>
  )
}

const SideFilter = () => {
  const theme = useTheme();
  const [selecteds, setSelecteds] = useState();
  const [open, setOpen] = useState(true);
  const [categories, setCats] = useState([]);
  const [subs, setSubs] = useState();


  // WARN: I already do this in NavigationBar WE SHOULD USE useQuery
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

  }, []  );

  return (
    <Stack width="20%" sx={{borderRight:"2px solid", borderColor:theme.palette.text.disabled}}>
      <Stack m={4} direction="row" spacing={2} width="100%" >
        <Typography color="text.secondary" variant="buttonMedium">
          <FontAwesomeIcon icon={faFilter}/> Filter
        </Typography>
      </Stack>
      {categories? categories.map( (cat, idx) => {
          return (<CategoryFilterMenu key={cat._id} category={cat}></CategoryFilterMenu>)
        } ):null
      }

    </Stack>
  )
}

export default SideFilter
