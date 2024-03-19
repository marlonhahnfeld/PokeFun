import React from "react";
import LoginForm from "../components/LoginForm";
import "../styles/LoginPage.css";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <div className="login-page">
        <Link to={"/"}>
          <Logo text={"PokeFun"} />
        </Link>
        <div className="login-form-border">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
