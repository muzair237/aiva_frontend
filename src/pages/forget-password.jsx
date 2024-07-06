import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Row, Col, Alert, Card, CardBody, Container } from 'reactstrap';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineMail } from 'react-icons/md';
import authThunk from '../slices/auth/thunk';
import isLoggedIn from '../components/Common/isLoggedIn';
import Input from '../components/Atoms/Input';
import Label from '../components/Atoms/Label';
import Button from '../components/Atoms/Button';
import webNovaLogoLg from '../../public/images/svg/webNovaLogoLg.svg';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';

const ForgetPasswordPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(state => state?.Auth?.isLoading);

  const initialValues = { email: '' };

  const validationSchema = Yup.object({
    email: Yup.string().required('Please Enter Email!').email('Please Enter a Valid Email!'),
  });

  const onSubmit = payload => {
    dispatch(authThunk.forgetPassword({ payload, router }));
  };
  return (
    <>
      <Head>
        <title>WebNova | FORGET PASSWORD</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link href="/" className="d-inline-block auth-logo">
                      <Image src={webNovaLogoLg} alt="WebNova Logo" height="24" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">An Artificially Intelligent Virtual Assistant</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2 mb-3">
                      <h5 className="text-primary">Forgot Password?</h5>
                      <p className="text-muted">Reset Password with WebNova</p>
                      <MdOutlineMail
                        className="animate__animated animate__pulse animate__infinite infinite"
                        size={75}
                      />
                    </div>
                    <Alert className="alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                      Enter your email and instructions will be sent to you!
                    </Alert>
                    <div className="p-2">
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                          <div className="mb-4">
                            <Label className="form-label">Email</Label>
                            <Input name="email" className="form-control" placeholder="Enter Email" type="email" />
                          </div>

                          <div className="text-center mt-4">
                            <Button
                              color="primary"
                              loading={isLoading}
                              disabled={isLoading}
                              className="w-100"
                              type="submit">
                              Send OTP
                            </Button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I Remember my Password...{' '}
                    <Link href="/login" className="fw-semibold text-primary">
                      Login
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </>
  );
};

export default isLoggedIn(ForgetPasswordPage);
