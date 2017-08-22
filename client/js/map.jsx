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
      console.log(marker.stopId)
    if (marker.stopId !== undefined && marker.stopId >= 1 ) {
      let stopInfo = ""
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
// Use an if statement here to return either bus icon or bus stop icon
  
        return <Marker
          {...marker}
          options={{
            icon: {
              url: "https://d30y9cdsu7xlg0.cloudfront.net/png/29388-200.png",
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
      } else {
      return <Marker
          {...marker}
          options={{
            
            
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
