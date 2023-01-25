import React, { useState } from "react";
import "../css/Login.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  

export default function Login() {
  const [failedLogin, setFailedLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  var trueUser = "";
  var truePass = "";

  const login = async () => {
    fetch('http://127.0.0.1:5000/login', {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data[0].username);
        trueUser = data[0].username;
        truePass = data[0].password;
        if (trueUser === username && truePass === password) {
          console.log("correct user!");
          window.location.href='/';
          setFailedLogin(false);
        } else {
          console.log("incorrect")
          setFailedLogin(true);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  return (
    <div className="main">
      {failedLogin ?
        <div className="Error">
          Incorrect Login
        </div>
        :
        <div>
          
        </div>
      }
      <h1>Log In</h1>
      <div className="Login-header">
        <Form>
          <FormGroup className="login-input">
            <Input
              type="text"
              value={username}
              id="username-input"
              className="login-input"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="login-input"> 
            <Input
              type="text"
              value={password}
              id="login-input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
        </Form>
        <Button onClick={login} className="Login">
          Login
        </Button>
      </div>
    </div>
  );
}