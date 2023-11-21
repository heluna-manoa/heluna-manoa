import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import ReviewCard from './ReviewCard';
import ReviewCardProfessor from './ReviewCardProfessor';
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
    <Container className="py-3">
      <Row>
        <Col className="format-align-center">
          {reviews.map((review) => (<Col key={review.course} className="my-3"><ReviewCard review={review} /></Col>))}
        </Col>
        <Col className="format-align-center">
          {reviews.map((review) => (<Col key={review.professor} className="my-3"><ReviewCardProfessor review={review} /></Col>))}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserReviews;
