import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={17}
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

    {props.markers.map((marker, index) => {
    //Logic to separate busses from bus stops so they render with different icons
    if (marker.stopId !== null && marker.stopId >= 1 ) {
      let stopInfo = ""
      //Logic to ensure only bus stops with valid info are rendered
      if (marker.info !== undefined && marker.info.length > 0) {
        stopInfo = marker.info.map(route => {
          console.log("route:", route.Direction)
          return <div key={route.RouteNo}>
            {route.RouteNo} 
            {route.Schedules[0].Destination} 
            {route.Direction} 
            Leaving in: {route.Schedules[0].ExpectedCountdown} 
            minute(s) 
          </div>   
        })
        console.log("stopInfo:", stopInfo)
      }
  
        return <Marker
          {...marker}
          options={{
            icon: {
              url: "../images/503.png",
            }
          }}
          onClick={() => props.onMarkerClick(marker)}
          onRightClick={() => props.onMarkerRightClick(index)}
        >
          {marker.showInfo && (
            <InfoWindow>
              <div>{stopInfo}</div>
            </InfoWindow>
          )} 
        </Marker>
      } else {
      return <Marker
          {...marker}
          options={{
            icon: {
              url: "https://maxcdn.icons8.com/Share/icon/p1em/Maps//street_view1600.png",
              scaledSize: new google.maps.Size(50, 50)
            }
            
            
          }}
          onClick={() => props.onMarkerClick(marker)}
          onRightClick={() => props.onMarkerRightClick(index)}
        >
          {marker.showInfo && (
            <InfoWindow>
              <div>{stopInfo}</div>
            </InfoWindow>
          )} 
        </Marker>
      }

      


    })
    }    
  </GoogleMap>
));

export default Map
