import React, {useState} from 'react';

import axios from 'axios';

const createContact = () => {
    const [contact, setContact] = useState({});

    const handleChange = (e) => {
        setContact(prevState => ({...prevState, [e.target.id]: e.target.value}));
        
        console.log(e.target.id + " " + e.target.value);
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
        axios.post("http://localhost:8082/api/user/contacts",
        contact,
        config,
        )
        .then((res) => {
          console.log("Data Saved");
          console.log(res.data);
        });
    }


        return (
            <>
            <h2>Add Contact</h2>
            <form onSubmit={handleSubmit} className="mb-3 mt-3">
                <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">Name :</label>
                <input type="text" id="name" onChange={handleChange} className="form-control" placeholder='Enter the Name'/>
                </div>

                <div className="mb-3">
                <label htmlFor="descripton" className="form-label">Description :</label>
                <input type="text" id="description" onChange={handleChange} className="form-control" placeholder='Enter the Description'/>
                </div>

                <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number:</label>
                <input type="text" id="phone" onChange={handleChange} className="form-control" placeholder='Enter the Phone Number'/>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </>
        )    
}


export default createContact