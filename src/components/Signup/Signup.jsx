import { useState } from "react";
import { fb } from "service";
import { Form, Formik } from "formik";
import { validationSchema, defaultValues } from "./FormikConfig";
import { FormField } from "components";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState("");

  const signUp = ({ userName, email, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        if (res?.user?.uid) {
          fetch("/api/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
          }).then(() => {
            fb.fireStore
              .collection("testUser")
              .doc(res.user.uid)
              .set({ userName, avatar: "" });
          });
        } else {
          setServerError(
            "we have troble signing you up you in , please try again."
          );
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setServerError("An account with this email already exists");
        } else {
          setServerError(
            "we have troble signing you up you in , please try again."
          );
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="auth-form">
      <h1>Sign Up</h1>
      <Formik
        onSubmit={signUp}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmiting }) => {
          return (
            <Form>
              <FormField label="Username" name="userName" />
              <FormField label="Email" name="email" type="email" />
              <FormField label="Password" name="password" type="password" />
              <FormField
                label="Verify Password"
                name="verifyPassword"
                type="password"
              />
              <div className="auth-link-container">
                Already Have an account?{" "}
                <span
                  className="auth-link"
                  onClick={() => history.push("login")}
                >
                  Log in!
                </span>
              </div>
              <button disabled={isSubmiting || !isValid} type="submit">
                Sign Up
              </button>
            </Form>
          );
        }}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
