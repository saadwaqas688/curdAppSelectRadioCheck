import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    name: "",

    email: "",
    gender: "",
    status: "",
    job: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/users?id=${id}`
    );
    console.log(res.data);
    setUser(res.data);
  };
  console.log(user.job);
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {user.name}</li>

        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">gender: {user.gender}</li>
        <li className="list-group-item">status: {user.status}</li>
        <li className="list-group-item">
          job: {user.job ? "yes" : "NO"}
        </li>
      </ul>
    </div>
  );
};

export default User;
