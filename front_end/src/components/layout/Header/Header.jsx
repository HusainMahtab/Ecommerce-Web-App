import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to={"/product"} className="nav-link">Product</Link>
          </li>
          <li className="nav-item">
            <Link to={"/about"} className="nav-link">About Us</Link>
          </li>
          <li className="nav-item">
            <Link to={"/contact"} className="nav-link">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul className="navbar-nav">
          <li className="nav-item icon-link">
            <Link to={"/search"} className="nav-link"><FaSearch/></Link>
          </li>
          <li className="nav-item icon-link">
            <Link to={"/cart"} className="nav-link"><FaShoppingCart /></Link>
          </li>
          <li className="nav-item icon-link">
            <Link to={"/avatar"} className="nav-link" style={{fontWeight:"500", fontSize:"large"}}><CgProfile/></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
