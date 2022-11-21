import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import OutlinedInput from '@mui/material/OutlinedInput'

import { styled } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import Theme from './themes'


const theme = Theme;

const IHCButtonRounded = styled((Button))( ( { theme } ) => ({
  borderRadius: 50,
  backgroundColor: "#000000",
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
  backgroundColor: "#ffffff",
  // color: "#ff0000",
  "& .MuiOutlinedInput-root": {
    borderRadius: 50,
  },
}))

const IHCOutlinedInput = styled((OutlinedInput))( ( {theme} ) => ({
  borderRadius: 50,
  backgroundColor: "#ffffff",
  color: "#000000",
  "& .MuiOutlinedInput-root": {
    borderRadius: 50,
  },
}))


export { IHCButtonRounded, IHCTextField, IHCAutocomplete, IHCOutlinedInput};
