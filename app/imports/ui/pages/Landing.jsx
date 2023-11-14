import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <h1>Heluna Manoa</h1>
      </Row>
      <Row className="align-middle text-center">
        <Col>
          <h2>Search by Course</h2>
          <input type="text" />
        </Col>
        <Col>
          <h2>Search by Professor</h2>
          <input type="text" />
        </Col>
      </Row>
      {currentUser === '' ? (
        <Row className="align-middle text-center">
          <Col>
            <h2>Recent Course Reviews</h2>
          </Col>
          <Col>
            <h2>Recent Professor Reviews</h2>
          </Col>
        </Row>
      ) : (
        <Row className="align-middle text-center">
          <Col>
            <h2>My Courses</h2>
          </Col>
          <Col>
            <h2>My Professors</h2>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Landing;
