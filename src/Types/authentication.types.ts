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

export enum Category { "Canvas_Painting", "Pencil_Art" };

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

export interface ICreateArtwork {
    name: string;
    category: Category,
    description: string,
    image: string,
    starting_price: number,
    duration: number
}