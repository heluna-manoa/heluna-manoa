import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col } from 'react-bootstrap';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col id="signout-page" className="text-center top-navbar-margin"><h2 style={{ color: 'white' }}>You are signed out.</h2></Col>
  );
};

export default SignOut;
