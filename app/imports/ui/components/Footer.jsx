import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        Team Five Guys
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a href="https://github.com/heluna-manoa/heluna-manoa.github.io">
          About Heluna Manoa
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
