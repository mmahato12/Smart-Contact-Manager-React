import React, { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

const EditUser = () => {
    const [userInfo, setUserInfo] = useState({});
    const [image, setImage] = useState(null);
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
          setUserInfo(res.data);
        })
        .catch((error) => {
          console.log(error)
        })
    }, []);
    
    const handleChange = (e) => {
        setUserInfo(prevState => ({...prevState, [e.target.id]: e.target.value}));
        console.log(e.target.id);
    };

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;

        const data = new Blob([JSON.stringify(userInfo)], { type: 'application/json' });

        const formData = new FormData();
        formData.append('Image', image);
        formData.append('data', data);

        const config = { 
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            } 
        }
        console.log(userInfo);
        axios.put(`http://localhost:8082/api/user/data/${user.id}`,
        formData,
        config,
        )
        .then((res) => {
          console.log("Data Saved");
          console.log(res.data);
          navigate(`/profile/${user.id}`)
        });
    }
        return (
            <div>
            <h2>Edit Contact</h2>
            <form onSubmit={handleSubmit} className="mb-3 mt-3">
                <div className="mb-3 mt-3">
                <label htmlFor="username" className="form-label">Username :</label>
                <input type="text" id="username" value={userInfo.username} onChange={handleChange} className="form-control" placeholder='Enter the Name'/>
                </div>

                <div className="mb-3">
                <label htmlFor="email" className="form-label">Description :</label>
                <input type="text" id="email" value={userInfo.email} onChange={handleChange} className="form-control" placeholder='Enter the Description'/>
                </div>

                <div className="mb-3">
                <label htmlFor="image" className="form-label">Image Url:</label>
                <input type="file" id="image" onChange={handleImageChange} className="form-control" placeholder='Enter the Image Url'/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        )
}



export default EditUser