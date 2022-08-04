import "./style.css";
import LoginForm from "../../components/login/loginForm";
import { useState } from "react";
import RegisterForm from "../../components/login/RegisterForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const createOrLogin = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <span>
              Buzz helps you connect and share with the people in your life
            </span>
          </div>
          {isLogin ? (
            <LoginForm createOrLogin={createOrLogin} />
          ) : (
            <RegisterForm createOrLogin={createOrLogin} />
          )}
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
};

export default Login;
