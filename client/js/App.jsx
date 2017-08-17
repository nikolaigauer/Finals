import React, { Component } from 'react';
// import { GoogleMap, Marker } from "react-google-maps";
import _ from 'lodash';
// import { Markers } from 'react-google-maps'
import GettingStartedGoogleMap from "./map.jsx";
import Formfields from "./formfields.jsx";

import '../scss/application.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          lat: 49.2831119, 
          lng: -123.1221468
    }
  }

  handleMarkerDrop(e) {
    console.log(e.latLng.lat(), e.latLng.lng())
    this.setState({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
  }

  render() {

    const markers = {
      position: {
        lat: this.state.lat,
        lng: this.state.lng
      },
      draggable: true,
      key: 'Vancouver',
      defaultAnimation: 2,
    }


    return (
      <div id="map-wrapper">
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={_.noop}
          onMapClick={(event) => this.handleMarkerDrop(event)}
          markers={[markers]}
          onMarkerRightClick={() => {}}
        />
        <Formfields/>

      </div>
    )
  }
}

export default App;