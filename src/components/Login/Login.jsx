import { useState } from "react";
import { fb } from "service";
import { Form, Formik } from "formik";
import { validationSchema, defaultValues } from "./LoginConfig";
import { FormField } from "components";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) {
          setServerError("we have troble logging you in , please try again.");
        }
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          setServerError("Invalid credentials");
        } else if (err.code === "auth/user-not-found") {
          setServerError("No account for this email");
        } else {
          setServerError("somthing went wrong :(");
        }
      })
      .finally(() => setSubmitting(false));
  };
  return (
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmiting }) => {
          return (
            <Form>
              <FormField label="Email" name="email" type="email" />
              <FormField label="Password" name="password" type="password" />
              <div className="auth-link-container">
                haven't account yet signup?{" "}
                <span
                  className="auth-link"
                  onClick={() => history.push("signup")}
                >
                  SignUp!
                </span>
              </div>
              <button disabled={isSubmiting || !isValid} type="submit">
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
