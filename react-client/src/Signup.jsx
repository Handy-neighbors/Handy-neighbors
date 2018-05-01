import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Redirect} from "react-router-dom";
import OurMap from './OurMap.jsx';
import { Radio } from 'react-bootstrap';
import Toggle from 'react-bootstrap-toggle';
//Are you watching closely?
//In this component we register a new mechanic, we will get the location from OurMap component, get the other information from the form, if every thing is fine, we will redirect him to Signin.

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      redirect: false,
      username: '',
      phonenumber: +962,
      password: '',
      longitude: 0,
      laltitude: 0,
      email: '',
      category: true,
      mssg: '',
      toggleActive: false
    }
    this.onToggle = this.onToggle.bind(this);
    this.handleChangesU = this.handleChangesU.bind(this);
    this.handleChangesP = this.handleChangesP.bind(this);
    this.handleChangesPh = this.handleChangesPh.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangesLongitude = this.handleChangesLongitude.bind(this)
    this.handleChangesLaltitude = this.handleChangesLaltitude.bind(this)
    this.setLngLat = this.setLngLat.bind(this);
    this.handleChangesEmail = this.handleChangesEmail.bind(this);
    this.handleChangesCategory = this.handleChangesCategory.bind(this);
  }
   onToggle() {

    this.setState({ toggleActive: !this.state.toggleActive });
    console.log(this.state.toggleActive)
  }
  //this function will be passed to the child component OurMap, so we can call it there and pass longitude and laltitude with it
  setLngLat(lng, lat){
    this.setState({longitude: lng,
     laltitude: lat})
  }

  

  //The following functions are for handiling changes in the values of the form elements 
  handleChangesU(event) {
    this.setState({username: event.target.value})
    console.log(this.state.username)
    
  }

  handleChangesP(event) {
    this.setState({password: event.target.value})
    console.log(this.state.password)
  }

  handleChangesPh(event) {
    this.setState({phonenumber: event.target.value})
    console.log(this.state.phonenumber)
  }

  handleChangesLongitude(event) {
    this.setState({longitude: event.target.value})
    console.log(this.state.longitude)
  }

  handleChangesLaltitude(event) {
    this.setState({laltitude: event.target.value})
    console.log(this.state.laltitude)
    
  }

  handleChangesEmail(event) {
    this.setState({email: event.target.value})
    console.log(this.state.email)
    
  }

  handleChangesCategory(event) {
    console.log(this.state.category)
    this.setState({category: event.target.value})
   
    
  }

//sending all the mech information to the server and checking input validity, if valid we will redirect him to the sign in page, by changing the value of redirect to true and the rest is hapening below, check the first few lines in the render function.
  handleSubmit(event) {
    $.ajax({
      type : 'POST',
      url: '/signup',
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        phonenumber: this.state.phonenumber,
        longitude: this.state.longitude,
        laltitude: this.state.laltitude,
        category: this.state.category
      }, 

      success: (data) => {
        if(data === 'exists'){
          this.setState({mssg : "This username is already used"})
        }else if(data !== 'Invalid Input'){
          this.setState({ redirect: true })
        } else{
          this.setState({mssg : data})

        }
        console.log('success', data)

      },
      error: (err) => {
        console.log('err', err);
      }
    });
    event.preventDefault();
  }


  render () {
   const { redirect } = this.state;
   if (redirect) {
     return <Redirect to='/signin'/>;
   }

   return (
    <div className="container" style={{'marginTop':'50px'}}>
      <h1>Sign up</h1>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label >Username:</label>
          <input className="form-control" id="username" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChangesU}/>
        </div>
        <div className="form-group">
          <label >Email:</label>
          <input className="form-control" id="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChangesEmail}/>
        </div>
        <div className="form-group">
          <label >Phone number:</label>
          <input className="form-control" id="phoneNumber" placeholder="Enter Phone number" name="phoneNumber" value={this.state.phonenumber} onChange={this.handleChangesPh}/>
          * Please enter a valid phone number
        </div>
        <div className="form-group">
          <label >Password:</label>
          <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" value={this.state.password} onChange={this.handleChangesP}/>
          * At least 8 characters
        </div>

        <label >Are you a Mech or not ?</label> 
        <div className="form-group">
           <Toggle
          onClick={this.onToggle}
          on={<h2>ON</h2>}
          off={<h2>OFF</h2>}
          size="xs"
          offstyle="danger"
          active={this.state.toggleActive}
        />
        </div> 

        <div className="form-group">
          <label>Location:</label>
          <p>Don't worry! we will fill this one for you :)</p>
          <input className="form-control" id="longitude" placeholder="longitude" name="longitude" value={this.state.longitude} onChange={this.handleChangesLongitude}/>
          <input className="form-control" id="laltitude" placeholder="laltitude" name="laltitude" value={this.state.laltitude} onChange={this.handleChangesLaltitude}/>
          <div style={{border: 'solid',  textAlign:'center', background:'red', fontSize:'30px', color:'white', opacity: '0.8', marginTop:'10px'}}>{this.state.mssg}</div>
        </div>
        <button type="submit" className="btn btn-warning btn-block btn-lg" style={{color:'black', marginBottom: '10px'}}>Submit</button>
      </form>
      <OurMap setLngLat={this.setLngLat} longitude={this.state.longitude} laltitude={this.state.laltitude}/>

    </div>)
 }
}

export default Signup;
