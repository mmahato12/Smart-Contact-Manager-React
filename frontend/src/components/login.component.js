import React, { useState, Component } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import AuthService from "../services/auth.service";

const Login = ({ change }) => {
    const navigate = useNavigate();
    const [loginObject, setLoginObject] = useState({
        username: null,
        password: null,
        loading: false,
        message: ""
    });
    
    const handleChange = (e) => {
        setLoginObject(prevState => ({...prevState, [e.target.id]: e.target.value}));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginObject);
        setLoginObject({
            message: "",
            loading: true
        });

        AuthService.login(loginObject.username, loginObject.password).then(
            () => {
                console.log("Successfully Logged In");
                change(true);
                navigate("/");
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                loading: false,
                message: resMessage
              });
            }
        );

        
    }
        return (
            <>
            <h2>LogIn</h2>
            <form onSubmit={handleSubmit}  className="mb-3 mt-3">
                <div className="mb-3 mt-3">
                <label htmlFor="username" className="form-label">Username </label>
                <input type="text" id="username" className="form-control" onChange={handleChange} placeholder="Enter the Username"/>
                </div>

                <div className="mb-3">
                <label htmlFor="password" className="form-label">Password </label>
                <input type="password" id="password" className="form-control" onChange={handleChange} placeholder="Enter the Password"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </>
        )
}

export default Login;