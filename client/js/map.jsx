import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={18}
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
    let info = props.markers.map(marker => marker.info);

      //Logic to separate busses from bus stops so they render with different icons
        
      if (marker.stopId !== null && marker.stopId >= 1) {
        {/* let stopInfo = ""
      //Logic to ensure only bus stops with valid info are rendered
      if (marker.info !== undefined && marker.info.length > 0) {
        stopInfo = marker.info.map(route => {
          console.log("route direction:", route.Direction)
          return <div key={route.RouteNo}>
            {route.RouteNo} 
            {route.Schedules[0].Destination} 
            {route.Direction} 
            Leaving in: {route.Schedules[0].ExpectedCountdown} 
            minute(s) 
          </div>   
        })
      } */}

        return <Marker
          {...marker}
          options={{
            icon: {
              url: "../images/503.png",
              scaledSize: new google.maps.Size(50, 50)
            }
          }}
          onClick={() => props.onMarkerClick(marker)}
          onRightClick={() => props.onMarkerRightClick(index)}
        >
        </Marker>
      } else {

        console.log("from busses - info", info)
          return <Marker
            {...marker}
            showInfo="true"
            options={{
              icon: {
                url: "http://www.clker.com/cliparts/P/H/9/k/y/q/orange-bus-hi.png",
                scaledSize: new google.maps.Size(30, 30)
              }
            }}
            onClick={() => props.onMarkerClick(marker)}
            onRightClick={() => props.onMarkerRightClick(index)}
          >
            {marker.showInfo && (
              <InfoWindow>
                <div id="bus-info-window">007 WEST</div>
              </InfoWindow>
            )}
          </Marker>
            
        

      }
    })
    }
  </GoogleMap>
));

export default Map
