import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import authService from "../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
    const [registerObject, setRegisterObject] = useState({
        username: "",
        email: "",
        password: "",
        successful: false,
        message: ""
      });
      const [image, setImage] = useState(null);
    
    const handleChange = (e) => {
        setRegisterObject(prevState => ({...prevState, [e.target.id]: e.target.value}));
    }

    const handleImageChange = (e) => {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(registerObject);
        authService.register(
            registerObject.username,
            registerObject.email,
            registerObject.password,
            image
        ).then(
            response => {
                setRegisterObject({
                    message: response.data.message,
                    successful: true
                });
                navigate("/");
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

            <div className="mb-3">
            <label htmlFor="image" className="form-label">Image Url:</label>
            <input type="file" id="image" onChange={handleImageChange} className="form-control" placeholder='Enter the Image Url'/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
    )
}

export default Register