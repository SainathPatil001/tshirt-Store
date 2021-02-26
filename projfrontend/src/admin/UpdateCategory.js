import React, { useState ,useEffect} from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { updateCategory,getCategory } from "./helper/adminapicall";

  const UpdateCategory = ({match}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [getaRedirect, setRedirect] = useState(false);
  const { user, token } = isAuthenticated();

  const handleChange = event=>{
    setError("");
    setName(event.target.value);
    
  };

  useEffect(() => {
      preload(match.params.categoryId);
  },[])
  const preload = (categoryId) =>{
      getCategory(categoryId).then(data =>{
          if(data.error){
              setError(data.error);
          }

          else{
              setName(data.name)
          }
      })
  }
  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //   backend request
    updateCategory(match.params.categoryId,user._id,token,{ name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(data.error);
          setName("");
        } else {
          setSuccess(true);
          setName("");
          setTimeout(() =>setRedirect(true)
          ,2000)
        }
      })
      .catch();
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">Failed to Update category</h4>;
    }
  };

  const getARedirect = () => {
    if (getaRedirect) {
      return <Redirect to="/admin/categories"/>
     
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
            Update Category
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
          {getARedirect()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
