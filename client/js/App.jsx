import React, { Component } from 'react';
// import { GoogleMap, Marker } from "react-google-maps";
import _ from 'lodash';
// import { Markers } from 'react-google-maps'
import GettingStartedGoogleMap from "./map.jsx"
import '../scss/application.scss';
const markers = [{
  position: {
    lat: 49.2831119, 
    lng: -123.1221468
  },
  key: 'Vancouver',
  defaultAnimation: 2,
  }];

const googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD0nqbNJan44IZwL91Jjg1BwA2kN4UKW1g"

export default function App() {
  return (
    <div>
      <GettingStartedGoogleMap
        containerElement={
          <div style={{ height: `800px` }} />
        }
        mapElement={
          <div style={{ height: `800px` }} />
        }
        onMapLoad={_.noop}
        onMapClick={_.noop}
        markers={markers}
        onMarkerRightClick={_.noop}
      />

    </div>
  )
}

