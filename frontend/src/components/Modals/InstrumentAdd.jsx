import React from "react";

import Modal from "@mui/material/Modal";
// import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";


function InstrumentAddModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Box sx={{ width: "100vw", marginTop: 10 }}>
        <Button
          onClick={handleOpen}
          color="primary"
          variant="contained"
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: "4%",
            aspectRatio: "1/1",
            right: 30,
            bottom: 30,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <Typography color="text.content.dark">
            <FontAwesomeIcon size="lg" icon={faQuestion} />
          </Typography>
        </Button>
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
            border="5px solid black"
            width={3/4}
            height={3/4}
            borderRadius="25px"
            backgroundColor="#FFFFFF"
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
                "& .MuiOutlinedInput-root":{
                  borderRadius:"10px",
                },
              }}
            >
            </TextField>
            <TextField
              label="Reference"
              sx={{
                width:"75%",
                mb: "10px",
                "& .MuiOutlinedInput-root":{
                  borderRadius:"10px",
                },
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
                "& .MuiOutlinedInput-root":{
                  borderRadius:"10px",
                },
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
                "& .MuiOutlinedInput-root":{
                  borderRadius:"10px",
                },
              }}
            >
            </TextField>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                variant="contained"
                sx={{
                  width:"40%",
                  borderRadius:"5px",
                  margin: "10px",
                }}
              >
              <Typography color="button.text.main">Ok</Typography>
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  borderRadius:"5px",
                  width:"40%",
                  margin: "10px"
                }}
              >
              <Typography color="button.text.main">Cancel</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default InstrumentAddModal;
