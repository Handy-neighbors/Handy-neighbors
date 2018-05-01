import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import Intro from './Intro.jsx';
import { HashRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import './styles/styles.scss';

  // Welcome to our root component! Here we used react router to make it possible for the user to navigate 
  // the different views of our project.
  // You can also see that we used a statefull react component, to save values that we need unchanged while navigating different components, don't worry, we will keep posted.

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //The next three values are used in the Signin component, to toggle view SigninForm and SignedIn and to keep the mechanic in his profile page even when he leave the tab, untill he sign out
      v : false,
      username: '',
      services: []
    }
    this.toggle = this.toggle.bind(this)
    this.MySignin = this.MySignin.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setServices = this.setServices.bind(this)
  }

  setUsername(user){
    this.setState({username: user})
  }

  setServices(arr){
    this.setState({services: arr})
  }

  toggle(){
    var val = !this.state.v
    this.setState({v : val})
  }

// Next we wrapped our component in a function, so we can pass some props. 
  MySignin(props){
      return (
        <Signin
          toggle={this.toggle} v={this.state.v} username={this.state.username} setUsername={this.setUsername} services={this.state.services} setServices={this.setServices}
          {...props}
        />
      );
    }
//React router resorce: https://reacttraining.com/react-router/core/guides/philosophy

//HashRouter is used here so fixed urls in the browser will take you to the wanted page and more importantly to make redirecting possible
  render(){
  return (<Router >
  <HashRouter>
    <div >
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand " href="#" style={{color:'#E9AB17'}}>Handy Neighbors</a>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/">Intro</Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/signin" >Signin</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </div>
      </nav>
      <Route path="/home" component={Home} />
      <Route path="/signin" render={this.MySignin} />
      <Route exact path="/" component={Intro} />
      <Route path="/signup" component={Signup} />
    
    </div>
    </HashRouter>
  </Router>
  
)}
};

ReactDOM.render(<Main />, document.getElementById('route'));

