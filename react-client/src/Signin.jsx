import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: ''

    }
    this.handleChangesU = this.handleChangesU.bind(this);
    this.handleChangesP = this.handleChangesP.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidMount() {
  // d}

  handleChangesU(event) {
    this.setState({username: event.target.value})
    console.log(this.state.username)
    
  }

  handleChangesP(event) {
    this.setState({password: event.target.value})
    console.log(this.state.password)
  }

   handleSubmit(event) {
   
    $.ajax({
      type : 'POST',
      url: '/signin',
      data: {
        username: this.state.username,
        password: this.state.password
      }, 
      success: (data) => {
        console.log('success', data)
      },
      error: (err) => {
        console.log('err', err);
      }
    });
    event.preventDefault();
  }


  render () {
    return (<div className="container">
      <h1>Sign in</h1>
      <div >
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label >Username:</label>
            <input type="username" className="form-control" id="username" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChangesU}/>
          </div>
          <div className="form-group">
            <label >Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" value={this.state.password} onChange={this.handleChangesP}/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    </div>)
  }
}

export default Signin;