import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",

    email: "",
    gender: "",
    status: "",
  });
  const [errors, setErrors] = useState({
    name: "",

    email: "",
    gender: "",
    status: "",
  });
  const { name, email, gender, status } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await axios.post("http://localhost:8000/api/users", user);
      history.push("/");
      alert("Form submitted");
    } else {
      // alert("email exist");
    }
  };

  const validateForm = () => {
    let fields = user;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your user.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email.";
      }
    }

    if (!fields["gender"]) {
      formIsValid = false;
      errors["gender"] = "*Please enter your gender.";
    }

    if (typeof fields["gender"] !== "undefined") {
      if (!fields["gender"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["gender"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["status"]) {
      formIsValid = false;
      errors["status"] = "*Please enter your status.";
    }

    if (typeof fields["status"] !== "undefined") {
      if (!fields["status"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["status"] = "*Please enter alphabet characters only.";
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  //
  //
  //
  console.log(user);

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="text-danger">{errors["name"]}</div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="text-danger">{errors["email"]}</div>
          <div className="form-group">
            <select
              name="gender"
              value={gender}
              onChange={(e) => onInputChange(e)}
              className="form-control"
            >
              {" "}
              <option value="">Please Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="text-danger">{errors["gender"]}</div>

          <div className="form-group">
            <select
              name="status"
              value={status}
              onChange={(e) => onInputChange(e)}
              className="form-control"
            >
              <option value="">Select Gender</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
            <div className="text-danger">{errors["status"]}</div>
          </div>
          <button className="btn btn-primary btn-block">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
