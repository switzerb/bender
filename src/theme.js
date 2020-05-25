import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

export default theme;
