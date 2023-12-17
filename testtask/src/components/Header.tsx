import React from 'react';
import logo from "./../images/logo.svg";
import Button from "./ui_elements/Button";

const Header: React.FC = () => {
  return <header className="header">
    <div className="header__container container">
      <a href="#signUp" className="header__logo">
        <img src={logo} alt="Testtask logo"/>
      </a>
      <Button isButton={false} options={{href:"#users"}}>Users</Button>
      <Button isButton={false} options={{href:"#signUp"}}>Sign up</Button>
    </div>
  </header>;
};

export default Header;