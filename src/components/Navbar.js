import React, { useEffect } from "react";
import Logo from "../assets/logo-white.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import '../styles/css/font-awesome.min.css';
import '../styles/css/index.css';   

function Navbar() {
  const CloseMobileMenu = ()=> {
    const Overlay = document.querySelector('.menu-overlay');
    const MainMenu = document.querySelector('.menu-block');
    Overlay.classList.remove('active');
    MainMenu.classList.remove('active');
  };
  const OpenMobileMenu = ()=> {
    const Overlay = document.querySelector('.menu-overlay');
    const MainMenu = document.querySelector('.menu-block');
    Overlay.classList.add('active');
    MainMenu.classList.add('active');
  };
 
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
        window.removeEventListener('scroll', isSticky);
    };
});

       
/* Method that will fix header after a specific scrollable */
       const isSticky = (e) => {
            const header = document.querySelector('.site-header--sticky');
            const scrollTop = window.scrollY;
            scrollTop >= 50 ? header.classList.add('scrolling') : header.classList.remove('scrolling');
            scrollTop >= 250 ? header.classList.add('reveal-header') : header.classList.remove('reveal-header');
        };
  return (
    <div className="site-header site-header--menu-center landing-5-menu dark-mode-texts site-header--absolute site-header--sticky">
      <div className="container-fluid">
    <nav className="navbar site-navbar">
      <div className="brand-logo" id="close">
      <Link to="/"> <img alt="" src={Logo} /></Link>
        <div className="hiddenLinks">
          <Link className="nav-link-item drop-trigger" to="/reactjs/"> Home </Link>
          <Link className="nav-link-item" to="/reactjs/process"> Process </Link>
          <Link className="nav-link-item" to="/reactjs/process"> Backend (PHP/MySQL) </Link>
        </div>
      </div>
      <div className="menu-block-wrapper">
        <div className="menu-overlay"></div>
        <nav className="menu-block" id="append-menu-header">
        <ul className="site-menu-main">
        <li className="nav-item"><Link className="nav-link-item" to="/" onClick={CloseMobileMenu}> Home </Link></li>
        <li className="nav-item"><Link className="nav-link-item" to="/process" onClick={CloseMobileMenu}> Process </Link></li>
        <li className="nav-item"><Link className="nav-link-item" to="/backend" onClick={CloseMobileMenu}> Backend (PHP/MySQL) </Link></li>
        </ul>
        </nav>
      </div>
      {/* <div className="header-btn ms-auto d-none d-xs-inline-flex">
        <Link className="btn btn sign-in-btn focus-reset" to="#">Log In</Link>
      </div> */}
      <div className="mobile-menu-trigger" onClick={OpenMobileMenu}>
          <span></span>
        </div>
    </nav>
    </div>
    </div>
  );
}

export default Navbar;
