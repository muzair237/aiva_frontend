import React, { useState } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';
import isLoggedIn from '../components/Common/isLoggedIn';
// import logoLight from '../../../assets/images/logo-light.png';
import Input from '../components/Atoms/Input';
import Label from '../components/Atoms/Label';
import Button from '../components/Atoms/Button';
import authThunk from '../slices/auth/thunk';
import { getCookie } from '../helpers/common';

const CreatePassword = () => {
  const email = getCookie('email');
  const dispatch = useDispatch();
  const router = useRouter();
  const initialValues = { password: '', newPassword: '' };
  const isLoading = useSelector(state => state?.Auth?.isLoading);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Please Enter Password!')
      .matches(
        /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      ),
    newPassword: Yup.string()
      .when('password', {
        is: val => val && val.length > 0,
        then: () => Yup.string().oneOf([Yup.ref('password')], 'Both passwords need to be the same'),
      })
      .required('Confirm Password Required'),
  });

  const onSubmit = data => {
    const payload = { email, newPassword: data?.newPassword };
    dispatch(authThunk.resetPassword({ payload, router }));
  };
  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link href="/#" className="d-inline-block auth-logo">
                    {/* <img src={logoLight} alt="" height="20" /> */}
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Create new password</h5>
                    <p className="text-muted">Your new password must be different from previous used password.</p>
                  </div>

                  <div className="p-2">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                      <Form>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="password-input">
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup">
                            <Input name="password" type="password" placeholder="Enter password" />
                          </div>
                        </div>

                        <div className="mb-3">
                          <Label className="form-label" htmlFor="confirm-password-input">
                            Confirm Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input name="newPassword" type="password" placeholder="Enter Confirm password" />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button color="primary" loading={isLoading} className="w-100" type="submit">
                            Reset Password
                          </Button>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

export default isLoggedIn(CreatePassword);
