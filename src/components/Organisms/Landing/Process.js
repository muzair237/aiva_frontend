import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

const Process = () => {
  const webNovaProcess = [
    {
      id: 1,
      clss: 'shadow-lg',
      lable: 'Create Account',
      desc: 'Start by creating your WebNova account.',
    },
    {
      id: 2,
      lable: 'Customize Settings',
      desc: 'Personalize your experience by adjusting your settings.',
    },
    {
      id: 3,
      lable: 'Ask Questions',
      desc: 'Interact with WebNova by asking your queries.',
    },
    {
      id: 4,
      lable: 'Get Insights',
      desc: 'Receive personal insights and analytics from WebNova.',
    },
  ];

  return (
    <>
      <section className="section" id="process">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-5">
                <h1 className="mb-3 ff-secondary fw-bold lh-base">
                  Connect with <span className="text-primary">WebNova</span>
                </h1>
                <p className="text-muted">
                  AIVA, or Artificial Intelligence Virtual Assistant, is a computer program designed to assist users
                  with tasks using artificial intelligence techniques.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            {webNovaProcess.map((item, key) => (
              <Col lg={3} md={6} key={key}>
                <Card className={key === 0 ? 'card shadow-lg' : 'card shadow-none card-border-effect-none border-0'}>
                  <CardBody className="p-4">
                    <h1 className="fw-bold display-5 ff-secondary mb-4 text-success position-relative">
                      <div className="job-icon-effect"></div>
                      <span>{item.id}</span>
                    </h1>
                    <h6 className="fs-18 mb-2">{item.lable}</h6>
                    <p className="text-muted mb-0 fs-17">{item.desc}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Process;
