import React, { useEffect, useState } from "react";
import './App.css';

import { BrowserRouter, Route, Routes, Navigate, useNavigate} from "react-router-dom";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/Home";
import CreateContact from "./components/CreateContact";
import EditContact from "./components/EditContact";
import NavBar from "./components/NavBar";
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";

import Profile from "./components/profile";
import EditUser from "./components/EditUser";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.getCurrentUser() ? true : false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
//        console.log("Is Authenticated : " + isAuthenticated);
//        console.log(user);
        if(user) {
            setIsAuthenticated(true);
        }

        EventBus.on("logout", () => {
            LogOut();
        })
    }, []);

    const change = (value) => {
        setIsAuthenticated(value);
    }

    const LogOut = () => {
        AuthService.logout()
        setIsAuthenticated(false);
    }

    return (
        <BrowserRouter>
        <NavBar isAuthenticated={isAuthenticated} />

        <div className="container mt-3">
        <Routes>
            <Route exact path="/Login" element={<Login change={change}/> } />
            <Route exact path="/Register" element={<Register /> } />
            {
                isAuthenticated ? (
                    <>
                        <Route exact path="/" element={<Home /> } />
                        <Route path="/CreateContact" element={<CreateContact/>} />
                        <Route path="/EditContact/:id" element={<EditContact/>} />
                        <Route path="/logout" element={<LogOut/>} />
                        <Route path="/profile/:id" element={<Profile/>} />
                        <Route path="/EditUser/:id" element={<EditUser/>} />
                    </>
                ) : (
                    <Route path = "*" element={<Navigate to="/login" replace /> }/>
                )
            }
        </Routes>
        </div>
      </BrowserRouter>
    )
}

export default App;