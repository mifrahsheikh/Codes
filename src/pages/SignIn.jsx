import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const myFunction = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: username.current.value,
        password: password.current.value,
      });
      
      console.log('Access Token:', response.data.access);
      console.log('Refresh Token:', response.data.refresh);
  
    
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
  
      navigate('/myprofile'); 
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password.');
    }
  };
  
  return (
    <div className="signin-container">
      <h1 className="signin-title">Sign In</h1>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" ref={username} className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          ref={password}
          className="form-input"
        />
      </div>
      <button className="signin-button" onClick={myFunction}>
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
