import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 49.2831119, lng: -123.1221468 }}
    onClick={props.onMapClick}
    defaultOptions={{
        styles: require(`../js/MapStyles.json`),
    }}>
  >

     {props.markers.map((marker, index) => ( 
       <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
        onDragEnd={(event) => console.log(event.latLng.lat(), event.latLng.lng())}
      />
     ))}  
  </GoogleMap>
));
// Then, render it:
export default GettingStartedGoogleMap

