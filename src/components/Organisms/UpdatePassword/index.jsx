import React from 'react';
import { Col, Row } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../Atoms/Input';
import Label from '../../Atoms/Label';
import authThunk from '../../../slices/auth/thunk';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.Auth?.user);
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

  const onSubmit = (values, { resetForm }) => {
    const payload = {
      email: user?.email,
      password: values?.newPassword,
    };
    dispatch(authThunk.updateUser({ userId: user?._id, payload }));
    resetForm();
  };
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
              <button type="submit" className="btn btn-primary">
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
