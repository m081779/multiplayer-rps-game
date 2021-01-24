import React from 'react';
import Nav from '../../components/Nav'
import { Link } from 'react-router-dom'

export default class Home extends React.PureComponent {

	render() {
		return(
            <React.Fragment>
                <Nav>
                    <Link to="/signup"><button className="btn btn-info">Signup</button></Link>
                    <Link to="/login"><button className="btn btn-info">Login</button></Link>
                </Nav>
                <div className="container">
                    Some Sort of landing page stuff goes here
                </div>
            </React.Fragment>
		);
	}
}