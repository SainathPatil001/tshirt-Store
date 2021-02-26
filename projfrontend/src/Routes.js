import React from "react";
import Home from "./core/Home";
import Signup from "./user/Signup";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Signin from "./user/Signin";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import manageCategories from "./admin/manageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import NotFound from "./core/Notfound.js";
import Cart from "./core/Cart";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoutes path="/admin/create/category" exact component={AddCategory} />
        <AdminRoutes path="/admin/categories" exact component={manageCategories} />
        <AdminRoutes path="/admin/create/product" exact component={AddProduct}/>
        <AdminRoutes path="/admin/products" exact component={ManageProducts}/>
        <AdminRoutes path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        <AdminRoutes path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
};

export default Routes;
