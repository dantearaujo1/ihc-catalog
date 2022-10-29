import React from "react";
import TagSelect from "../components/Filter/TagSelect.jsx";
import NavigationHeader from "../components/Navigation/NavigationHeader";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import InstrumentAddModal from "../components/Modals/InstrumentAdd"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";


function Home() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState("");
  const [data_filtered, setDataFiltered] = useState();

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
  }, [filtered]);

  // This will work as our searchBar filter
  useEffect(() => {
    // Check if search bar is not Empty
    if (filtered !== "") {
      //Setting our data_filtered to only contains what is
      // in the searchBox
      setDataFiltered(
        data.filter((article) => {
          if (article.ux_instruments) {
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
      if (data.lenght !== 0) {
        setDataFiltered([]);
      }
    }
  }, [filtered]); /* This last parameters means that we gonna call useEffect
                      Everytime that filtered is diferrent;
  */
  return (
    <div>
      <NavigationHeader
        Filter={setFiltered}
        data={data_filtered ? data_filtered : data}
        isAdmin={false}
      ></NavigationHeader>
      <Stack
        justifyContent="center"
        alignItems="center"
        ml={28}
      >
        <Typography variant="h1" sx={{marginTop: 10 }}>
          This is Human Computer Interaction
        </Typography>
        <Typography
          variant="h3"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Find the better Instrument for your project
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center", marginTop: 5 }}
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
          placeHolder={"Domain"}
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
      <Stack sx={{ alignItems: "center", marginTop: 5 }}>
        <Button
          color="primary"
          variant="contained"
          sx={{ width: 0.2, height: "3rem", borderRadius: 50 }}
          startIcon={<FontAwesomeIcon color="#000000" icon={faMagnifyingGlass} />}
        >
          <Typography color="secondary.dark">Filter</Typography>
        </Button>
      </Stack>
      <InstrumentAddModal></InstrumentAddModal>
    </div>
  );
}

export default Home;
