import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState(false);

    const navigate= useNavigate();

    const handleLogin=()=>{
        fetch("http://localhost:5002/login",{
            method:"POST",
            body:JSON.stringify({
                username: username,
                password: password
            }),
            headers:{
                'Content-Type':'application/json',
                'token':localStorage.getItem("token")   
            }
        }).then(e=>e.json()).then(e=>{
            localStorage.setItem("token", e.token);
            localStorage.setItem("id", e.id);
            console.log(e);
            if(e.type==="user"){
                navigate("/userlandingpage");
            }else{
                navigate("/landingpage");
            }
        });
    }
  return (
    <>
    <h1> Welcome to Login Page</h1>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Username</label>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleLogin}>Login Here</button>
    </div>
    {error && "This username and password is invalid..!! login in again "}
  </>
  )
}

export default Login