import React , {useState} from 'react'

import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

export default function NavigationBar() {

  const [anchorEl, setAnchorEl] = useState(null);
  // const [buttons, setButtons] = useState(["Hello"]);
  const buttons = ["Application Domain", "Approach", "Quality UX", "Target", "Type"];
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Stack
      height={56} // WARN: PUT MAGIC NUMBER IS A GOOD IDEA?
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-evenly"
      // TODO: Correct this color
      backgroundColor="page.background.primary.dark"
    >
      {buttons.map((value,index) => {
        return(
        <Stack width="25%" alignItems="center">
          <Button color="secondary" variant="text"  onClick={handleClick}>
            <Typography>
                {value}
            </Typography>
          </Button>
        <Menu
          variant="menu"
          anchorEl={anchorEl}
          elevation={0}
          PaperProps={{
            sx: {
              backgroundColor: "page.background.primary.dark",
              color: "secondary.main",
              borderTopLeftRadius:0,
              borderTopRightRadius:0,
              borderTop:0,
              mt: 0.5,
              width: '25%',
            }
          }}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal:"center"
          }}
          transformOrigin={{
            horizontal:"center",
            vertical:"top"
          }}
        >
          <MenuItem  sx={{justifyContent:"center"}} onClick={handleClose}>
            <Typography variant="h7">Test</Typography>
          </MenuItem>
        </Menu>
        </Stack>
        )
      })}
    </Stack>
  )
}
