import React, { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

const EditContact = () => {
    const [contact, setContact] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        axios.get(`http://localhost:8082/api/user/contacts/${id}`, 
        { headers: { Authorization: 'Bearer ' + token } })
        .then((res) => {
          console.log(res.data);
          setContact(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, []);
    
    const handleChange = (e) => {
        setContact(prevState => ({...prevState, [e.target.id]: e.target.value}));
        console.log(e.target.id);
//        console.log(this.state);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;

        const config = { 
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            } 
        }
        console.log(contact);
        axios.put(`http://localhost:8082/api/user/contacts/${contact.id}`,
        contact,
        config,
        )
        .then((res) => {
          console.log("Data Saved");
          console.log(res.data);
        });
        navigate("/");
    }
        return (
            <div>
            <h2>Edit Contact</h2>
            <form onSubmit={handleSubmit} className="mb-3 mt-3">
                <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">Name :</label>
                <input type="text" id="name" value={contact.name} onChange={handleChange} className="form-control" placeholder='Enter the Name'/>
                </div>

                <div className="mb-3">
                <label htmlFor="descripton" className="form-label">Description :</label>
                <input type="text" id="description" value={contact.description} onChange={handleChange} className="form-control" placeholder='Enter the Description'/>
                </div>

                <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number:</label>
                <input type="text" id="phone" value={contact.phone} onChange={handleChange} className="form-control" placeholder='Enter the Phone Number'/>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </div>
        )
}



export default EditContact