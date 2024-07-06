import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Home = () => (
  <section className="section nft-hero" id="hero">
    <div className="bg-overlay" />
    <Container>
      <Row className="justify-content-center">
        <Col lg={8} sm={10}>
          <div className="text-center">
            <h1 className="display-4 fw-medium mb-4 lh-base text-white">
              Welcome to <span className="text-success">WebNova</span>
            </h1>
            <p className="lead text-white-50 lh-base mb-4 pb-2">
              WebNova is your intelligent virtual assistant, here to help you answer queries, and provide insights.
              Experience the future of digital assistance with WebNova.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Home;
