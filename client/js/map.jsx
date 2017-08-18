import React from 'react';
import Ripples from 'react-ripples';
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    defaultCenter={{ lat: 49.28319989, lng: -123.1221468 }}
    onClick={props.onMapClick}
    defaultOptions={{
      disableDefaultUI: true,
      styles: require(`../js/MapStyles.json`),
    }}
  >

    {props.circles.map((circle, index) => (
      <Circle
        key={circle.key}
        clickable={false}
        center={circle.position}
        radius={circle.radius}
        options={{
          fillColor: "black",
          fillOpacity: 0,
          strokeColor: "black",
          strokeOpacity: circle.opacity,
          strokeWeight: 5,
        }}
      />
    ))}

    {props.markers.map((marker, index) => (
        <Marker
          {...marker}
          onClick={() => props.onMarkerClick(index)}
          onRightClick={() => props.onMarkerRightClick(index)}
          onDragEnd={(event) => console.log(event.latLng.lat(), event.latLng.lng())}
        />
    ))
    }
  </GoogleMap>
));

export default GettingStartedGoogleMap

