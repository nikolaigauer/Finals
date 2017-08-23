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

    return (
      <div id="sidebar">
        {info}
      </div>
    );
  }
}

export default Sidebar;