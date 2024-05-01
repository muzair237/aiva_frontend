import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';
import Link from 'next/link';

//import images
// import logoLight from '../../../assets/images/logo-light.png';

const PasswordResetSuccess = () => (
  <>
    <div className="auth-page-wrapper">
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link href="/dashboard" className="d-inline-block auth-logo">
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
                  <CardBody className="p-4 text-center">
                    <div className="avatar-lg mx-auto mt-2">
                      <div className="avatar-title bg-light text-success display-3 rounded-circle">
                        <i className="ri-checkbox-circle-fill" />
                      </div>
                    </div>
                    <div className="mt-4 pt-2">
                      <h4>Well done !</h4>
                      <p className="text-muted mx-4">You have Successfully Reset Your Password.</p>
                      <div className="mt-4">
                        <Link href="/auth-signin-basic" className="btn btn-info w-100">
                          Login
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </div>
  </>
);

export default PasswordResetSuccess;
