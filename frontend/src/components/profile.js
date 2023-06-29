import React, { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        axios.get(`http://localhost:8082/api/user/data/${id}`, 
        { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
          console.log(res.data);
          setUserInfo(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, []);

    const editUser = (id) => {
      console.log(id);
      navigate(`/EditUser/${id}`);
    };
    
        return (
            <>
                <h1>Profile Information</h1>
                <p>{userInfo.username}</p>
                <p>{userInfo.email}</p>
                <img src={"/"+userInfo.imagePath} height="100"/>
                <button className="btn btn-outline-info d-inline-block" onClick={() => editUser(userInfo.id)} >Edit</button>
            </>
        )
}



export default Profile