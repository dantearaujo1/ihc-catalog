import React , {useState} from 'react'

import Stack from "@mui/material/Stack"
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
      height={100}
      direction="row"
      alignItems="center"
      justifyContent="center"
      backgroundColor="primary.dark"
    >
      {buttons.map((value) => {
        return(
        <Stack>
          <Button variant="text" sx={{ml:2}}onClick={handleClick}>
            <Typography>
                {value}
            </Typography>
          </Button>
        </Stack>
        )
      })}
      <Stack>
        <Menu
          variant="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal:"left"
          }}
        >
            <MenuItem onClick={handleClose}>Hello</MenuItem>
        </Menu>
      </Stack>
    </Stack>
  )
}
