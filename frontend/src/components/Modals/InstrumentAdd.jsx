import React from "react";

import Modal from "@mui/material/Modal";
import { IHCButtonRounded } from "../../assets/ComponentStyle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
} from "@fortawesome/free-regular-svg-icons";

import { useState, useEffect } from "react";


function InstrumentAddModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <IHCButtonRounded onClick={handleOpen} variant="contained" >
            <FontAwesomeIcon size="1x" icon={ faLightbulb } beatFade />
            <Typography color="white" ml={3}> Leave a Suggestion </Typography>
        </IHCButtonRounded>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={1}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            border="2px solid black"
            width={3/4}
            height={3/4}
            borderRadius="25px"
            backgroundColor="background.default"
          >
            <Typography
              textAlign="center"
              fontSize="24px"
            >
              Suggest an Instrument
            </Typography>
            <TextField
              label="Instrument Name"
              sx={{
                width:"75%",
                mb: "10px",
              }}
            >
            </TextField>
            <TextField
              label="Reference"
              sx={{
                width:"75%",
                mb: "10px",
              }}
            >
            </TextField>
            <TextField
              label="Main Idea"
              rows={3}
              multiline
              sx={{
                width:"75%",
                mb: "10px",
              }}
            >
            </TextField>
            <TextField
              label="General Procedure"
              rows={3}
              multiline
              sx={{
                width:"75%",
                mb: "10px",
              }}
            >
            </TextField>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <IHCButtonRounded
                variant="contained"
                sx={{
                  width:"40%",
                  borderRadius:"50px",
                  margin: "10px",
                }}
              >
              <Typography color="button.text.light">Ok</Typography>
              </IHCButtonRounded>
              <IHCButtonRounded
                onClick={handleClose}
                variant="contained"
                sx={{
                  borderRadius:"50px",
                  width:"40%",
                  margin: "10px"
                }}
              >
              <Typography color="button.text.light">Cancel</Typography>
              </IHCButtonRounded>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default InstrumentAddModal;
