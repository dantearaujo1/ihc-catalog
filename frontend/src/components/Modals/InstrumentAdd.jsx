import React, { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import { IHCButtonRounded } from "../../assets/ComponentStyle";
import Box from "@mui/material/Box";
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenThanks = () => {setOpenThanks(true); setOpen(false);};
  const handleCloseThanks = () => setOpenThanks(false);

  useEffect(() => {
    setTimeout(() => {
      setOpenThanks(false);
    }, 5000);
  }, [openThanks]);

  return (
    <Box>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 32,
          bottom: 98
        }}
      >

      <Modal open={openThanks} onClose={handleCloseThanks} width="100%">
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={1}
            position="absolute"
            width="100%"
          >
              <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="center"
              gap="2rem"
              border="2px solid black"
              width="472px"
              paddingTop="2rem"
              paddingBottom="2rem"
              borderRadius="25px"
              backgroundColor="background.default"
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            >
              <Image width="156px" src="../../../sent-form-teal2.png"></Image>
              <Typography
                  textAlign="center"
                  fontWeight={700}
                  sx={{
                    fontSize: "40px !important",
                    fontFamily: "cabinet grotesk",
                    color: "secondary.main"

                  }}
                  >Thank you for your suggestion!</Typography>
              <Typography
                  textAlign="center"
                  fontWeight={400}
                  sx={{
                    fontSize: "16px !important",
                    fontFamily: "cabinet grotesk"

                  }}
               >We will evaluate the suggested instrument soon in order to add it to our catalog.</Typography>
            </Box>
          </Box>
      </Modal>

      <Modal open={open} onClose={handleClose} width="100%">
        <Stack
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={1}
          position="absolute"
          width="100%"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            gap="2rem"
            width="100%"
            paddingTop="2rem"
            paddingBottom="2rem"
            borderRadius="25px"
            backgroundColor="background.default"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          >

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" gap="15px">
              <Box display="flex" flexDirection="row">
                <Typography
                  textAlign="justify"
                  fontSize="24px"
                  fontWeight={700}
                  sx={{
                    fontFamily: "cabinet grotesk",
                    [`& span`]: {
                      color: "secondary.main"
                    }
                  }}
                >Didn't find what you're looking for? <span>Leave your suggestion.</span></Typography>
              </Box>

              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
                <TextField
                  required
                  label="E-mail"
                  sx={{
                    width: "75%",
                    mb: "10px",
                    [`& fieldset`]:{
                      border: "2px solid",
                      borderColor: "secondary.main",
                      borderRadius: "50px",
                    }
                  }}
                >
                </TextField>
                <TextField
                  required
                  label="Instrument name"
                  sx={{
                    width: "75%",
                    mb: "10px",
                    [`& fieldset`]:{
                      border: "2px solid",
                      borderColor: "secondary.main",
                      borderRadius: "50px",
                    }
                  }}
                >
                </TextField>
                <TextField
                  required
                  label="Reference link"
                  rows={1}
                  multiline
                  sx={{
                    width: "75%",
                    mb: "10px",
                    [`& fieldset`]:{
                      border: "2px solid",
                      borderColor: "secondary.main",
                      borderRadius: "50px",
                    }
                  }}
                >
                </TextField>
                <TextField
                  required
                  label="Description"
                  rows={2}
                  multiline
                  sx={{
                    width: "75%",
                    mb: "10px",
                    [`& fieldset`]:{
                      border: "2px solid",
                      borderColor: "secondary.main",
                      borderRadius: "20px",
                    }
                  }}
                >
                </TextField>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              width="90%"
            >
              <IHCButtonRounded
                onClick={handleClose}
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  margin: "10px",
                  color: "#000",
                  backgroundColor: "#fff",
                  boxShadow: "none"
                }}
              >
                <Typography color="button.text.light">Cancel</Typography>
              </IHCButtonRounded>
              <IHCButtonRounded
                variant="contained"
                onClick={handleOpenThanks}
                sx={{
                  borderRadius: "50px",
                  margin: "10px",
                }}
              >
                <Typography color="button.text.light">Send</Typography>


              </IHCButtonRounded>
            </Box>
          </Box>
        </Stack>
      </Modal>

      <IHCButtonRounded onClick={handleOpen} variant="contained" >
        <FontAwesomeIcon size="1x" icon={faLightbulb} beatFade />
        <Typography color="white" ml={3}> Leave a Suggestion </Typography>
      </IHCButtonRounded>
      </Box>
    </Box>
  );
}

export default InstrumentAddModal;

