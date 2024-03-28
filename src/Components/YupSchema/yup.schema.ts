import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is necessary"),
  password: Yup.string().required("Password is necessary"),
});

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is Required"),
  lastName: Yup.string().required("Last name is Required"),
  email: Yup.string().email("Invalid email").required("email is Required"),
  password: Yup.string().required("password is Required"),
});



export const createArtWorkSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      category: Yup.string().required('Category is required'),
      description: Yup.string().required('Description is required'),
      imageUrl: Yup.string().required('Image URL is required'),
      amount: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .positive('Amount must be positive'),
    })