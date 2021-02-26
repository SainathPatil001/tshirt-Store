import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //   backend request
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setName("");
        } else {
          setSuccess(true);
          setName("");
        }
      })
      .catch();
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            className="form-control my-3"
            type="text"
            autofocus
            placeholder="For Ex. Summer"
            onChange={handleChange}
            required
            value={name}
          ></input>
          <button onClick={onSubmit} className="btn btn-outline-info mb-3">
            Create Category
          </button>
        </div>
      </form>
    );
  };

  const goBack = () => {
    return (
      <div className="mt-4">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  return (
    <Base
      title="Create a categories here"
      description="Add a new Category for new Tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          <h1>Hello</h1>
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
