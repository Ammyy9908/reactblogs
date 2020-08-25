import React from "react";
import NavbarCustom from "./components/navbar";
import Home from "./components/Home";
import About from "./components/About";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ProtectedRoute from "./components/Profile";
import CreatePost from "./components/AddPost"


export default class App extends React.Component {
    render() {
      return <Router>
        <div>
        <NavbarCustom/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={SignUp}/>
        <Route path="/profile" component={ProtectedRoute}/>
        <Route path="/new" component={CreatePost}/>
        
        </Switch>
     </div>
      </Router>;
    }
  }