import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Form from "./components/pages/Form";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />

        <Router basename={"react"}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/form" component={Form} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
