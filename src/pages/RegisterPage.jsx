import React from "react";
import RegisterForm from "../components/RegisterForm";
import "../styles/RegisterPage.css";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Link to={"/"}>
        <Logo text={"PokeFun"} />
      </Link>
      <div className="register-form-border">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
