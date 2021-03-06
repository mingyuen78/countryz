import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

//Because same folder.
import CustomAppDrawer from "./CustomAppDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import "./CustomAppBar.css";

class CustomAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      title: this.props.title,
      side: false,
      alert: this.props.alert
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading) {
      this.setState({ ...this.state, loading: this.props.loading });
    }
    if (this.props.alert !== prevProps.alert) {
      this.setState({ ...this.state, alert: this.props.alert });
    }
  }
  handleMenuClick = evt => {
    this.setState({ side: !this.state.side });
  };
  handleSnackBarClose = evt => {
    this.setState({ alert: false });
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
        <Backdrop open={this.state.loading} className="customScrim">
          <CircularProgress color="primary" className="customCircular" />
        </Backdrop>
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          key={`${"bottom"},${"center"}`}
          open={this.state.alert}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.alert}</span>}
        />
      </Box>
    );
  }
}

export default CustomAppBar;
