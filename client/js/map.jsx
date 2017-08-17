import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 49.28319989, lng: -123.1221468 }}
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

