import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import eventBus from "../common/EventBus";

const LogOut = ({ change }) => {
    const navigate = useNavigate();
    useEffect(()=> {
            console.log("log Out");
            eventBus.dispatch("logout");
            navigate("/login");
            change(false);
        }
    )
}

export default LogOut