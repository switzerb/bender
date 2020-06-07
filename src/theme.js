import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00695c',
    },
    secondary: {
      main: '#3949ab',
    },
  },
  status: {
    danger: 'orange',
  },
});

export default theme;
