import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Columns from 'react-columns';
import MechList from './MechList.jsx';
import OurMap from './OurMap.jsx'; //the map component where we will get the location using Geolocation
import {Row, Col} from 'react-bootstrap';


// Welcome to our Home page! the only page the user will need to get the service


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 35.8375629,
      laltitude: 31.9867353,
      mechs: []
    }
   this.handleChangesLongitude = this.handleChangesLongitude.bind(this)
   this.handleChangesLaltitude = this.handleChangesLaltitude.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
   // this.setMech = this.setMech.bind(this)
   this.setLngLat = this.setLngLat.bind(this);

  }

//This function will be passed to the child component OurMap, where we will call it and pass the user longitude and laltitude so change them in the state of this component, which will make them accessible in the ajax post request.

  setLngLat(lng, lat){
      this.setState({longitude: lng,
                     laltitude: lat})
  }

  //here we will change this.state.longitude when ever the value of the textbox is changed
  handleChangesLongitude(event) {
    this.setState({longitude: event.target.value})
    console.log(this.state.longitude)
    
  }

  handleChangesLaltitude(event) {
    this.setState({laltitude: event.target.value})
    console.log(this.state.laltitude)
    
  }

  // setMech(mechs){
  //   this.setState({mechs: mechs})
  // }

  //sending longitude and laltitude, and recieving an array of the nearest five mechanics
  handleSubmit(event) {
    $.ajax({
      type : 'POST',
      url: '/',
      data: {
      
        longitude: this.state.longitude,
        laltitude: this.state.laltitude

      }, 
      success: (data) => {
        this.setState({mechs : data})
        console.log('success', data)
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    event.preventDefault();
  }

  render () {
   
    
    return (<div className="container" style={{'marginTop':'50px'}}>

            <div>
              <Row>
              <div>
              <h1>Home</h1>
              <div>
                  <Col md={6}>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Location:</label>
                  <p>Don't panic! we will fill this one for you :)</p>
                  <input className="form-control" id="longitude" placeholder="longitude" name="longitude" value={this.state.longitude} onChange={this.handleChangesLongitude}/>
                  <input className="form-control" id="laltitude" placeholder="laltitude" name="laltitude" value={this.state.laltitude} onChange={this.handleChangesLaltitude}/>
                </div>
                <button type="submit" className="btn btn-warning btn-block btn-lg" style={{color:'black', marginBottom: '10px'}}>Get me the nearest mechanics!</button>
              </form>
              </Col>
              </div>
              <Col md={6}>
              <div style={{margin: '15px'}}>
              <h4>Choose a mechanic:</h4>
              <MechList className='container' toggle={this.props.toggle} username={this.props.username} setUsername={this.props.setUsername} v = {this.props.v} mechs={this.state.mechs} longitude={this.state.longitude} laltitude={this.state.laltitude}/>
              </div>
              </Col><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              <center>
              <OurMap setLngLat={this.setLngLat} longitude={this.state.longitude} laltitude={this.state.laltitude}/></center>
              </div>
              </Row>
              </div>
            </div>)
  }
}

//<a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">Send Mail</a>

export default Home;