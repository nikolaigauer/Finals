import React, { Component } from 'react';
import Request from 'react-http-request';
import _ from 'lodash';
// import { Markers } from 'react-google-maps'
import GettingStartedGoogleMap from "./map.jsx";
import stops from '../../server/db/json/stops.js';
import '../scss/application.scss';

function getBusStopMarkers(stops) {
  return stops.map((stop) => {
    return createMarker(stop.lat, stop.long)
  });
}

function createMarker(lat, lng) {
 return {
   position: {
     lat: lat,
     lng: lng,
   },
   draggable: false,
   key: Math.random(),
   defaultAnimation: 2,
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
       createMarker(49.2831119, -123.1221468),
       ...getBusStopMarkers(stops.slice(0,1))
     ]
   }
   this.currentPosition = 0
 }

 handleMarkerDrop(e) {
   console.log(e.latLng.lat(), e.latLng.lng())
   const lat = e.latLng.lat()
   const lng = e.latLng.lng()

   const newMarkers = this.state.markers;
   newMarkers[this.currentPosition].position = {
     lat: lat,
     lng: lng,
   }

   const newCircles = this.state.circles.concat(createCircle(lat, lng))

   this.setState({
     circles: newCircles,
     markers: newMarkers,
     lat: lat,
     lng: lng,
   }, this.startAnimation.bind(this))
 }

 startAnimation() {
   if (this.animating) return;
   this.animating = true;
   this.tick();
 }

 tick() {
   let newCircles = this.state.circles
   newCircles.forEach(circle => {
     circle.radius += 500/60
     circle.opacity -= 1/60
   })
   newCircles = newCircles.filter(circle => circle.opacity > 0)
   this.setState({
     circles: newCircles
   }, () => {
     this.animating = newCircles.length > 0
     if (this.animating) {
       requestAnimationFrame(this.tick.bind(this))
     }
   })
 }


 render() {
   const url = `http://localhost:3000/get_buses_in_proximity?lat=${this.state.lat}&lng= ${this.state.lng}`;
   return (
     <div id="map-wrapper">
       <GettingStartedGoogleMap
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
         onMarkerClick={() => { console.log("THIS IS THE QUERY") }}
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
