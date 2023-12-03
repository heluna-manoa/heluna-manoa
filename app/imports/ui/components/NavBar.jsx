import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-start">
            {currentUser ? ([
              <Nav.Link id="write-review-nav" as={NavLink} to="/write" key="write">Write Review</Nav.Link>,
              <Nav.Link id="search-course-nav" as={NavLink} to="/searchcourse" key="searchcourse">Search Courses</Nav.Link>,
              <Nav.Link id="user-reviews-nav" as={NavLink} to="/userreviews" key="userreviews">Your Reviews</Nav.Link>,
            ]) : (
              <Nav.Link id="search-course-nav" as={NavLink} to="/searchcourse" key="searchcourse">Search Courses</Nav.Link>
            )}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link id="search-admin-nav" as={NavLink} to="/courseadmin" key="courseadmin">Admin</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-center">
            <a href="/">
              <Image src="/images/helunaManoaLogo.png" height={128} className="px-3" />
            </a>
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
