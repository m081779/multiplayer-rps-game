import React from "react";


const Nav = (props) =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          Rock Paper Scissors!
        </a>
        <div style={{position: 'absolute', right:
        0, top: '50%', transform: 'translate(-10%, -50%)'}}>
          {props.children}
        </div>
      </div>
    </div>
  </nav>;

export default Nav;
