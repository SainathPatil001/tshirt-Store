import React,{ useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
const Card = ({ product, addToCart = true, removeFromCart = false,setReload=f =>f ,reload=undefined}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)
  const cartTitle = product ? product.name :"A photo from pexels";
  const cartDescription = product ? product.description :"Default description";
  const cartPrice = product ? product.price :"DEFAULT";
  

  const AddToCart =()=>{
      addItemToCart(product,()=>setRedirect(true))
  }
  const getARedirect = redirect=>{
        if(redirect)
        {
           return <Redirect to="/cart"/>
        }
  }
   const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={AddToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={()=>{
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from Cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
         {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">
           {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
