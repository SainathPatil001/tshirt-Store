import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const isAdminLeftSide = () => {
  return (
    <div className="card">
      <h4 className="bg-dark text-white card-header"> Admin Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link text-info" to="/admin/create/category">
            Create Categories
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link text-info" to="/admin/categories">
            Manage Categories
          </Link>
        </li>

        <li className="list-group-item">
          <Link className="nav-link text-info" to="/admin/create/product">
            Create Product
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link text-info" to="/admin/products">
            Manage products
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link text-info" to="/admin/orders">
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
};
const isAdminRightSide = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <div className="card mb-4">
      <h4 className="card-header">Admin Information</h4>

      <ul className="list-group">
        <li className="list-group-item">
        <span className="badge badge-success">Name:</span> {name}
        </li>
        <li className="list-group-item">
          <span className="badge badge-success" >Email:</span>  {email}
        </li>
        <li className="list-group-item">
          <span className="badge badge-danger">You are an Admin..!</span>
        </li>
      </ul> 
    </div>
  );
};
const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  return (
    <Base
      title="Welcome to admin area"
      description="Manage all your products Here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3"> {isAdminLeftSide()}</div>
        <div className="col-9"> {isAdminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
