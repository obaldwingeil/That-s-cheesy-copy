import React, { useState } from "react";
import "../css/Login.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  
import { useNavigate } from "react-router-dom";

export default function Login({ user_id, handleLogin }) {
  const [failedLogin, setFailedLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then((response) => response.json())
    .then((data) => {
        // console.log('Success:', data);
        if (data !== null) {
          console.log("correct user!");
          navigate(`/`, {state: {user_id: data._id.$oid}});
          handleLogin(data._id.$oid);
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