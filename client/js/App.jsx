import React, { Component } from 'react';

import _ from 'lodash';
// import { Markers } from 'react-google-maps'
import Map from "./map.jsx";
import stops from '../../server/db/json/stops.js';
import '../scss/application.scss';

// function getBusStopMarkers(stops) {
//   return stops.map((stop) => {
//     return createMarker(stop.lat, stop.long)
//   });
// }


function createMarker(lat, lng, stopId) {
  return {
    position: {
      lat: lat,
      lng: lng,
    },
    stopId: stopId,
    draggable: false,
    key: Math.random(),
    defaultAnimation: 2,
    showInfo: false,
    info: []
  }
}
function createCircle(lat, lng) {
  return {
    position: {
      lat: lat,
      lng: lng,
    },
    key: Math.random(),
    opacity: 1,
    radius: 0
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 49.2831119,
      lng: -123.1221468,
      circles: [],
      markers: [
        createMarker(49.2831119, -123.1221468, 12345)
      ],
    }
    this.currentPosition = 0
    this.stopClickHandler = this.stopClickHandler.bind(this)
  }

  handleMarkerDrop(e) {
    console.log(e.latLng.lat(), e.latLng.lng())
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    fetch(`http://localhost:3000/get_buses_in_proximity?lat=${lat}&lng=${lng}`)
      .then(response => response.json())
      .then((data) => {
        let location = this.state.markers.slice(0, 1);
        // location.position.lat = lat
        // location.position.lng = lng
        let stops = data.map(stop => {
          return createMarker(parseFloat(stop.lat), parseFloat(stop.lng), parseInt(stop.stop));
        })

        let newMarkers = [
          location,
          ...stops
        ]
        const newCircles = this.state.circles.concat(createCircle(lat, lng))

        this.setState({
          circles: newCircles,
          markers: newMarkers,
          lat: lat,
          lng: lng,
        }, this.startAnimation.bind(this))
      })
  }

  startAnimation() {
    if (this.animating) return;
    this.animating = true;
    this.tick();
  }

  tick() {
    let newCircles = this.state.circles
    let secondCircle = this.state.circles
    newCircles.forEach(circle => {
      circle.radius += 300 / 40
      circle.opacity -= 1 / 40
    })

    newCircles = newCircles.filter(circle => circle.opacity > 0)
    secondCircle = secondCircle.filter(circle => circle.opacity > 0)

    this.setState({
      circles: newCircles, secondCircle
    }, () => {
      this.animating = newCircles.length > 0
      if (this.animating) {
        requestAnimationFrame(this.tick.bind(this))
      }
    })
  }

  // Handles clicks on bus stops
  stopClickHandler(clickedMarker) {
    this.state.markers.forEach((marker, index) => {
      if (marker.stopId === clickedMarker.stopId) { 
        const newMarkers = [...this.state.markers];

        fetch(`http://localhost:3000/busStopRoutes?stopId=${marker.stopId}`)
          .then(response => response.json())
          .then((data) => {    
            //takes the index of the clicked marker
            newMarkers[index].showInfo = true;
            newMarkers[index].info = JSON.parse(data);
            console.log("from stopClick:", newMarkers[index].info.length)
            //passes in the new marker object
            this.setState({
              markers: newMarkers          
            })
          })
      }
    })
  };

  render() {
    const url = `http://localhost:3000/get_buses_in_proximity?lat=${this.state.lat}&lng=${this.state.lng}`;
    return (
      <div id="map-wrapper">
        <Map
          containerElement={
            <div style={{ height: "100%" }} />
          }
          mapElement={
            <div style={{ height: "100%" }} />
          }
          onMapLoad={_.noop}
          onMapClick={(event) => this.handleMarkerDrop(event)}
          circles={this.state.circles}
          markers={this.state.markers}
          onMarkerRightClick={() => { console.log("HELLO") }}
          onMarkerClick={ this.stopClickHandler }          
        />
      </div>
    )
  }
}

export default App;
