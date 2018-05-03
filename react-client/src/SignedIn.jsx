import React from 'react';
import $ from 'jquery';
// import Signin from './Signin.jsx';
import ServicesList from './ServicesList.jsx';

//This component is a child to Signin, it will be rendered when "v" value is true,
//It will render a profile page for every mechanic, where he can find a history of all the services delivered by him, and a small form to add new services.
class SignedIn extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			clientName: '',
			service: '',
			date: ''
		}
		this.handleChanges = this.handleChanges.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

//this function will handle all the changes in any form element
handleChanges(event){
	var name = event.target.name
	var value = event.target.value
	var obj = {}
	obj[name] = value
	this.setState(obj)
	console.log(this.state[name])
}

	//USing jquery ajax, we send the new service, and recieve back the new list of services
	handleSubmit(event) {
		var that=this
		console.log(this.props.username)
		$.ajax({
			type : 'POST',
			url: '/service',
			data: {
				username: this.props.username,
				clientName: this.state.clientName,
				service: this.state.service,
				date: this.state.date
			}, 
			success: (data) => {
				console.log(data.services)
				that.props.setServices(data.services)

			},
			error: (err) => {
				console.log('err', err);
			}
		});
		event.preventDefault();
	}



	render(){
		return(
			<div>
				<div style={{margin:'30px'}}>
					<button className="btn btn-danger pull-right" onClick={this.props.toggle}>Signout</button>
					<h2>Hey there Mr. {this.props.user}!</h2>
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label >Client Name:</label>
						<input type="clientName" className="form-control" id="clientName" placeholder="Enter clientName" name="clientName" value={this.state.clientName} onChange={this.handleChanges}/>
					</div>
					<div className="form-group">
						<label >Service</label>
						<input type="service" className="form-control" id="service" placeholder="Enter service" name="service" value={this.state.service} onChange={this.handleChanges}/>
					</div>
					<div className="form-group">
						<label >date</label>
						<input type="date" className="form-control" id="date" placeholder="Enter date" name="date" value={this.state.date} onChange={this.handleChanges}/>
					</div>
					<div><button type="submit" className="btn btn-warning" style={{color:'black'}} >Submit</button></div>
				</form>
				<div style={{margin: '80px'}}>
				<ServicesList services={this.props.services} />
				</div>
			</div>
			)
	}

}

export default SignedIn;