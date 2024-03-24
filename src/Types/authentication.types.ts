import * as Yup from "yup";

export interface AuthFormProps {
    initialValues: {
        firstName?: string;
        lastName?: string;
        email: string;
        password: string;
    };
    validationSchema: Yup.ObjectSchema<any>;
    onSubmit: (values: any) => any;
    formType: "signup" | "login";
}


export interface IPostLogin {
    email: string;
    password: string;
}


export interface IPostSignUp {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}