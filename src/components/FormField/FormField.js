import { ErrorMessage, Field } from "formik";

export const FormField = ({ label, name, type = "text" }) => {
  return (
    <label>
      {label}
      <Field name={name} type={type} />
      <ErrorMessage className="error" component="div" name={name} />
    </label>
  );
};
