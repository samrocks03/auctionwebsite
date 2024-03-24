import { IPostSignUp } from "../../../Types/authentication.types";
import { signUpSchema } from "../../YupSchema/yup.schema";
import AuthForm from "./AuthForm";
import { useSignUpAccount } from "../../Hooks/authentication.hooks";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const { signUpMutation, isSignUpPending } = useSignUpAccount();

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
          console.log(values);
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
      validationSchema={signUpSchema}
      onSubmit={handleSignUp}
      formType="signup"
    />
  );
};

export default SignUp;
