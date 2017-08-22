import React from 'react'

class Sidebar extends React.Component {
  render() {
    // Get info arrays and filter those that are truthy
    let info = this.props.markers.map(marker => marker.info).filter(Boolean);
    // Compact the array of arrays into a single one and then turn it into a div
    info = info.reduce((acc, infoArray) => acc.concat(infoArray), []).map((info, index) => {
      return <div id="stop-info">
        <h2>
          {info.RouteNo}
        </h2>
        <li>
          Direction: {info.Direction}
        </li>
        <li>
          Towards: {info.Schedules[0].Destination}
        </li>
        <li>
          Leaving in: {info.Schedules[0].ExpectedCountdown} minute(s)
         </li>
      </div>
    });
    // console.log("this is info from sidebar - info:", info)

    return (
      <div id="sidebar">
        {info}
      </div>
    );
  }
}

// let stopInfo = ""
//     //Logic to ensure only bus stops with valid info are rendered
//     if (marker.info !== undefined && marker.info.length > 0) {
//       stopInfo = marker.info.map(route => {
//         console.log("route:", route.Direction)
//         return <div key={route.RouteNo}>
//           {route.RouteNo} 
//           {route.Schedules[0].Destination} 
//           {route.Direction} 
//           Leaving in: {route.Schedules[0].ExpectedCountdown} 
//           minute(s) 
//         </div>   
export default Sidebar;