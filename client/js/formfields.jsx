import React from 'react'

class Formfields extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      message: '',
      username: ''
    }
  }
  render() {
    return (
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
            <li class="sidebar-brand">
              <a href="#">Sonar</a>
            </li>
            <form className="busroute" method="POST" action="/busroute" >
              <li>
                <input name="location" id="form-start" placeholder="Starting point" form="form-demo">
              </li>
              <li>
                <input name="destination" id="form-destination" placeholder="Destination.." form="form-demo">
              </li>
            </form>
          </ul>
        </div>
      </div>  
      
  );
};
export default Formfields;
