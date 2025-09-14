import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { cyan, deepOrange, orange, teal } from '@mui/material/colors';

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px',
  },
 colorSchemes: {
  light: {
    palette: {
      primary: teal,
      secondary: deepOrange    
    }, 
  },
  dark: {
    palette: {
      primary: cyan,
      secondary: orange
    }
  }
 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar' : {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#9da1a0ff',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({theme}) => ({
          color: theme.palette.primary.main,
          fontSize: '0.75rem',
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({theme}) => ({
          color: theme.palette.primary.main,
          fontSize: '0.75rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
            }
          },
          '& fieldset': {
            borderWidth: '1px !important',
          }
        })
      },
    },
  },

});

export default theme
