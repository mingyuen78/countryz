import React, { Component } from "react";
import Config from "../utils/Config";
import CustomAppBar from "../widgets/CustomAppBar";
import Box from "@material-ui/core/Box";
import ReactDataGrid from "react-data-grid";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoading: true,
      items: []
    };
    this.columns = [
      { key: "Name", name: "Name" },
      { key: "Code", name: "Code" },
      { key: "Latitude", name: "Latitude" },
      { key: "Longitude", name: "Longitude" }
    ];

    this.theme = createMuiTheme({
      palette: {
        primary: blueGrey
      }
    });
    this.style = {
      width: "100%",
      height: "400px",
      marginBottom: "20px"
    };
  }

  displayMarkers = () => {
    return this.state.items.map((item, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: item.Latitude,
            lng: item.Longitude
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  fetchCountryCode() {
    fetch(
      "https://script.google.com/macros/s/AKfycbyWx63L82e2DqT50ILpYL6rpGXakBaRteP-gzqdg-tnI1-xTEs/exec"
    )
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
  componentDidMount() {
    this.fetchCountryCode();
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <CustomAppBar loading={this.state.isLoading} title={"Home"} />
        <Box p={2}>
          <h3>List of Countries</h3>
          <p>
            Below are the list of countries with their country code and latitude
            and longitude given.
          </p>
          <ReactDataGrid
            style={{ overFlowX: "auto" }}
            columns={this.columns}
            rowGetter={index => this.state.items[index]}
            rowsCount={100}
            minHeight={400}
            resizable={true}
          />
          <p></p>
          <Box style={{ position: "relative" }}>
            <Map
              google={this.props.google}
              zoom={2}
              style={this.style}
              initialCenter={{ lat: 0, lng: 0 }}
            >
              {this.displayMarkers()}
            </Map>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: Config.getMapAPI()
})(Home);
