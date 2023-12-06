import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewCard from '../components/ReviewCard';
import { Reviews } from '../../api/reviews/Review';

const UserReviews = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, reviews } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Course documents.
    const subscription = Meteor.subscribe(Reviews.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const userName = Meteor.user().username;
    const reviewItems = Reviews.collection.find({ reviewer: userName }).fetch();
    return {
      reviews: reviewItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="top-navbar-margin">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2 style={{ color: 'white' }}>Your Reviews</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {reviews.map((review) => (<Col key={review._id}><ReviewCard review={review} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserReviews;
