import "./style.css";
import React from "react";
import { ErrorMessage, useField } from "formik";

const LoginInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  console.log({ meta });
  console.log("Hello");
  console.log("No session today");
  return (
    <div className="input_wrap">
      <div>
        {meta.touched && meta.error && <ErrorMessage name={field.name} />}
      </div>
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  );
};

export default LoginInput;
