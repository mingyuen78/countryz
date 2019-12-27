import React, { Component } from "react";
import CustomAppBar from "../widgets/CustomAppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CAPIHelper from "../utils/CAPIHelper";

/* Third Party JS import */
import moment from "moment";
import SimpleReactValidator from "simple-react-validator";

class Form extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      error: null,
      items: [],
      isLoaded: false,
      isLoading: true,
      message: false,
      email: "",
      password: "",
      name: "",
      dob: this.generateToday(),
      country: "Malaysia",
      tnc: false
    };

    this.state = this.initialState;
    /* Initializing Validator */
    this.validator = new SimpleReactValidator();

    this.theme = createMuiTheme({
      palette: {
        primary: blueGrey
      }
    });
    this.APIHelper = new CAPIHelper();
    this.APIHelper.type = "default";
  }

  componentDidMount() {
    this.fetchCountryCode();
  }

  handleReset = () => {
    this.setState({
      email: "",
      password: "",
      name: "",
      dob: this.generateToday(),
      country: "Malaysia",
      tnc: false
    });
  };
  generateToday = () => {
    return moment(new Date()).format("YYYY-MM-DD");
  };
  handleChange = async evt => {
    await this.setState({
      [evt.currentTarget.id]: evt.target.value
    });
  };
  handleChecked = async evt => {
    await this.setState({
      [evt.target.id]: !this.state.tnc
    });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    // fetch(
    //   "<YOUR WEBSERVICE ENDPOINT URL>",
    //   {
    //     method: "post",
    //     headers: { "Content-Type": "application/json" },
    //     body: {
    //       email: this.state.email,
    //       password: this.state.password,
    //       name: this.state.name,
    //       dob: this.state.dob,
    //       tnc: this.state.tnc
    //     }
    //   }
    // )
    //   .then(res => res.json())
    //   .then(
    //     result => {
    //       this.setState({
    //         isLoaded: true,
    //         isLoading: false
    //       });
    //     },
    //     error => {
    //       this.setState({
    //         isLoaded: true,
    //         isLoading: false,
    //         error
    //       });
    //     }
    //   );
    if (this.validator.allValid()) {
      if (!this.state.tnc) {
        this.setState({
          message:
            "Please agree with terms and condition below before, submitting the form."
        });
      } else {
        this.setState({
          message: "Congratulation, registration details is submitted!"
        });
        let payLoad = {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          dob: this.state.dob,
          tnc: this.state.tnc
        };
        console.table(payLoad);
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  fetchCountryCode() {
    fetch(this.APIHelper.constructor.googleSheetURL())
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            isLoading: false,
            items: result.Result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            isLoading: false,
            error
          });
        }
      );
  }
  validationCallBack = type => {
    let resultReturn = false;
    switch (type) {
      case "Password":
        resultReturn = this.validator.message(
          "Password",
          this.state.password,
          "required|min:6"
        );
        break;
      case "Email":
        resultReturn = this.validator.message(
          "Email",
          this.state.email,
          "required|email"
        );
        break;
      case "Name":
        resultReturn = this.validator.message(
          "Full Name",
          this.state.name,
          "required|string|min:2"
        );
        break;
      default:
        resultReturn = false;
        break;
    }
    return resultReturn;
  };
  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <CustomAppBar
          loading={this.state.isLoading}
          title={"Form"}
          alert={this.state.message}
        />
        <Box p={2}>
          <Typography variant="h6">
            Experimental form with validation validation and thirdparty lib like
            moment.js and simple-react-validation.
          </Typography>
          <form
            noValidate
            autoComplete="off"
            className="customForm"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="email"
              label="Email"
              error={this.validationCallBack("Email")}
              helperText={this.validationCallBack("Email")}
              inputProps={{
                maxLength: 150,
                autoComplete: "new-password"
              }}
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="Your Email..."
              className="customInput"
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />

            <TextField
              id="password"
              label="Your Password..."
              type="password"
              error={this.validationCallBack("Password")}
              helperText={this.validationCallBack("Password")}
              inputProps={{
                maxLength: 20,
                autoComplete: "new-password"
              }}
              onChange={this.handleChange}
              value={this.state.password}
              className="customInput"
              placeholder="Password..."
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
            <TextField
              id="name"
              label="Full Name"
              type="text"
              error={this.validationCallBack("Name")}
              helperText={this.validationCallBack("Name")}
              className="customInput"
              inputProps={{
                maxLength: 150,
                autoComplete: "new-password"
              }}
              onChange={this.handleChange}
              value={this.state.name}
              fullWidth
              placeholder="Your Full Name..."
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="dob"
              label="Birthday"
              type="date"
              className="customInput"
              onChange={this.handleChange}
              value={this.state.dob}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
            />
            <Box className="customGap" />

            <Autocomplete
              className="customInput"
              id="country"
              options={this.state.items.map(option => option.Name)}
              value={this.state.country}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Country Name"
                  variant="outlined"
                  autoComplete="disabled"
                  fullWidth
                />
              )}
            />
            <Box className="customGap" />

            <FormControlLabel
              id="tnc"
              value="end"
              className="customInput"
              control={
                <Checkbox
                  color="primary"
                  id="tnc"
                  checked={this.state.tnc}
                  onClick={this.handleChecked}
                />
              }
              label="I hereby, agree upon Terms and Conditions below. Click on read more to see Terms and Conditions."
              labelPlacement="end"
            />
            <Box className="customGap" />

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Terms and Conditions</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Box className="customGap" />

            <Button
              variant="contained"
              type="submit"
              color="primary"
              className="customSpacingRight"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleReset}
            >
              Reset
            </Button>
          </form>
        </Box>
      </ThemeProvider>
    );
  }
}

export default Form;
