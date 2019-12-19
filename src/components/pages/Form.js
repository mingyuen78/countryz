import React, { Component } from "react";
import CustomAppBar from "../widgets/CustomAppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoading: true
    };
    this.theme = createMuiTheme({
      palette: {
        primary: blueGrey
      }
    });
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <CustomAppBar loading={this.state.isLoading} title={"Form"} />
        <Box p={2}>
          <Typography variant="h5">This is WIP Form</Typography>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Form;
