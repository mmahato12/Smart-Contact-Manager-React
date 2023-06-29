import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const editContact = (id) => {
    console.log(id);
    navigate(`/EditContact/${id}`);
  };

  const deleteItem = (id) => {
    console.log(id);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;

    const config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }

    axios.delete(`http://localhost:8082/api/user/contacts/${id}`,
      config
    );
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.accessToken;
    axios.get("http://localhost:8082/api/user/contacts",
      { headers: { Authorization: 'Bearer ' + token } })
      .then((res) => {
        console.log(res.data);
        setContacts(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  return (
    <>
      <h2 className="text-center">Contact List</h2>
      <table className="table table-hover">
        <thead className="table-success">
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.description}</td>
                <td className="d-flex">
                  <button className="btn btn-outline-info d-inline-block" onClick={() => editContact(contact.id)} >Edit</button>
                  <button className="btn btn-outline-danger d-inline-block" onClick={() => deleteItem(contact.id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </>
  );

}

export default Home