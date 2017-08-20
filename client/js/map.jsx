import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    defaultCenter={{ lat: 49.28319989, lng: -123.1221468 }}
    onClick={props.onMapClick}
    defaultOptions={{
      disableDefaultUI: true,
      zoomControl: true,
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
          fillColor: "grey",
          fillOpacity: 10,
          strokeColor: "black",
          strokeOpacity: circle.opacity,
          strokeWeight: 10,
        }}
      />
    ))}

    {props.markers.map((marker, index) => (
        console.log(marker),
        <Marker
          {...marker}
          options={{ icon: {  url: "https://d30y9cdsu7xlg0.cloudfront.net/png/29388-200.png", 
                              scaledSize: new google.maps.Size(50, 50) }}}
          onClick={() => props.onMarkerClick(index)}
          onRightClick={() => props.onMarkerRightClick(index)}
          onDragEnd={(event) => console.log(event.latLng.lat(), event.latLng.lng())}
        >
          {/* {marker.showInfo && (
            <InfoWindow onCloseClick={() => console.log("WHATEVER")}>
              <div>YOOOOOOOOO</div>
            </InfoWindow>
          )} */}

        </Marker>
    ))
    }
  </GoogleMap>
));

export default GettingStartedGoogleMap
