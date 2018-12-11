import React from "react";
import { Link } from 'react-router-dom'

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          MERN scaffolding
        </a>
        <div style={{position: 'absolute', right:
        0, top: '50%', transform: 'translate(-10%, -50%)'}}>
          <Link to="/"><button className="btn btn-info" style={{marginRight: '10px'}}>Add User</button></Link>
          <Link to="/viewusers"><button className="btn btn-info">View All Users</button></Link>
        </div>
      </div>
    </div>
  </nav>;

export default Nav;
