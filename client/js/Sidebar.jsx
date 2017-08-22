import React from 'react'

class Sidebar extends React.Component {
  render() {
    const info = this.props.markers
    console.log("this is info:", info, "this is info +:", info)
    return (
      <div id="sidebar">
        Aloha Welt 
      </div>
    );
  }
}
export default Sidebar;
