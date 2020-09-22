import { createMuiTheme } from '@material-ui/core/styles';
import "typeface-nunito";

export const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#eaaad4',
        },
        secondary: {
          main: '#c6589f',
        },
        start: {
          main: '#24a85b',
        },
        stop: {
          main: '#dd4a4e'
        }
    },
    typography: {
        fontFamily: "Nunito",
    },
});