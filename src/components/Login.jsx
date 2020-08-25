import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {Link,Redirect} from "react-router-dom";
const axios = require('axios');


export default class Login extends React.Component {

    
  render() {
    if(localStorage.getItem('userData'))
    {
      return (<Redirect
        to={{
          pathname: "/",
          state: {
            from: this.props.location
          }
        }}
      />)
    }
    else{

    
    return (

      <div>
        <Container>
          <Row style={{ margin: "150px 0" }}>
            <Col className="col-lg-6" style={{"maxWidth":"950px","margin":"auto","minHeight":"400px"}}>
              <h1 className="display-3">Login</h1>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password"/>
                </Form.Group>
                <Button variant="dark" className="btn-md" onClick={(e)=>{
                   const form = e.target.parentElement;
                   const email = form.email.value;
                   const password = form.password.value;
                   //check for empty fields
                   if(!email||!password)
                   {
                     alert('Empty Fields!');
                   }
                   else{
                     // Hash the Password
                     const User = {
                      email:email,
                      password:password,
                    }
                     axios.post('https://desolate-reaches-85560.herokuapp.com/login', User)
                        .then((res) => {
                         if(res.data.success){
                          const userData=res.data.data.userData;
                          console.log(userData);
                          if(userData.isVerified){
                            console.log('User All Checkpoint Completed!');
                            localStorage.setItem('userData', JSON.stringify(userData));
                            window.location = "/";
                          }
                          else{
                            console.log('User Email is Not Verified');
                          }
                        }
                        else{
                          alert('Login Failed!');
                        }
                            }).catch((error) => {
                            console.log(error);
                             });
                   }
                }}>
                  Login
                </Button>
                <Link to="/register" variant="dark" type="submit" className="btn btn-md btn-dark ml-2">
                  Register
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  }
}
