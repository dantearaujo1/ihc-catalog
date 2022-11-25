import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import OutlinedInput from '@mui/material/OutlinedInput'
import Menu from '@mui/material/Menu'

import { styled } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { themeOptions } from './themes'


const theme = themeOptions;

const IHCButtonRounded = styled((Button))( ( { theme } ) => ({
  borderRadius: 50,
  backgroundColor: theme.palette.primary.main,
  textTransform: "none",
}));

const IHCTextField = styled((TextField))( ( {theme} ) => ({
  borderRadius: 50,
  // backgroundColor: "#000000",
  // color: "#000000",
  // "& .MuiOutlinedInput-root": {
  //   borderRadius: 50,
  // },
}))

const IHCAutocomplete = styled((Autocomplete))( ( {theme} ) => ({
  borderRadius: 50,
  backgroundColor: theme.palette.background.default,
  "& .MuiOutlinedInput-root": {
    borderRadius: 50,
  },
  "&:hover": {
    // borderRadius: "50px",
    // backgroundColor: theme.palette.background.default,
  },
}))

const IHCOutlinedInput = styled((OutlinedInput))( ( {theme} ) => ({
  borderRadius: 50,
  backgroundColor: theme.palette.background.default,
  height: "30%",

  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      // borderColor: theme.palette.success.main,
    },
    "&:hover fieldset": {
      // borderColor: theme.palette.primary.dark,
    },
    "&.Mui-focused fieldset": {
      // borderColor: theme.palette.warning.light,
    },

  },
  "&:hover": {
    // borderRadius: "50px",
    // backgroundColor: theme.palette.background.default,
  },
}))

const IHCMenu = styled((Menu))( ( {theme} ) => ({
  // borderRadius: 50,
  // backgroundColor: theme.palette.background.default,
  // height: "30%",

  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: theme.palette.secondary.light,
    minHeight: 24,
    border: "3px solid",
    borderColor: theme.palette.secondary.dark,
  },
  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: "#2b2b2b",
  },
}))


export { IHCButtonRounded, IHCTextField, IHCAutocomplete, IHCOutlinedInput, IHCMenu};
