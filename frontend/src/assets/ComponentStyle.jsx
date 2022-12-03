import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import OutlinedInput from '@mui/material/OutlinedInput'
import Menu from '@mui/material/Menu'
import Select from '@mui/material/Select'
import List from '@mui/material/List'

import { styled } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import themeOptions from './themes'


const theme = themeOptions;

const IHCButtonRounded = styled((Button))( ( { theme,variant } ) => ({
  borderRadius: 50,
  textTransform: "none",
  ...(variant === 'text' && {
  }),
  ...(variant === 'contained' && {
    backgroundColor: theme.palette.secondary.main,
  }),
}));

const IHCSelect = styled((Select))( ( { theme } ) => ({
      "&.MuiOutlinedInput-root": {
        // width: '200px',
        "& fieldset": {
          borderColor: theme.palette.effects.secondary.darker,
        },
        "&:hover fieldset": {
          borderColor: theme.palette.effects.secondary.lighter,
        },
        "&.Mui-focused fieldset": {
          borderColor:  theme.palette.effects.primary.darker,
        }
      }
}));

const IHCTextField = styled((TextField))( ( {theme} ) => ({
  "& .MuiOutlinedInput-root": {
    // width: '200px',
    "& fieldset": {
      borderColor: theme.palette.effects.secondary.darker,
      borderRadius: 50,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.effects.secondary.lighter,
    },
    "&.Mui-focused fieldset": {
      borderColor:  theme.palette.effects.primary.darker,
    }
  }
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
    backgroundColor: theme.palette.scrollbar.light,
    borderRadius: 8,
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: theme.palette.scrollbar.dark,
    minHeight: 24,
    // border: "3px solid",
    // borderColor: theme.palette.secondary.dark,
  },
  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
    backgroundColor: theme.palette.text.primary,
    // borderColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
    backgroundColor: theme.palette.text.primary,
    borderColor: theme.palette.scrollbar.light,
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.text.primary,
    borderColor: theme.palette.scrollbar.light,
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: theme.palette.scrollbar.light,
  },
}))

const IHCList = styled((List))( ( {theme} ) => ({
  // borderRadius: 50,
  // backgroundColor: theme.palette.background.default,
  // height: "30%",

  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    backgroundColor: theme.palette.scrollbar.light,
    borderRadius: 8,
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: theme.palette.scrollbar.dark,
    minHeight: 24,
    // border: "3px solid",
    // borderColor: theme.palette.secondary.dark,
  },
  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
    backgroundColor: theme.palette.text.primary
    // borderColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
    backgroundColor: theme.palette.text.primary
    // borderColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.text.primary
    // borderColor: theme.palette.primary.dark,
  },
  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    backgroundColor: theme.palette.scrollbar.light,
  },
}))


export { IHCButtonRounded, IHCTextField, IHCAutocomplete, IHCOutlinedInput, IHCMenu, IHCList, IHCSelect};
