import "./style.css";
import React from "react";
import { ErrorMessage, useField } from "formik";

const RegisterInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="input_wrap">
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <div className="input_error_text">
          <ErrorMessage name={field.name} />
        </div>
      )}
      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
};

export default RegisterInput;
