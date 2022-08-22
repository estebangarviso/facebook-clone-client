import * as yup from 'yup';
import validationMatches from '../../utils/validationMatches';

const schema = yup
  .object({
    // avatar: yup.object().shape({
    //   name: yup.string().required(),
    //   type: yup.string().required(),
    //   size: yup.number().required(),
    // }).optional(),
    avatar: yup
      .string()
      .matches(validationMatches.photo, 'File type is not valid (recommended: .jpg or .png)')
      .required('Avatar is required'),
    first_name: yup
      .string()
      .matches(validationMatches.name, 'Name must contain only letters and spaces')
      .required('Firstname is required'),
    last_name: yup
      .string()
      .matches(validationMatches.name, 'Name must contain only letters and spaces')
      .required('Lastname is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .matches(
        validationMatches.password,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character'
      )
      .required('Password is required'),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  })
  .defined();

export default schema;
