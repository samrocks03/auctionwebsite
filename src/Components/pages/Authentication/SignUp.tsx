import { IPostSignUp } from "../../../Types/authentication.types";
import { signUpSchema } from "../../YupSchema/yup.schema";
import AuthForm from "./AuthForm";
import { useSignUpAccount } from "../../Hooks/authentication.hooks";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const { signUpMutation, isSignUpPending } = useSignUpAccount();
  const navigate = useNavigate();

  const handleSignUp = (values: any) => {
    const payload: IPostSignUp = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    };

    if (!isSignUpPending) {
      signUpMutation(payload, {
        onSuccess: () => {
          console.log("I'm in sign up-------> ", payload);

          navigate("/list-artworks");
        },
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <AuthForm
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSignUp}
        formType="signup"
      />
    </>
  );
};

export default SignUp;
