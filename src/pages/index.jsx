import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Organisms/Landing/Navbar';
import Home from '../components/Organisms/Landing/Home';
import About from '../components/Organisms/Landing/About';
import Process from '../components/Organisms/Landing/Process';
import Features from '../components/Organisms/Landing/Features';
import CTA from '../components/Organisms/Landing/CTA';
import Footer from '../components/Organisms/Landing/Footer';
import Enquiry from '../components/Organisms/Landing/Enquiry';;

const Index = () => {
  useEffect(() => {
    const scrollFunction = () => {
      const element = document.getElementById('back-to-top');
      if (element) {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      }
    };

    window.onscroll = scrollFunction;

    // Cleanup function to remove the scroll event listener
    return () => {
      window.onscroll = null;
    };
  }, []); // Empty dependency array to run only once

  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <Head>
        <title>WebNova</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="layout-wrapper landing">
        <Navbar />
        <Home />
        <About />
        <Process />
        <Features />
        <CTA />
        <Enquiry />
        <Footer />
        <button onClick={toTop} className="btn btn-danger btn-icon landing-back-top" id="back-to-top">
          <i className="ri-arrow-up-line"></i>
        </button>
      </div>
    </>
  );
};

export default Index;
