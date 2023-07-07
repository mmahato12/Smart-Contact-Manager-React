import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import userService from "../services/user.service";

const Home = () => {
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(3);
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
    userService.getContacts(pageSize, page, sortBy, sortDir, query)
    .then((res) => {
        console.log(res.data);
        setContacts(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const getPage = (p) => {
    console.log(page + " ");
    userService.getContacts(pageSize, page+p, sortBy, sortDir, query)
    .then((res) => {
        console.log(res.data);
        setContacts(res.data)
        setPage(page+p);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getSorted = (colName) => {
    let dir = (sortDir=="asc")?"desc":"asc";
    console.log(page + " ");
    userService.getContacts(pageSize, page, colName, dir, query).then((res) => {
        console.log(res.data);
        setContacts(res.data)
        setSortDir(dir)
        setSortBy(colName)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    userService.getContacts(pageSize, page, sortBy, sortDir, query)
      .then((res) => {
        console.log(res.data);
        setContacts(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  }


  return (
    <>
      <h2 className="text-center">Contact List</h2>
      <form onSubmit={handleSubmit} className="mb-3 mt-3">
        <div className="row">
        <div className="mb-2 mt-2 col-md-10">
        <input type="text" id="search" value={query} onChange={handleChange} className="form-control" placeholder='Search...'/>
        </div>

        <button type="submit" className="btn btn-primary mb-2 mt-2 col-md-2">Submit</button>
        </div>

      </form>
      <table className="table table-hover">
        <thead className="table-success">
          <tr>
            <th onClick={() => getSorted("id")}>Id</th>
            <th onClick={() => getSorted("name")}>Name</th>
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
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.description}</td>
                <td className="d-flex">
                  <button className="btn btn-outline-info d-inline-block me-1" onClick={() => editContact(contact.id)} >Edit</button>
                  <button className="btn btn-outline-danger d-inline-block ms-1" onClick={() => deleteItem(contact.id)}>Delete</button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      <div className="mt-1 mx-auto">
        <button className="btn btn-primary" onClick={() => getPage(-1)}>Prev</button>
        <span className="btn btn-primary ms-2 me-2">{page}</span>
        <button className="btn btn-primary" onClick={() => getPage(1)}>Next</button>
      </div>
    </>
  );

}

export default Home