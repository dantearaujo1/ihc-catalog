import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

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
      setOpen(false);

      let arr = new Array(result.length);
      arr.fill(false);

      const category = props.applied.filter( (category, idx ) => {
        return (category.category.name === props.category.name)
      } );
      const selections = category?.flatMap( (cat, idx ) => {
        return (cat.category.selections);
      } );

      // Checking chekbox if they are in the search
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        for (let idx = 0; idx < selections.length; idx++) {
          const select = selections[idx];
          if (element.name === select.name){
            arr[index] = true;
            setOpen(true);
          }
        }
      }

      setSelecteds(arr);
    }
    fetch_data();
    setCats(props.category);

  }, [props.category, props.applied]);


  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleCheck = (index) => {
    let newArray = [...selecteds];
    newArray[index] = !selecteds[index];
    setSelecteds(newArray);
  };

  return (
    <IHCList>
      <ListItem button onClick={handleClick}>
        <ListItemText primaryTypographyProps={{color:theme.palette.secondary.main, variant:"button"}}  primary={category?.name} />
        {open ? <FontAwesomeIcon color={theme.palette.secondary.main} icon={faAngleUp}/> : <FontAwesomeIcon color={theme.palette.secondary.main} icon={faAngleDown}/>}
      </ListItem>
      <Collapse sx={{maxHeight:"250px", overflow:"auto"}} in={open} timeout="auto" unmountOnExit>
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
  const [categories, setCats] = useState([]);
  let { state } = useLocation();

  const getSubs = () => {

  }



  // WARN: I already do this in NavigationBar WE SHOULD USE useQuery
  useEffect( () => {
    const fetch_data = async () => {
      const categories = await fetch("/api/v1/article/cat/all");
      const ctoJson = await categories.json();
      const cordered = ctoJson.sort( (a,b) => { return  b.name < a.name ? 1 : b.name > a.name ? -1 : 0 } );

      setCats(cordered);
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
            return (
                <CategoryFilterMenu key={cat._id} applied={state.lookedFor} category={cat}></CategoryFilterMenu>
              )
          } ):null
        }

    </Stack>
  )
}

export default SideFilter
