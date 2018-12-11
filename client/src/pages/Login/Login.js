import React from 'react';
import Nav from '../../components/Nav';
import {Link } from 'react-router-dom';

export default class Login extends React.PureComponent {

  render() {
    return(
      <React.Fragment>
      <Nav>
        <Link to="/"><button className="btn btn-info">Home</button></Link>
        <Link to="/signup"><button className="btn btn-info">Signup</button></Link>
      </Nav>
      <div className="container">
        <h1>Login</h1>
        {/* <a href="/">Home</a> */}
        {/* <a href="/login">Login</a> */}
          {/* <div className="alert alert-danger">error</div> */}
          {/* <div className="alert alert-danger">signup message</div> */}
        <form action="/users/login" method="POST">
          <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" className="form-control" id="username" name="username" />
          </div>
          <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" name="password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      </React.Fragment>
    );
  }
}