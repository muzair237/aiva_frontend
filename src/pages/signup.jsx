import React from 'react';
import Image from 'next/image';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '../components/Atoms/Input';
import Label from '../components/Atoms/Label';
import Button from '../components/Atoms/Button';
import webNovaLogoLg from '../../public/images/svg/webNovaLogoLg.svg';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';
import isLoggedIn from '../components/Common/isLoggedIn';
import authThunk from '../slices/auth/thunk';

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(state => state?.Auth?.isLoading);

  const initialValues = { first_name: '', last_name: '', email: '', password: '', newPassword: '', DOB: '' };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('Please Enter First Name!').min(3, 'First Name must be at least 3 Characters'),
    last_name: Yup.string().required('Please Enter Last Name!').min(3, 'Last Name must be at least 3 Characters'),
    email: Yup.string().required('Please Enter Email!').email('Please Enter a Valid Email!'),
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
      .required('Confirm Password Required'),
    DOB: Yup.date().required('Please Enter Date of Birth!').max(new Date(), 'Date of Birth cannot be in the future'),
  });

  const onSubmit = payload => {
    dispatch(authThunk.signUp({ payload, router }));
  };

  return (
    <>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link href="/" className="d-inline-block auth-logo">
                      <Image src={webNovaLogoLg} alt="WebNova Logo" height="24" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium text-primary">An Artificially Intelligent Virtual Assistant</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} xl={8}>
                <Card className="mt-4">
                  <CardBody className="p-4 pb-0">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">Get Your Free WebNova Account Now</p>
                    </div>
                    <div className="p-2 mt-4">
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                          <Row className="mb-2">
                            <div className="col-6">
                              <Label htmlFor="firstname" className="form-label">
                                First Name *
                              </Label>
                              <Input
                                name="first_name"
                                className="form-control"
                                placeholder="Enter First Name"
                                type="text"
                              />
                            </div>
                            <div className="col-6">
                              <Label htmlFor="lastname" className="form-label">
                                Last Name *
                              </Label>
                              <Input
                                name="last_name"
                                className="form-control"
                                placeholder="Enter Last Name"
                                type="text"
                              />
                            </div>
                          </Row>
                          <Row className="mb-2">
                            <div className="col-6">
                              <Label className="form-label" htmlFor="dob-input">
                                Date of Birth *
                              </Label>
                              <div className="position-relative auth-pass-inputgroup">
                                <Input name="DOB" type="date" placeholder="Select DOB" />
                              </div>
                            </div>
                            <div className="col-6">
                              <Label htmlFor="email" className="form-label">
                                Email *
                              </Label>
                              <Input name="email" type="text" placeholder="Enter email" />
                            </div>
                          </Row>
                          <Row className="mb-2">
                            <div className="col-6">
                              <Label className="form-label" htmlFor="password-input">
                                Password *
                              </Label>
                              <div className="position-relative auth-pass-inputgroup mb-0">
                                <Input name="password" type="password" placeholder="Enter password" />
                              </div>
                            </div>
                            <div className="col-6">
                              <Label className="form-label" htmlFor="password-input">
                                Confirm Password *
                              </Label>
                              <div className="position-relative auth-pass-inputgroup mb-0">
                                <Input name="newPassword" type="password" placeholder="Enter password" />
                              </div>
                            </div>
                          </Row>
                          <div className="form-check">
                            <Input name="rememberMe" className="form-check-input" type="checkbox" />
                            <Label className="form-check-label" htmlFor="auth-remember-check">
                              Remember me
                            </Label>
                          </div>

                          <div className="mt-4">
                            <Button color="primary" loading={isLoading} className="w-100" type="submit">
                              Sign Up
                            </Button>
                          </div>
                          <div className="mt-4 text-center">
                            <div className="signin-other-title">
                              <p className="mb-0">
                                Already have an account ?{' '}
                                <Link href="/login" className="fw-semibold text-primary">
                                  Login
                                </Link>
                              </p>
                            </div>
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
    </>
  );
};

export default isLoggedIn(SignUp);
