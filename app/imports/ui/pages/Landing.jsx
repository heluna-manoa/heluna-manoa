import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import DisplayReviews from '../components/DisplayReviews';
import DisplayReviewsUserless from '../components/DisplayReviewsUserless';
import SearchBar from '../components/SearchBar';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center landing-page">
        <Col>
          <h2 style={{ color: 'white' }}>Search by Course</h2>
          <SearchBar />
        </Col>
        <Col>
          <h2 style={{ color: 'white' }}>Search by Professor</h2>
          <text style={{ color: 'white' }}>Coming Soon</text>
          {/*
          <form method="get" action="/searchcourse">
            <input type="search" id="prof-search" name="professor" />
          </form>
          */}
        </Col>
      </Row>
      <hr />
      {currentUser === '' ? (
        <Row className="align-middle text-center">
          <Col>
            <h2 style={{ color: 'white' }}>Recent Course Reviews</h2>
          </Col>
          <Col>
            <h2 style={{ color: 'white' }}>Recent Professor Reviews</h2>
          </Col>
        </Row>
      ) : (
        <Row className="align-middle text-center">
          <Col>
            <h2 style={{ color: 'white' }}>My Course Reviews</h2>
          </Col>
          <Col>
            <h2 style={{ color: 'white' }}>My Professor Reviews</h2>
          </Col>
        </Row>
      )}
      <Row className="align-middle text-center">
        {currentUser === '' ? (
          // <h1 style={{ color: 'white' }}>No Reviews</h1>
          <DisplayReviewsUserless />
        ) : (
          <DisplayReviews />
        )}
      </Row>
    </Container>
  );
};

export default Landing;
