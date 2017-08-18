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


    {props.markers.map((marker, index) => (
      <div className="marker-and-circle" key="div-time">
        <Marker
          {...marker}
          key="marker"
          onClick={() => props.onMarkerClick(index)}
          onRightClick={() => props.onMarkerRightClick(index)}
          onDragEnd={(event) => console.log(event.latLng.lat(), event.latLng.lng())}
        />
        <Ripples>
        <Circle
          id="circle"
          key="circle"
          onClick={() => ()}
          center={marker.position}
          radius={500}
          options={{
            fillColor: `#F4FF52`,
            fillOpacity: 0,
            strokeColor: `black`,
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
        </Ripples>
      </div>
    ))}
  </GoogleMap>
));

export default GettingStartedGoogleMap

