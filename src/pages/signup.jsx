import React, { useState } from 'react';
import { Card, CardBody, Col, Container, Row, Form, FormFeedback, Input, Button } from 'reactstrap';

//import images
// import logoLight from '../../../assets/images/logo-light.png';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';
import isLoggedIn from '../components/Common/isLoggedIn';

const SignUp = () => {
  const [passwordShow, setPasswordShow] = useState(false);

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
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">Get your free velzon account now</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form className="needs-validation" action="#">
                        <div className="mb-3">
                          <label htmlFor="useremail" className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="useremail"
                            placeholder="Enter email address"
                            required
                          />
                          <div className="invalid-feedback">Please enter email</div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            required
                          />
                          <div className="invalid-feedback">Please enter username</div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="password-input">
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup">
                            <Input
                              type={passwordShow ? 'text' : 'password'}
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              name="password"
                            />
                            <Button
                              color="link"
                              onClick={() => setPasswordShow(!passwordShow)}
                              className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon">
                              <i className="ri-eye-fill align-middle" />
                            </Button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="mb-0 fs-13 text-muted fst-italic">
                            By registering you agree to the Velzon
                            <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                        <div className="mt-4">
                          <button className="btn btn-info w-100" type="submit">
                            Sign Up
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="mb-0">
                        Already have an account ?{' '}
                        <Link href="/auth-signin-basic" className="fw-semibold text-primary text-decoration-underline">
                          {' '}
                          Signin{' '}
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

export default isLoggedIn(SignUp);
