import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

//Because same folder.
import CustomAppDrawer from "./CustomAppDrawer";
import MenuIcon from "@material-ui/icons/Menu";

class CustomAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      title: this.props.title,
      side: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading) {
      this.setState({ ...this.state, loading: this.props.loading });
    }
  }
  handleMenuClick = evt => {
    this.setState({ side: !this.state.side });
  };
  handleAboutClick = evt => {
    alert("ReactJS v1.0 Sample App");
  };
  handleAppDrawerClose = (evt, param) => {
    this.setState({ side: param.menuOpen });
  };
  render() {
    return (
      <Box>
        <CustomAppDrawer
          left={this.state.side}
          onClose={this.handleAppDrawerClose}
          onAboutClick={this.handleAboutClick}
        ></CustomAppDrawer>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={this.handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">{this.state.title}</Typography>
          </Toolbar>
          {this.state.loading && <LinearProgress />}
        </AppBar>
      </Box>
    );
  }
}

export default CustomAppBar;
