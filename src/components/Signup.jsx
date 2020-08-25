// eslint-disable-next-line
import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {Redirect} from "react-router-dom";
const bcrypt = require('bcryptjs');
const axios = require('axios');



export default class SignUp extends React.Component {
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
              <h1 className="display-2">Signup</h1>
              <Form>
                <Form.Group controlId="formFname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    autoComplete="false"
                    name="first_name"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  name="email"
                   />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                  type="password"
                    placeholder="Password"
                    name="password1"
                     />
                </Form.Group>

                <Form.Group controlId="formBasicPassword2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                  />
                </Form.Group>
                <Button variant="dark" onClick={(e)=>{
                    const form = e.target.parentElement;
                    const name = form.first_name.value;
                    const email = form.email.value;
                    const password1 = form.password1.value;
                    const password2 = form.password2.value;
                    // eslint-disable-next-line
                    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if(!name || !email || !password1 || !password2)
                    {
                        console.log('All Fields Required');
                    }
                    else{
                        //Validate email using regex
                        if(reg.test(email)){
                            //check if password 1 is matched with password2
                            if(password1!==password2){
                                console.log('make sure two Password Matched!');
                            }
                            else{
                                console.log('All correct! now proceed');
                                // hash the plain text password to hashed password before saving to db
                                const saltRounds = 10;
                                bcrypt.genSalt(saltRounds, function(err, salt) {
                                  bcrypt.hash(password1, bcrypt.genSaltSync(10), function(err, hash) {
                                        // Store hash in your password DB.
                                        const User = {
                                          name:name,
                                          email:email,
                                          password:hash,
                                        }
                                        axios.post('https://desolate-reaches-85560.herokuapp.com/register', User)
                                      .then((res) => {
                                        if(res.data){
                                          window.location = "/reactblog/login";
                          
                                        }
                                        else{
                                          alert("Something Wrong With Server!");
                                        }
                                          }).catch((error) => {
                                          console.log(error);
                                           });
                                    });
                                });
                                
                            }
                        }
                        else{
                            console.log('Bad email');
                        }
                    }
                }}>
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
              }
  }
}
