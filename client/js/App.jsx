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
          lat: null,
          lng: null
    }
  }

  handleMarkerDrop(e) {
    console.log(e.latLng.lat(), e.latLng.lng())
    this.setState({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
  }

  componentDidMount() {
    this.marker = this.createMarker()
  }

  createMarker() {
    const busData = require('../../db/JSON/stops')
    return busData.map((b, i) => {
            return new google.maps.Marker({
            position: new google.maps.LatLng(b.lat, b.long),
            key: b.stop_code,
            draggable: false,
            })
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
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <label>Sonar</label>
            </li>
            <li>
              <input id="form-start" value={this.state.lat}  />
              <span className="glyphicon glyphicon-plus"></span>
            </li>
            <li>
              <input id="form-destination"
              value={this.state.lng}/>
            </li>
          </ul>
        </div>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapClick={(event) => this.handleMarkerDrop(event)}
          markers={[markers]}
          // markers={[markers], this.createMarker()}
        />
      </div>
    )
  }
}
export default App;
