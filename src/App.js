import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";

import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
// import RegisterForm from "./components/users/registerform";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <RegisterForm /> */}

        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={User} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;