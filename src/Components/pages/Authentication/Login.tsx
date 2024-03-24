/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../YupSchema/yup.schema";
import AuthForm from "./AuthForm";
import { useSignInAccount } from "../../Hooks/authentication.hooks";
import { IPostLogin } from "../../../Types/authentication.types";

const initialValues = {
  email: "svkulkarni23@gmail.com",
  password: "Samarth@123",
};

const Login = () => {
  const authToken = localStorage.getItem('authorizationToken');
  const { signInMutation, isSignInPending }   = useSignInAccount();
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
          navigate("/");
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  return (
    <AuthForm
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
      formType="login"
    />
  );
};

export default Login;



