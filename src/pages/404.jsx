import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Link from 'next/link';
import Image from 'next/image';
import ParticlesAuth from '../components/Molecules/ParticlesAuth';
import error from '../../public/images/error.svg';

const Basic404 = () => (
  <>
    <div className="auth-page-wrapper">
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center pt-4">
                  <div className="">
                    <Image src={error} width={100} height={100} alt="" className="error-basic-img move-animation" />
                  </div>
                  <div className="mt-n4">
                    <h1 className="display-1 fw-semibold">404</h1>
                    <h3 className="text-uppercase">Sorry, Page not Found</h3>
                    <p className="text-muted mb-4">The page you are looking for not available!</p>
                    <Link href="/" className="btn btn-info">
                      <i className="mdi mdi-home me-1" />
                      Back to home
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </div>
  </>
);

export default Basic404;
