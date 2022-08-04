import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";
import RegisterInput from "../inputs/RegisterInput";

const userInfo = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: "",
  bMonth: "",
  bDay: "",
  gender: "",
};

const RegisterForm = ({ createOrLogin }) => {
  const [user, setUser] = useState(userInfo);
  const { email, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidaton = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required"),
  });
  return (
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
                <RegisterInput
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                />
                <RegisterInput
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
                <RegisterInput
                  type="text"
                  name="email"
                  placeholder="Email address"
                  onChange={handleChange}
                />
                <RegisterInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />

                <div className="reg_col">
                  <div className="reg_line_header">
                    Date of birth <i className="info_icon"></i>
                  </div>
                  <div className="reg_grid">
                    <select name="bDay">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                    <select name="bMonth">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                    <select name="bYear">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
                <div className="reg_col">
                  <div className="reg_line_header">
                    Gender<i className="info_icon"></i>
                  </div>
                  <div className="reg_grid">
                    <label htmlFor="male">
                      Male
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={handleChange}
                      />
                    </label>
                    <label htmlFor="male">
                      Female
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={handleChange}
                      />
                    </label>
                    <label htmlFor="male">
                      Others
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            );
          }}
        </Formik>
        <div className="sign_splitter"></div>
      </div>
      <div>
        <span>Already a member?</span> {""}{" "}
        <span className="redirect_to_register_btn" onClick={createOrLogin}>
          Login
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
