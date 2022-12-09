import React, { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import { IHCButtonRounded } from "../../assets/ComponentStyle";
import { IHCTextField } from "../../assets/ComponentStyle";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import themeOptions from "../../assets/themes";
import Image from "mui-image";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
} from "@fortawesome/free-regular-svg-icons";

const theme = themeOptions;


function InstrumentAddModal() {
  const [open, setOpen] = useState(false);
  const [openThanks, setOpenThanks] = useState(false);
  const [suggestion, setSuggestion] = useState( {
    name:'',
    email:'',
    link:'',
    description:'',
  } )
  const handleOpen = () => setOpen(true);

  const handleFormChangeName = (event) => {
    setSuggestion({
      ...suggestion,
      name:event.target.value
    })
  }
  const handleFormChangeEmail = (event) => {
    setSuggestion({
      ...suggestion,
      email:event.target.value
    })
  }
  const handleFormChangeLink = (event) => {
    setSuggestion({
      ...suggestion,
      link:event.target.value
    })
  }
  const handleFormChangeDescription = (event) => {
    setSuggestion({
      ...suggestion,
      description:event.target.value
    })
  }
  const handleClose = () => setOpen(false);
  const handleOpenThanks = () => {setOpenThanks(true); setOpen(false);};
  const handleCloseThanks = () => setOpenThanks(false);
  const sendSuggestion = async (req, res) =>{
    const method = {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(suggestion)
    }
    const fetching = await fetch('/api/v1/suggestion/', method);
    const result = await fetching.json();
    console.log(result);

    handleOpenThanks();
  }

  useEffect(() => {
    setTimeout(() => {
      setOpenThanks(false);
    }, 5000);
  }, [openThanks]);

  return (
    <Stack  alignItems="center" justifyContent="center">
      <Stack justifyContent="center" alignItems="center" sx={{ position: "fixed", right: 32, bottom: 80 }} >
        <Modal open={openThanks} onClose={handleCloseThanks} width="100%">
          <Stack alignItems="center" height="100%" justifyContent="center" >
            <Stack
              alignItems="center"
              gap="2rem"
              width="30%"
              p={4}
              spacing={3}
              borderRadius="25px"
              backgroundColor="background.default"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
              <Image fit='scale-down' width="60%" height="60%" src="../../../sent-form-teal2.png"></Image>
              <Typography
                  variant="h4"
                  textAlign="center"
                  color="secondary.main"
                  >Thank you for your suggestion!</Typography>
              <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >We will evaluate the suggested instrument soon in order to add it to our catalog.</Typography>
            </Stack>
          </Stack>
        </Modal>

        <Modal style={{display:'flex', alignItems:"center", justifyContent:"center"}} open={open} onClose={handleClose} width="100%" height="100%">
          <Stack p={4} sx={{borderRadius:10}} backgroundColor="background.default" >
              <Stack flexDirection="column" alignItems="center" justifyContent="center" width="100%" gap="15px">
              <Stack width="70%">
                <Typography variant="h3" textAlign="center"
                  sx={{
                    [`& span`]: {
                      color: "secondary.main"
                    }
                  }}
                >Didn't find what you're looking for? <span>Leave your suggestion.</span>
              </Typography>
              </Stack>

                <Stack spacing={3} flexDirection="column" alignItems="center" justifyContent="center" width="100%">
                  <IHCTextField
                    required
                    sx={{width:"100%"}}
                    label="E-mail"
                    value={suggestion?.email}
                    onChange={handleFormChangeEmail}
                  >
                  </IHCTextField>
                  <IHCTextField
                    required
                    sx={{width:"100%"}}
                    label="Instrument name"
                    value={suggestion?.name}
                    onChange={handleFormChangeName}
                  >
                  </IHCTextField>
                  <IHCTextField
                    required
                    sx={{width:"100%"}}
                    label="Reference link"
                    rows={1}
                    value={suggestion?.link}
                    onChange={handleFormChangeLink}
                    multiline
                  >
                  </IHCTextField>
                  <IHCTextField
                    required
                    sx={{
                      width:"100%",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderRadius: 6,
                        },
                      },
                    }}
                    label="Description"
                    value={suggestion?.description}
                    rows={2}
                    multiline
                    onChange={handleFormChangeDescription}
                  >
                  </IHCTextField>
                </Stack>

              <Stack
                direction='row'
                justifyContent="flex-end"
                alignItems="center"
                width="100%"
                mt={8}
                spacing={4}
              >
                <IHCButtonRounded onClick={handleClose} variant="text" >
                  <Typography variant="button" color="secondary">Cancel</Typography>
                </IHCButtonRounded>
                <IHCButtonRounded variant="contained" onClick={sendSuggestion} >
                  <Typography variant="button">Send</Typography>
                </IHCButtonRounded>
              </Stack>
            </Stack>
          </Stack>
        </Modal>

      <IHCButtonRounded onClick={handleOpen} sx={{backgroundColor:'transparent', border:"2px solid", borderColor:'secondary.main'}}  variant="filled" >
          <Typography  mr={1} variant="button" color="secondary.main">
            <FontAwesomeIcon size="1x" icon={faLightbulb} beatFade />
          </Typography>
          <Typography variant="button" color="secondary.main">
            Leave a Suggestion
          </Typography>
      </IHCButtonRounded>
      </Stack>
    </Stack>
  );
}

export default InstrumentAddModal;

