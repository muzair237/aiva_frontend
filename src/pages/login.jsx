import React from 'react';
import { Card, Col, Container, Row, CardBody } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Input from '../components/Atoms/Input';
import Label from '../components/Atoms/Label';
import Button from '../components/Atoms/Button';
import authThunk from '../slices/auth/thunk';
import isLoggedIn from '../components/Common/isLoggedIn';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(state => state?.Auth?.isLoading);

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().required('Please Enter Email!').email('Please Enter a Valid Email!'),
    password: Yup.string().required('Please Enter Password!'),
  });

  const onSubmit = async payload => {
    dispatch(authThunk.login({ payload, router }));
  };
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
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                          <div className="mb-3">
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="text" placeholder="Enter email" />
                          </div>
                          <div className="mb-3">
                            <Label htmlFor="password-input">Password</Label>
                            <div className="float-end">
                              <Link href="/forget-password" className="text-muted">
                                Forgot password?
                              </Link>
                            </div>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <Input name="password" type="password" placeholder="Enter password" />
                            </div>
                          </div>
                          <div className="form-check">
                            <Input name="rememberMe" className="form-check-input" type="checkbox" />
                            <Label htmlFor="auth-remember-check">Remember me</Label>
                          </div>
                          <div className="mt-4 mb-5">
                            <Button color="primary" loading={isLoading} className="w-100" type="submit">
                              Sign In
                            </Button>
                          </div>
                          <div className="text-center">
                            <p className="mb-0">
                              &copy; {new Date().getFullYear()} CRM. Crafted with{' '}
                              <i className="mdi mdi-heart text-danger" /> by M. Uzair
                            </p>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="mb-0">
                        Don&apos;t have an account ?{' '}
                        <Link href="/signup" className="fw-semibold text-primary text-decoration-underline">
                          Signup
                        </Link>
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
