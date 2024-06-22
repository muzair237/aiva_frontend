import React, { useState, useEffect } from 'react';
import { Collapse, Container, NavbarToggler, NavLink } from 'reactstrap';
import Link from 'next/link';
import Scrollspy from 'react-scrollspy';
import logodark from '../../../../public/images/svg/webNovaLogoBlack.svg';
import logolight from '../../../../public/images/svg/webNovaLogoWhite.svg';
import Image from 'next/image';

const Navbar = () => {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [navClass, setnavClass] = useState('');

  const toggle = () => setisOpenMenu(!isOpenMenu);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', scrollNavigation, true);
    }
  });

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass('is-sticky');
    } else {
      setnavClass('');
    }
  };
  return (
    <>
      <nav className={'navbar navbar-expand-lg navbar-landing navbar-light fixed-top ' + navClass} id="navbar">
        <Container>
          <Link className="navbar-brand" href="/index">
            <Image src={logodark} className="card-logo card-logo-dark" alt="logo dark" height="20" />
            <Image src={logolight} className="card-logo card-logo-light" alt="logo light" height="20" />
          </Link>

          <NavbarToggler
            className="navbar-toggler py-0 fs-20 text-body"
            onClick={toggle}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <i className="mdi mdi-menu"></i>
          </NavbarToggler>

          <Collapse className="navbar-collapse" id="navbarSupportedContent">
            <Scrollspy
              offset={-18}
              items={['hero', 'about', 'process', 'features', 'categories', 'creators']}
              currentClassName="active"
              className="navbar-nav mx-auto mt-2 mt-lg-0"
              id="navbar-example">
              <li className="nav-item">
                <NavLink href="#hero">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="#about">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="#process">Process</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="#features">Features</NavLink>
              </li>
              <li className="nav-item">
                <NavLink href="#enquiry">Enquiry</NavLink>
              </li>
            </Scrollspy>

            <div className="d-flex gap-2">
              <Link href="/login" className="btn btn-link fw-medium text-decoration-none text-light">
                Sign in
              </Link>
              <Link href="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </Collapse>
        </Container>
      </nav>
      <div className="bg-overlay bg-overlay-pattern"></div>
    </>
  );
};

export default Navbar;
