import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Col } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import logoLight from '../../../../public/images/logo-light.png';

const AuthSlider = () => (
  <Col lg={6}>
    <div className="p-lg-5 p-4 auth-one-bg h-100">
      <div className="bg-overlay" />
      <div className="position-relative h-100 d-flex flex-column">
        <div className="mb-4">
          <Link href="/" className="d-block">
            <Image src={logoLight} alt="" height="18" />
          </Link>
        </div>
        <div className="mt-auto">
          <div className="mb-3">
            <i className="ri-double-quotes-l display-4 text-success" />
          </div>

          <Carousel
            showThumbs={false}
            autoPlay
            showArrows={false}
            showStatus={false}
            infiniteLoop
            className="carousel slide"
            id="qoutescarouselIndicators">
            <div className="carousel-inner text-center text-white-50 pb-5">
              <div className="item">
                <p className="fs-15 fst-italic">&quot; Turning Data into Relationships, Seamlessly. &quot;</p>
              </div>
            </div>
            <div className="carousel-inner text-center text-white-50 pb-5">
              <div className="item">
                <p className="fs-15 fst-italic">
                  &quot; Crafting Connections for Your Success &ndash; That&apos;s Our AIVA. &quot;
                </p>
              </div>
            </div>
            <div className="carousel-inner text-center text-white-50 pb-5">
              <div className="item">
                <p className="fs-15 fst-italic">&quot; Strengthening Bonds, Driving Results: ConnectPro AIVA &quot;</p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  </Col>
);

export default AuthSlider;
