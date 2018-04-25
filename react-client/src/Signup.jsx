import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Redirect} from "react-router-dom";
import OurMap from './OurMap.jsx';
// import Mapp from './Mapp.jsx';

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
      mssg: ''

    }
    this.handleChangesU = this.handleChangesU.bind(this);
    this.handleChangesP = this.handleChangesP.bind(this);
    this.handleChangesPh = this.handleChangesPh.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangesLongitude = this.handleChangesLongitude.bind(this)
    this.handleChangesLaltitude = this.handleChangesLaltitude.bind(this)
    this.setLngLat = this.setLngLat.bind(this);
    // this.wrong = this.wrong.bind(this);


  }

  setLngLat(lng, lat){
    this.setState({longitude: lng,
                   laltitude: lat})
  }

  

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

// wrong(){
//           return <div style={{border: 'solid', borderColor:'black', textAlign:'center', background:'red'}}><h4>{this.state.mssg}</h4></div>
//         }

   handleSubmit(event) {
    $.ajax({
      type : 'POST',
      url: '/signup',
      data: {
        username: this.state.username,
        password: this.state.password,
        phonenumber: this.state.phonenumber,
        longitude: this.state.longitude,
        laltitude: this.state.laltitude

      }, 
      success: (data) => {
        if(data !== 'Invalid Input'){
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
            <label >Phone number:</label>
            <input className="form-control" id="phoneNumber" placeholder="Enter Phone number" name="phoneNumber" value={this.state.phonenumber} onChange={this.handleChangesPh}/>
          </div> 
          <div className="form-group">
            <label >Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" value={this.state.password} onChange={this.handleChangesP}/>
          </div>
            <div className="form-group">
            <label>Location:</label>
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
