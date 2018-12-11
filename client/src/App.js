import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddUser from "./pages/AddUser";
import ViewUsers from "./pages/ViewUsers";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={ AddUser } />
        <Route exact path="/viewusers" component={ ViewUsers } />
        <Route exact path="/detail" component={ Detail } />
        <Route component={ NoMatch } />
      </Switch>
    </div>
  </Router>;

export default App;
