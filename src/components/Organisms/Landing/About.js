import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Image from 'next/image';
import logodark from '../../../../public/images/svg/webNovaLogoBlack.svg';

const About = () => {
  return (
    <>
      <section className="section bg-light py-5" id="about">
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={6} sm={7} className="mx-auto">
              <div>
                <Image src={logodark} alt="" className="img-fluid mx-auto" height={50} />
              </div>
            </Col>
            <Col lg={6}>
              <div className="text-muted">
                <div className="avatar-sm icon-effect mb-4">
                  <div className="avatar-title bg-transparent rounded-circle text-success h1">
                    <i className="ri-team-line fs-36"></i>
                  </div>
                </div>
                <h3 className="mb-3 fs-20">About Us</h3>
                <p className="mb-4 ff-secondary fs-16">
                  WebNova is a sophisticated Artificially Intelligent Virtual Assistant (AIVA) designed to revolutionize
                  the user experience through intelligent and personalized interactions. As a user, you'll find WebNova
                  to be an intuitive and responsive assistant capable of answering queries. The chat interface is designed to be user-friendly, ensuring that you
                  can easily communicate your needs and receive accurate and timely responses.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
