import "./style.css";
import LoginForm from "../../components/login/loginForm";
import { useState } from "react";

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <div className="register"></div>
      </div>
    </div>
  );
};

export default Login;
