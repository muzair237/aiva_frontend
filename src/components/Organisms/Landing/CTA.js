import React from 'react';
import Link from 'next/link';
import { Col, Container, Row } from 'reactstrap';

const CTA = () => {
  return (
    <>
      <section className="py-5 bg-primary position-relative">
        <div className="bg-overlay bg-overlay-pattern opacity-50"></div>
        <Container>
          <Row className="align-items-center gy-4">
            <Col className="col-sm">
              <div>
                <h4 className="text-white mb-0 fw-semibold">
                  Discover how <span className="text-warning">WebNova</span> enhances your university experience.
                </h4>
              </div>
            </Col>
            <Col className="col-sm-auto">
              <div>
                <Link href="/signup" className="btn bg-gradient btn-danger">
                  <i className="ri-info-line align-middle me-1"></i> Create Free Account
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CTA;
