import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is necessary"),
  password: Yup.string().required("Password is necessary"),
});

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^\S*$/, 'First name must not contain any spaces')
    .matches(/^[A-Z][a-zA-Z]*$/, 'First name must start with a capital letter')
    .min(2, 'First name must be at least 2 characters long'),

  lastName: Yup.string()
    .required('Last name is required')
    .matches(/^\S*$/, 'Last name must not contain any spaces')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Last name must start with a capital letter')
    .min(2, 'Last name must be at least 2 characters long'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^\S*$/, 'Email must not contain any spaces')
    .test('is-lowercase', 'Email must be in lowercase', value => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^\S*$/, 'Password must not contain any spaces')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});



export const createArtWorkSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  // .matches(/^[A-Z][a-zA-Z] [a-zA-Z]*$/, 'Name must start with a capital letter')


  category: Yup.string().required('Category is required'),


  description: Yup.string().required('Description is required'),


  imageUrl: Yup.string().required('Image URL is required')
    .required('Image URL is required')
    .url('Invalid URL format')
    .matches(/\.(jpeg|jpg|gif|png)$/i, 'Invalid image file extension')
    .max(255, 'URL is too long'),

  amount: Yup.number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Amount must be positive'),

  duration: Yup.number()
    .min(2, "2 days min is required")
    .required("Duration is required"), 
    
})