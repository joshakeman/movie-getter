import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
 
const theme = createMuiTheme();
 
class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }
 
  handleClick(offset) {
    this.setState({ offset });

    this.props.flipPage(offset/20 + 1)
  }
 
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Pagination
          limit={20}
          offset={this.state.offset}
          total={this.props.total}
          onClick={(e, offset) => this.handleClick(offset)}
        />
      </MuiThemeProvider>
    );
  }
}

export default Paginator