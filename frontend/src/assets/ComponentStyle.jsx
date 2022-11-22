import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import OutlinedInput from '@mui/material/OutlinedInput'

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


export { IHCButtonRounded, IHCTextField, IHCAutocomplete, IHCOutlinedInput};
