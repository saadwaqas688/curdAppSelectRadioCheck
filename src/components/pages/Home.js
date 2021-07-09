import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8000/api/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/api/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>

              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Status</th>
              <th scope="col">Job</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td>{user.job ? "yes" : "NO"}</td>
                <td>
                  <Link
                    className="btn btn-primary mr-2"
                    to={`/users/${user._id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    to="/"
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
