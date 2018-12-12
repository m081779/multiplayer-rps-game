import React from 'react';
import Nav from '../../components/Nav';
import {Link } from 'react-router-dom';
import axios from 'axios';
export default class Login extends React.PureComponent {
	state = {
		userName: '',
		password: ''
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		})
	}

	handleSubmit = async () => {
		const { userName, password } = this.state;
		const userData = { userName, password };
		const result = await axios.post('api/auth/login', userData).then(res =>
		console.log('result: ',res));
	}

	render() {
		return(
			<React.Fragment>
				<Nav>
					<Link to="/"><button className="btn btn-info">Home</button></Link>
					<Link to="/signup"><button className="btn btn-info">Signup</button></Link>
				</Nav>
				<div className="container">
					<h1>Login</h1>
						<div className="form-group">
							<label htmlFor="userName">Username:</label>
							<input type="text" className="form-control" id="userName" name="userName" onChange={this.handleChange}/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password:</label>
							<input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
						</div>
						<button type="submit" onClick={this.handleSubmit}>Submit</button>
				</div>
			</React.Fragment>
		);
	}
}