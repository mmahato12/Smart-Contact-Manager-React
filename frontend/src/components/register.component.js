import React, { useState } from "react";

import axios from 'axios';
import authService from "../services/auth.service";

const Register = () => {
    const [registerObject, setRegisterObject] = useState({
        username: "",
        email: "",
        password: "",
        successful: false,
        message: ""
      });
    
    const handleChange = (e) => {
        setRegisterObject(prevState => ({...prevState, [e.target.id]: e.target.value}));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(registerObject);
        authService.register(
            registerObject.username,
            registerObject.email,
            registerObject.password
        ).then(
            response => {
                setRegisterObject({
                    message: response.data.message,
                    successful: true
                });
            },
            error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                setRegisterObject({
                  successful: false,
                  message: resMessage
                });
              }
            );
    }

    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
            <label htmlFor="username" className="form-label">Username :</label>
            <input type="text" id="username" onChange={handleChange} className="form-control" placeholder="Enter the username"/>
            </div>

            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email :</label>
            <input type="email" id="email" onChange={handleChange} className="form-control" placeholder="Enter the Email"/>
            </div>

            <div className="mb-3">
            <label htmlFor="password" className="form-label">Password :</label>
            <input type="password" id="password" onChange={handleChange} className="form-control" placeholder="Enter the Phone Number"/>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </>
    )
}

export default Register