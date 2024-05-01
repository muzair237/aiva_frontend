import React, { useState } from 'react';
Link
import { Button, Card, CardBody, Col, Container, Row, Form, Input, Label, FormFeedback } from 'reactstrap';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';
import isLoggedIn from '../components/Common/isLoggedIn';
// import logoLight from '../../../assets/images/logo-light.png';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const CreatePassword = () => {

  const [passwordShow, setPasswordShow] = useState(false);
  const [confrimPasswordShow, setConfrimPasswordShow] = useState(false);


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
                    <Form action="/auth-signin-basic">
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="password-input">
                          Password
                        </Label>
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

                      <div className="mb-3">
                        <Label className="form-label" htmlFor="confirm-password-input">
                          Confirm Password
                        </Label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <Input
                            type={confrimPasswordShow ? 'text' : 'password'}
                            className="form-control pe-5 password-input"
                            placeholder="Confirm password"
                            id="confirm-password-input"
                            name="confrim_password"
                          />
                          <Button
                            color="link"
                            onClick={() => setConfrimPasswordShow(!confrimPasswordShow)}
                            className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            type="button">
                            <i className="ri-eye-fill align-middle"></i>
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button color="success" className="w-100" type="submit">
                          Reset Password
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{' '}
                  <Link href="/auth-signin-basic" className="fw-semibold text-primary text-decoration-underline">
                    {' '}
                    Click here{' '}
                  </Link>{' '}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

export default isLoggedIn(CreatePassword);
