import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();

  const [state, setState] = useState({
    name: "",
    email: "",

    gender: "Male",
    status: "Married",
    job: false,
  });

  const [errors, setErrors] = useState({
    name: "",

    email: "",
  });
  // const { name, email, gender, status, job } = state;

  function handleChange(evt) {
    // console.log(`type of input is ${evt.target.type}`);
    // console.log(evt.target.checked);
    // console.log(evt.target.value);

    const value =
      evt.target.type === "checkbox"
        ? evt.target.checked
        : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  //
  //
  //

  useEffect(() => {
    loadUser();
  }, []);
  //
  //

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await axios.put(`http://localhost:8000/api/users/${id}`, state);
      history.push("/");
      alert("Form Edited");
    } else {
      // alert("email exist");
    }
  };

  const validateForm = () => {
    let fields = state;
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

    setErrors(errors);
    return formIsValid;
  };

  //
  //
  //
  console.log(state);

  const loadUser = async () => {
    const result = await axios.get(
      `http://localhost:8000/api/users?id=${id}`
    );
    setState(result.data);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </div>
          <div className="text-danger">{errors["name"]}</div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Email"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
          </div>
          <div className="text-danger">{errors["email"]}</div>

          <div>Gender</div>
          <div className="form-group">
            <label>
              Female
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={state.gender === "Female"}
                onChange={handleChange}
              />
            </label>
            <label>
              Male
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={state.gender === "Male"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="heading">Status</div>
              <select
                name="status"
                onChange={handleChange}
                value={state.status}
              >
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="heading">Job</div>
              <input
                type="checkbox"
                name="job"
                checked={state.job}
                onChange={handleChange}
              />
            </label>
          </div>
          <button className="btn btn-warning btn-block">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
