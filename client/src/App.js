import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

const App = () =>
	<Router>
		<Switch>
			<Route exact path='/' component={ Home } />
			<Route exact path="/signup" component={ Signup } />
			<Route exact path="/login" component={ Login } />
			<Route component={ NoMatch } />
		</Switch>
	</Router>;

export default App;
