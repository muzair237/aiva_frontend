import React from 'react';
import Link from 'next/link';
import { Col, Container, Row } from 'reactstrap';

const Features = () => {
  return (
    <>
      <section className="section bg-light" id="features">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-semibold lh-base">WebNova: Your Intelligent Virtual Assistant</h1>
                <p className="text-muted">WebNova is here to support you with these essential features:</p>
              </div>
            </Col>
          </Row>

          <Row className="g-3">
            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-hand-heart-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Academic Support</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Get assistance with your academic questions and challenges.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-lightbulb-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Personalized Insights</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Receive personalized insights reagarding queries and personal information.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-customer-service-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">24/7 Assistance</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Access support anytime, day or night, whenever you need help.
                  </p>
                  <div>
                    <Link href="#" className="fs-13 fw-medium">
                      Learn More <i className="ri-arrow-right-s-line align-bottom"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-shield-check-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Safe Platform</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Your information is secure with us. We prioritize your privacy and data protection.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-check-double-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Quick Answers</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Get rapid answers to your questions, ensuring you stay on track.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="d-flex p-3">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm icon-effect">
                    <div className="avatar-title bg-transparent text-success rounded-circle">
                      <i className="ri-device-line fs-36"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-18">Smooth User Interface</h5>
                  <p className="text-muted my-3 ff-secondary">
                    Enjoy a seamless experience with our intuitive and visually appealing interface.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Features;
