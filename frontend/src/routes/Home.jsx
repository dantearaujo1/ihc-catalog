import React from "react";
import TagSelect from "../components/Filter/TagSelect.jsx";
import NavigationHeader from "../components/Navigation/NavigationHeader";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import InstrumentAddModal from "../components/Modals/InstrumentAdd"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";


function Home() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState("");
  const [data_filtered, setDataFiltered] = useState([]);

  // Getting data from the backend
  // WARN: we should use useQuery hook for this
  useEffect(() => {
    const fetch_data = async () => {
      const data = await fetch("/api/v1");
      const json = await data.json();
      // Setting data to data using useState
      setData(json.complete_detailed_list);
    };
    fetch_data().catch(console.error);
  }, []);

  // This will work as our searchBar filter
  useEffect(() => {
    // Check if search bar is not Empty
    if (filtered !== "") {
      //Setting our data_filtered to only contains what is
      // in the searchBox
      setDataFiltered(
        data.filter((article) => {
          if (article.ux_instruments) {
            console.log(filtered);
            return article.ux_instruments
              .toLowerCase()
              .includes(filtered.toLowerCase());
          }
        })
      );
    }
    // if searchBar is empty we should set our full data to the list
    else {
      // checking if we already have some data
      setDataFiltered([]);
    }
  }, [filtered]); /* This last parameters means that we gonna call useEffect
                      Everytime that filtered is diferrent;
  */
  return (
    <Box style={{height:"100vh"}}>
      <NavigationHeader
        Filter={setFiltered}
        data={( data_filtered.length > 0 ) ? data_filtered : data }
        isAdmin={false}
      ></NavigationHeader>
      <Stack
        justifyContent="center"
        width="100%"
        alignItems="center"
        sx={{ m: "auto"}}
      >
        <Typography
          variant="h1"
          sx={{marginTop: 10 }}
        >
          UX Instruments Catalog
        </Typography>
        <Typography
          variant="h4"
          color="text.content.light"
        >
          Combine categories and find the best UX Evaluation Methods for your project
        </Typography>
      </Stack>
      <Stack>

      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ width: '100', flexWrap: "wrap",  alignItems: "center", marginTop: 10, paddingLeft: 14, paddingRight: 14  }}
      >
        <TagSelect
          data={[
            "Children",
            "Older",
            "All type of Users",
            "Jornalists",
            "Consumers",
            "People with disabilities",
            "Role-Specific",
          ].sort()}
          placeHolder={"Target"}
        ></TagSelect>
        <TagSelect
          data={[
            "Application-independent",
            "Online Plataform",
            "Mobile",
            "Audiovisual",
          ].sort()}
          placeHolder={"Application Domain"}
        ></TagSelect>
        <TagSelect
          data={[
            "Questionary",
            "Two-dimensional Diagrams/Graphs area",
            "Scale",
            "Pshychophysiology",
            "Post-test Picture/Object",
          ].sort()}
          placeHolder={"Type"}
        ></TagSelect>
        <TagSelect
          data={["Qualitative", "Quantitative", "Quali-Quantitative"].sort()}
          placeHolder={"Approach"}
        ></TagSelect>
        <TagSelect
          data={[
            "Aesthetics",
            "Affect",
            "Appreaisal",
            "Aspects of Game Experience",
          ].sort()}
          placeHolder={"Quality UX"}
        ></TagSelect>
      </Stack>
      <Stack sx={{ alignItems: "center", marginTop: 6 }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ backgroundColor: "#000000", minWidth: 160, height: "3rem", borderRadius: 50 }}
          startIcon={<FontAwesomeIcon color="text.content.white" icon={faMagnifyingGlass} />}
        >
          <Typography color="text.content.white" sx={{textTransform:'none'}}>Search</Typography>
        </Button>
      </Stack>
      <InstrumentAddModal></InstrumentAddModal>
    </Box>
  );
}

export default Home;
