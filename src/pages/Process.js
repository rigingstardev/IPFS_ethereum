import React from "react";
import ContactBanner from "../assets/contact_us-banner.jpg";
import "../styles/Process.css";
import { Link } from "react-router-dom";
//import { Button, Form } from 'react-bootstrap';
const Process = () =>{
  return (
    <div className="process">
      <div
        className="processTop"
        style={{ backgroundImage: `url(${ContactBanner})` }}
      ></div>

      {/*<h2>File <span>Processing</span></h2>*/}

      <div class="inner_banner contact-us-banner">
        <div class="black_overlay"></div>
        <img height="250px" alt="" src={ContactBanner} />
        <h3>Ethereum-Based File <span>Processing</span></h3>
      </div>
      <div className="processBottom">
        <h2> SELECT AN OPTION</h2>
        
        <div class="row">
          <div class="col-sm-3"><Link to="/uploadfiles" type='button' class="filebtn">Upload</Link> </div>
          <div class="col-sm-3"> </div>
          <div class="col-sm-3"><Link to="/downloadfiles" type='button' class="filebtn">Download</Link> </div>
        </div>
      </div>
    </div>
  );
}

export default Process;
