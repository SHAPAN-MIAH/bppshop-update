import React from 'react';
import './PageNotFound.css'
// import PageNotFoundGif from "../../Assets/Images/404.png"


const PageNotFound = () => {
  return (
    <>
     <div className="pageNotFoundContainer">
      <div className="">
        {/* <img src={PageNotFoundGif} alt="Page Not Found."/> */}
        <h1>404!</h1>
        <br/>
        <h2>Sorry!</h2>
        <h4>Page Not Found.</h4>

        <br/>

        <a href="/">
        <button>Back To Home</button>
        </a>
      </div>
    </div> 
    </>
  );
};

export default PageNotFound;