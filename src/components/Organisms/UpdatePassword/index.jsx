import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/Atoms/Input';
import Label from '@/components/Atoms/Label';
import { Col, Row } from 'reactstrap';

const UpdatePassword = () => {
  const initialValues = { password: '', newPassword: '' };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Please Enter Password!')
      .matches(
        '^(?=.*[!@#$%^&*])(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$',
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      ),
    newPassword: Yup.string()
      .when('password', {
        is: val => val && val.length > 0,
        then: () => Yup.string().oneOf([Yup.ref('password')], 'Both passwords need to be the same'),
      })
      .required('Please Confirm Password!'),
  });

  const onSubmit = payload => {
    dispatch(authThunk.signUp({ payload, router }));
  };
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      <Form>
        <Row className="g-2">
          <div className="col-6">
            <Label className="form-label" htmlFor="password-input">
              Password *
            </Label>
            <div className="position-relative auth-pass-inputgroup mb-0">
              <Input name="password" type="password" placeholder="Enter Password" />
            </div>
          </div>
          <div className="col-6">
            <Label className="form-label" htmlFor="password-input">
              Confirm Password *
            </Label>
            <div className="position-relative auth-pass-inputgroup mb-0">
              <Input name="newPassword" type="password" placeholder="Enter Confirm  Password" />
            </div>
          </div>
          <Col lg={12}>
            <div className="text-end">
              <button type="submit" className="btn btn-info">
                Change Password
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </Formik>
  );
};

export default UpdatePassword;
