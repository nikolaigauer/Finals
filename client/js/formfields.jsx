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
  render() {
    return (
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <a href="#">Sonar</a>
            </li>
            <form className="busroute" method="GET" action="/busroute" >
              <li>
                <input name="location" id="form-start" placeholder="Starting point" form="form-demo"/>
              </li>
              <li>
                <input name="destination" id="form-destination" placeholder="Destination.." form="form-demo"/>
              </li>
            </form>
            />
          </ul>
        </div>
      </div>      
    );
  };
}
export default Formfields;
