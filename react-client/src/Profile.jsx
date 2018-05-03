import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Redirect} from "react-router-dom";
import OurMap from './OurMap.jsx';

//Are you watching closely?
//In this component we register a new mechanic, we will get the location from OurMap component, get the other information from the form, if every thing is fine, we will redirect him to Signin.

class UserSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { states:{
       username: '',
      phonenumber: +962,
      password: '',
      email: ''
    },
      redirect: false,
      msg: ''
    }

    
    this.onChange = this.onChange.bind(this);
    this.setState = this.setState.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  //this function will be passed to the child component OurMap, so we can call it there and pass longitude and laltitude with it

  //The following functions are for handiling changes in the values of the form elements 
   onChange(event){
    var name = event.target.name;
    var value = event.target.value;
    var states = this.state.states;
    states[name] = value;
    this.setState({states:states});
  }
  //this function gets users data from data base
 //  componentDidMount(){
 // $.ajax({
 //      type : 'GET',
 //      url: '/profile', 
 //      success: (data) => {
 //        this.setState({states:data})
 //        console.log('success', data)

 //      },
 //      error: (err) => {
 //        console.log('err', err);
 //      }
 //    });
 //    event.preventDefault();
 //  }
//sending all the mech information to the server and checking input validity, if valid we will redirect him to the sign in page, by changing the value of redirect to true and the rest is hapening below, check the first few lines in the render function.
  handleSubmit(event) {
    console.log("askajs")
    var that=this
    $.ajax({
      type : 'POST',
      url: '/userSignup',
      data: that.state.states,
      success: (data) => {
        // if(data === 'exists'){
        //   this.setState({mssg : "This username is already used"})
        // }else if(data !== 'Invalid Input'){
        //   this.setState({ redirect: true })
        // } else{
        //   this.setState({mssg : data})

        // }
        console.log('success', data)

      },
      error: (err) => {
        console.log('err', err);
      }
    });
   event.preventDefault();
  }


  render () {
   // const { redirect } = this.state;
   // if (redirect) {
   //   return <Redirect to='/home'/>;
   // }

   return (
    <div className="container" style={{'marginTop':'50px'}}>
      <h1>WELCOME {this.state.states.username}</h1>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label >Username:</label>
          <input className="form-control" id="username" placeholder="Enter username" name="username" value={this.state.states.username} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label >Email:</label>
          <input className="form-control" id="email" placeholder="Enter email" name="email" value={this.state.states.email} onChange={this.onChange}/>
        </div>
        <div className="form-group">
          <label >Phone number:</label>
          <input className="form-control" id="phoneNumber" placeholder="Enter Phone number" name="phonenumber" value={this.state.states.phonenumber} onChange={this.onChange}/>
          * Please enter a valid phone number
        </div> 
        <div className="form-group">
          <label >Password:</label>
          <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="password" value={this.state.states.password} onChange={this.onChange}/>
          * At least 8 characters
        </div>
    
        <button type="submit" className="btn btn-warning btn-block btn-lg" style={{color:'black', marginBottom: '10px'}}>Submit</button>
      </form>
      

    </div>)
 }
}

export default UserSignUp;
