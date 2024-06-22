import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';
import Button from '../components/Atoms/Button';
import { getCookie } from '../helpers/common';
import authThunk from '../slices/auth/thunk';
import Head from 'next/head';
import webNovaLogoLg from '../../public/images/svg/webNovaLogoLg.svg';
import Image from 'next/image';

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const email = getCookie('email');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isClient, setIsClient] = useState(false);
  const isLoading = useSelector(state => state?.Auth?.isLoading);

  const getInputElement = index => document.getElementById(`digit${index}-input`);

  const moveToNext = index => {
    if (getInputElement(index).value.length === 1) {
      if (index !== 4) {
        getInputElement(index + 1).focus();
      } else {
        getInputElement(index).blur();
        const otpDigits = [];
        for (let i = 1; i <= 4; i++) {
          otpDigits.push(getInputElement(i).value);
        }
        setOtp(otpDigits.join(''));
      }
    }
    setError('');
  };

  const onSubmit = () => {
    if (Array.isArray(otp)) {
      setError('Invalid OTP!');
      return;
    }
    const payload = { email, otp };
    dispatch(authThunk.verifyOTP({ payload, router }));
  };

  const resendOTP = () => {
    const payload = { email };
    dispatch(authThunk.forgetPassword({ payload }));
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>WebNova | VERIFY OTP</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="auth-page-wrapper">
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
                    <p className="mt-3 fs-15 text-primary fw-medium">An Artificially Intelligent Virtual Assistant</p>
                  </div>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <Card className="mt-4">
                    <CardBody className="p-4">
                      <div className="mb-4">
                        <div className="avatar-lg mx-auto">
                          <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                            <i className="ri-mail-line" />
                          </div>
                        </div>
                      </div>

                      <div className="p-2 mt-4">
                        <div className="text-muted text-center mb-4 mx-lg-3">
                          <h4 className="">Verify Your Email</h4>
                          <p>
                            Please enter the 4 digit code sent to{' '}
                            <span className="fw-semibold">{isClient && email}</span>. OTP is Valid for 5 Miniutes.
                          </p>
                        </div>

                        <Row>
                          <Col className="col-3">
                            <div className="mb-3">
                              <label htmlFor="digit1-input" className="visually-hidden">
                                Digit 1
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-lg bg-light border-light text-center"
                                maxLength="1"
                                id="digit1-input"
                                onKeyUp={() => moveToNext(1)}
                              />
                            </div>
                          </Col>

                          <Col className="col-3">
                            <div className="mb-3">
                              <label htmlFor="digit2-input" className="visually-hidden">
                                Digit 2
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-lg bg-light border-light text-center"
                                maxLength="1"
                                id="digit2-input"
                                onKeyUp={() => moveToNext(2)}
                              />
                            </div>
                          </Col>

                          <Col className="col-3">
                            <div className="mb-3">
                              <label htmlFor="digit3-input" className="visually-hidden">
                                Digit 3
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-lg bg-light border-light text-center"
                                maxLength="1"
                                id="digit3-input"
                                onKeyUp={() => moveToNext(3)}
                              />
                            </div>
                          </Col>

                          <Col className="col-3">
                            <div className="mb-3">
                              <label htmlFor="digit4-input" className="visually-hidden">
                                Digit 4
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-lg bg-light border-light text-center"
                                maxLength="1"
                                id="digit4-input"
                                onKeyUp={() => moveToNext(4)}
                              />
                            </div>
                          </Col>
                        </Row>
                        {error !== '' && <div style={{ color: 'red' }}>{error}</div>}
                        <div className="mt-3">
                          <Button
                            onClick={onSubmit}
                            color="primary"
                            loading={isLoading}
                            disabled={isLoading}
                            className="w-100"
                            type="submit">
                            Verify OTP
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Didn&apos;t receive a code ?
                      <Link href="" onClick={resendOTP} className="fw-semibold text-primary text-decoration-underline">
                        Resend
                      </Link>{' '}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </ParticlesAuth>
      </div>
    </>
  );
};

export default VerifyOTP;
