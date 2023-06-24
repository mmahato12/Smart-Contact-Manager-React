import React, {useState} from 'react';

import axios from 'axios';

const test = () => {
    const [contact, setContact] = useState({});
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setContact(prevState => ({...prevState, [e.target.id]: e.target.value}));
        
        console.log(e.target.id + " " + e.target.value);
    };
    
    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;

        const data = new Blob([JSON.stringify(contact)], { type: 'application/json' });

        const formData = new FormData();
        formData.append('Image', image);
        formData.append('data', data);
/*        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }*/
        const config = { 
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            } 
        }
        console.log(contact);
        axios.post("http://localhost:8082/api/usertest/data",
        formData,
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
                <label htmlFor="username" className="form-label">Name :</label>
                <input type="text" id="username" onChange={handleChange} className="form-control" placeholder='Enter the Name'/>
                </div>

                <div className="mb-3">
                <label htmlFor="email" className="form-label">Description :</label>
                <input type="text" id="email" onChange={handleChange} className="form-control" placeholder='Enter the email'/>
                </div>

                <div className="mb-3">
                <label htmlFor="password" className="form-label">Phone Number:</label>
                <input type="password" id="password" onChange={handleChange} className="form-control" placeholder='Enter the password'/>
                </div>

                <div className="mb-3">
                <label htmlFor="image" className="form-label">Image Url:</label>
                <input type="file" id="image" onChange={handleImageChange} className="form-control" placeholder='Enter the Image Url'/>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            </>
        )    
}


export default test