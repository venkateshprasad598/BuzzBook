import "./style.css";
import React from "react";
import { useField } from "formik";

const LoginInput = ({ type, name, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        {...props}
      />
    </div>
  );
};

export default LoginInput;
