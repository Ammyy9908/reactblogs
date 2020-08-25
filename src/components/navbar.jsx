import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";


export default class NavbarCustom extends React.Component{

      
        

    render(){
       return<Navbar expand="lg" variant="light" className="p-3 navbar">
        
  <Navbar.Brand href="/" className="ml-5"> <strong>DevBlogs</strong></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    {localStorage.getItem('userData')?
     <Nav className="ml-auto">
     <Link to="/profile" className="nav-link">Profile</Link>
     <Link to="/new" className="nav-link">Add Post</Link>
     </Nav>:
    <Nav className="ml-auto">
        <Link  to="/login" className="nav-link">Login</Link>
      
    </Nav> }
  </Navbar.Collapse>
</Navbar>
    }
}