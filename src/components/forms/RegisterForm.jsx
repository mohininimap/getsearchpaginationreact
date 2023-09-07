import React from 'react';
import Button from '@mui/material/Button';
import './RegisterForm.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';


const RegisterForm = () => {
  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string().required('Username is required'),
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        })}
        onSubmit={(values) => {
          // Handle form submission here
          console.log('Form submitted successfully with values:', values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field
              as={TextField}
              type="text"
              name="username"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <Field
              as={TextField}
              type="text"
              name="email"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Field
              as={TextField}
              type="password"
              name="password"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
