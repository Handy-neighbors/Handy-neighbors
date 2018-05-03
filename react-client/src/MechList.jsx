import React from'react';
import Mechanic from './Mechanic.jsx'//list item component

//The mechanics list to be rendered on the home page

class MechList extends React.Component{
    constructor(props){
        super(props);
    }
        render(){

            return(
                <div className='well' style={{border:'solid', 'borderRadius': '7px', 'borderColor' : '#E9AB17'}}>
                <ul style={{backgrondColor: '#E44F4F'}} className="list-group">
                {this.props.mechs.map((mech)=><Mechanic toggle={this.props.toggle} username={this.props.username} setUsername={this.props.setUsername} v = {this.props.v}  mech={mech} key={'d'+mech.username} longitude={this.props.longitude} laltitude={this.props.laltitude}/>)} 
                </ul>
                </div>
                )
            }
        
    }

export default MechList