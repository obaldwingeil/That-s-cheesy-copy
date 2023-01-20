import React from "react";
import "../css/Login.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  

export default function Login() {
  return (
    <div className="main">
      <h1>Log In</h1>
      <div className="Login-header">
        <Form>
          <FormGroup className="login-input">
            <Input
              type="text"
              id="username-input"
              className="login-input"
              placeholder="Username"
            />
          </FormGroup>
          <FormGroup className="login-input"> 
            <Input
              type="text"
              id="login-input"
              placeholder="Password"
            />
          </FormGroup>
        </Form>
        <Button className="Login">
          Login
        </Button>
      </div>
    </div>
  );
}