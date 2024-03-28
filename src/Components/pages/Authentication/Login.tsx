/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../YupSchema/yup.schema";
import AuthForm from "./AuthForm";
import { useSignInAccount } from "../../Hooks/authentication.hooks";
import { IPostLogin } from "../../../Types/authentication.types";
import { ToastContainer } from "react-toastify";
import { Spinner } from "@chakra-ui/react";

const initialValues = {
  email: "svkulkarni23@gmail.com",
  password: "Samarth@123",
};

const Login = () => {
  const authToken = localStorage.getItem("authorizationToken");
  const { signInMutation, isSignInPending } = useSignInAccount();
  const navigate = useNavigate();

  const handleLogin = (values: any) => {
    // localStorage.setItem("authenticationToken", "asdfghjklqwertyuiopzxcvbnm");

    const payload: IPostLogin = {
      email: values.email,
      password: values.password,
    };

    if (!isSignInPending) {
      signInMutation(payload, {
        onSuccess: () => {
          navigate("/list-artworks");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <AuthForm
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
        formType="login"
      />
    </>
  );
};

export default Login;
