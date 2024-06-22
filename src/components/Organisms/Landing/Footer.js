import React from 'react';
import Link from 'next/link';
import { Col, Container, Row } from 'reactstrap';
import logolight from '../../../../public/images/svg/webNovaLogoWhite.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
      <footer className="custom-footer bg-dark py-5 position-relative">
        <Container>
          <Row>
            <Col lg={4} className="mt-4">
              <div>
                <div>
                  <Image src={logolight} alt="logo light" height="17" />
                </div>
                <div className="mt-4">
                  <p>Artificially Intelligent Virtual Assistant</p>
                  <p className="ff-secondary">
                    You can ask any kind of query regarding your admission using WebNova, including application status,
                    course details, fee structures, and important deadlines.
                  </p>
                </div>
              </div>
            </Col>

            <Col lg={7} className="ms-lg-auto">
              <Row>
                <Col sm={4} className="mt-4">
                  <h5 className="text-white mb-0">Company</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="#about">About Us</Link>
                      </li>
                      <li>
                        <Link href="#process">Process</Link>
                      </li>
                      <li>
                        <Link href="#features">Features</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm={4} className="mt-4">
                  <h5 className="text-white mb-0">Support</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list">
                      <li>
                        <Link href="#enquiry">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="text-center text-sm-start align-items-center mt-5">
            <Col sm={6}>
              <div>
                <p className="copy-rights mb-0">{new Date().getFullYear()} © WebNova</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
