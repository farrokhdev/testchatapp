import * as Yup from "yup";

export const defaultValues = {
  password: "",
  userName: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required").min(8, "password error"),
});
