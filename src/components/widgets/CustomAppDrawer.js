import React, { Component } from "react";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";

class CustomAppDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.left
    };
    this.menu = [
      { label: "Home", value: "/", icon: <HomeIcon /> },
      { label: "Form", value: "/form", icon: <InboxIcon /> }
    ];
    this.about = [{ label: "About", value: "/about", icon: <InfoIcon /> }];
  }
  componentDidUpdate(prevProps) {
    if (this.props.left !== prevProps.left) {
      this.setState({ left: this.props.left });
    }
  }
  toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ [side]: open });
    //Bubble Props to parent
    this.props.onClose(event, { menuOpen: open });
  };
  generateSideList = side => (
    <div
      role="presentation"
      style={{ width: 250 }}
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <List>
        {this.menu.map((menuItem, index) => (
          <ListItem button key={index} component={Link} to={menuItem.value}>
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.label} path={menuItem.value} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {this.about.map((menuItem, index) => (
          <ListItem button key={index} onClick={this.props.onAboutClick}>
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  render() {
    return (
      <Drawer open={this.state.left} onClose={this.toggleDrawer("left", false)}>
        {this.generateSideList("left")}
      </Drawer>
    );
  }
}

export default CustomAppDrawer;
