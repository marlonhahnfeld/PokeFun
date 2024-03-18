import React from "react";
import RegisterForm from "../components/RegisterForm";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-form-border">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
