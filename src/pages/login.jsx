import React, { useState } from 'react';
import { Card, Col, Container, Row, Label, Input, CardBody, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthSlider from '../components/Organisms/AuthCarousel';
import generateFormSchema from '../helpers/validationSchemas';
import authThunk from '../slices/auth/thunk';
import isLoggedIn from '../components/Common/isLoggedIn';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  // const router = useRouter();
  // const dispatch = useDispatch();
  // const isLoading = useSelector(state => state?.Auth?.isLoading);
  // const { initialValues, validationSchema } = generateFormSchema({
  //   email: {
  //     required: true,
  //     patterns: [{ pattern: /^\S+@\S+\.\S+$/, message: 'Invalid Email' }],
  //   },
  //   password: {
  //     required: true,
  //     patterns: [
  //       {
  //         pattern: /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  //         message:
  //           'Password must be 8 characters long with 1 special character, 1 number, and 1 uppercase and lowercase letter',
  //       },
  //     ],
  //   },
  // });

  // const onSubmit = async payload => {
  //   dispatch(authThunk.login({ payload, router }));
  // };
  return (
    <>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link href="/" className="d-inline-block auth-logo">
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
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">Sign in to continue to Velzon.</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form action="#">
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            Username
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link href="/auth-pass-reset-basic" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <Label className="form-label" htmlFor="password-input">
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              type={passwordShow ? 'text' : 'password'}
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              required
                            />
                            <button
                              onClick={() => setPasswordShow(!passwordShow)}
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon">
                              <i className="ri-eye-fill align-middle" />
                            </button>
                          </div>
                        </div>

                        <div className="form-check">
                          <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                          <Label className="form-check-label" htmlFor="auth-remember-check">
                            Remember me
                          </Label>
                        </div>

                        <div className="mt-4">
                          <Button color="success" className="btn btn-info w-100" type="submit">
                            Sign In
                          </Button>
                        </div>
                      </form>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="mb-0">
                        Don&apos;t have an account ?{' '}
                        <Link href="/auth-signup-basic" className="fw-semibold text-primary text-decoration-underline">
                          {' '}
                          Signup{' '}
                        </Link>{' '}
                      </p>
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
export default isLoggedIn(Login);
