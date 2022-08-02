import "./style.css";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";

const loginInfo = {
  email: "",
  password: "",
};
const Login = () => {
  const [login, setLogin] = useState(loginInfo);
  const { email, password } = login;

  console.log(login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setLogin({ ...login, [name]: value });
  };

  const loginValidaton = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <span>
              Buzz helps you connect and share with the people in your life
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
                validationSchema={loginValidaton}
              >
                {(formik) => {
                  return (
                    <Form>
                      <LoginInput
                        type="text"
                        name="email"
                        placeholder="Email address"
                        onChange={handleChange}
                      />
                      <LoginInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                      <button type="submit" className="blue_btn">
                        Log In
                      </button>
                    </Form>
                  );
                }}
              </Formik>
              <Link to="/forget" className="forget_password">
                Forgotten password ?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to="/">
              <span>Not a member yet?</span> {""}{" "}
              <span className="redirect_to_register_btn">Register</span>
            </Link>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
};

export default Login;
