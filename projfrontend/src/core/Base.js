import React from "react";
import Menu from './Menu'

const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => (
    <div>
        <Menu/>
  <div className="container-fluid ">
    <div className="jumbotron bg-dark text-white text-center">
      <h2 className="display-4">{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
    <footer class="footer bg-dark mt-3">
      <div class="container-fluid bg-success text-center">
        <h4>If you got any question feel free to ask you</h4>
        <button class="btn btn-warning btn-lg my-3">Contact Us</button>
        <div class="container">
        {/* <span class="text-dark">An amazing  <span className="text-white">MERN</span> bootcamp</span> */}
      </div>
      </div>
      
    </footer>
  </div>
</div>
);

export default Base;
