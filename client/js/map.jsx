import React from 'react'
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import Formfields from "./formfields.jsx";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 49.28319989, lng: -123.1221468 }}
    defaultDisableDefaultUI={true}
    defaultFullscreenControl={false}
    onClick={props.onMapClick}
    defaultOptions={{
      styles: require(`../js/MapStyles.json`),
    }}

  >

    {props.markers.map((marker, index) => (
      <div className="marker-and-circle">
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(index)}
          onDragEnd={(event) => console.log(event.latLng.lat(), event.latLng.lng())}
        />
        <Circle
          center={marker.position}
          radius={100}
          options={{
            fillColor: `red`,
            fillOpacity: 0.20,
            strokeColor: `red`,
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
        />
      </div>
    ))}
    <Formfields />
  </GoogleMap>
));

export default GettingStartedGoogleMap

