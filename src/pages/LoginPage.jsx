import React from "react";
import LoginForm from "../components/LoginForm";
import "../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-form-border">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
