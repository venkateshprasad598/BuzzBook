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
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth(),
  bDay: new Date().getDate(),
  gender: "",
};

const RegisterForm = ({ createOrLogin }) => {
  const [user, setUser] = useState(userInfo);
  console.log({ user });
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setUser({ ...user, [name]: value });
  };

  const currentYear = new Date().getFullYear();
  const year = Array.from(new Array(100), (x, i) => currentYear - i);
  const month = Array.from(new Array(12), (x, i) => i + 1);

  const getDays = () => {
    console.log({ bYear, bMonth });
    console.log(new Date(bYear, bMonth, 0).getDate());
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (x, i) => 1 + i);
  const registerValidaton = Yup.object({
    first_name: Yup.string()
      .required("First Name is required beautiful")
      .min(2, "First name must be between 2 and 16 characters")
      .max(16, "First name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    last_name: Yup.string()
      .required("Last Name is required beautiful")
      .min(2, "Last name must be between 2 and 16 characters")
      .max(16, "Last name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string()
      .required(
        "Enter a combination of atleast six numbers, letters, and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters")
      .max(36, "FPassword can't be more than 36 characters"),
  });

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  return (
    <div className="login_2">
      <div className="login_2_wrap">
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidaton}
          onSubmit={() => {
            console.log("Hello............................");
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);

            if (current_date - picked_date < atleast14) {
              console.log("Under age man");
              setDateError("You age should be between 14 to 70.");
            } else if (current_date - picked_date > noMoreThan70) {
              console.log("Under age man");
              setDateError("You age should be between 14 to 70.");
            } else if (gender == "") {
              setGenderError("Please choose a gender.");
            }
          }}
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
                    <select name="bDay" value={bDay} onChange={handleChange}>
                      {days.map((day, i) => {
                        return (
                          <option key={i} value={day}>
                            {day}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      name="bMonth"
                      value={bMonth}
                      onChange={handleChange}
                    >
                      {month.map((month, i) => {
                        return (
                          <option key={i} value={month}>
                            {month}
                          </option>
                        );
                      })}
                    </select>
                    <select name="bYear" value={bYear} onChange={handleChange}>
                      {year.map((year, i) => {
                        return (
                          <option key={i} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {dateError && <div>{dateError}</div>}
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
                    <label htmlFor="female">
                      Female
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        onChange={handleChange}
                      />
                    </label>
                    <label htmlFor="custom">
                      Custom
                      <input
                        type="radio"
                        name="gender"
                        id="custom"
                        value="custom"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>

                <button type="submit" className="blue_btn sign_up_btn">
                  Sign Up
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
