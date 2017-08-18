import React, { Component } from 'react';
// import { GoogleMap, Marker } from "react-google-maps";
import _ from 'lodash';
// import { Markers } from 'react-google-maps'
import GettingStartedGoogleMap from "./map.jsx";
// import styles
import '../scss/application.scss';
import Request from 'react-http-request';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          lat: '',
          lng: ''
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
    const busData = require('../../server/db/JSON/stops')
    return busData.map((b, i) => {
            return new google.maps.Marker({
            position: new google.maps.LatLng(b.lat, b.long),
            key: b.stop_code,
            draggable: false,
            // icon: '../../images/503.png'
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
     icon: '../../images/503.png'
    }

  const url = `http://localhost:3000/get_buses_in_proximity?lat=${this.state.lat}&lng= ${this.state.lng}`;
    return (

      <div id="map-wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <label>Sonar</label>
            </li>
            <form onSubmit={this.onSubmit}>
            <li>
              <input id="form-start" value={this.state.lat}/>
              <span className="glyphicon glyphicon-plus"></span>
            </li>
            <li>
              <input id="form-destination"
              value={this.state.lng}/>
            </li>
            </form>
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
        <Request
          url={ url }
          method='get'
          accept='application/json'
          verbose={true}
        >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div></div>;
            } else {
              return <div>{ JSON.stringify(result) }</div>;
            }
          }
        }
      </Request>
      </div>
    )
  }
}
export default App;
