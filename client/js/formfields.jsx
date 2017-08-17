import React from 'react'

class Formfields extends React.Component {
  constructor(props) {
    super(props);

    // initial state
    // this.state = {
    //   location: 'Location',
    //   destination: 'Destination'
    // }
  }
    
handleLocationSubmit(event) {
  event.preventDefault();
  var location = this.refs.startLocation.value;
  console.log("location", location);
}

handleDestionSubmit(event) {
  event.preventDefault();
  var destination = this.refs.endDestination.value;
  console.log("destination", destination);
  this.setState({ name: event.target.value })
  
 }
render() {
  return (
    <div id="wrapper">
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="#">SONAR</a>
          </li>
          <form onSubmit={this.handleLocationSubmit.bind(this)} >
            <li>
              <input
                className="location"
                id="form-start"
                placeholder="Starting point"
                ref="startLocation"
              />
            </li>
          </form>
          <form onSubmit={this.handleDestionSubmit.bind(this)} >
            <li>
              <input
                className="destination"
                id="form-destination"
                placeholder="Destination.."
                ref="endDestination"
              />
            </li>
          </form>
        </ul>
      </div>
    </div>
  );
};
}
export default Formfields;
