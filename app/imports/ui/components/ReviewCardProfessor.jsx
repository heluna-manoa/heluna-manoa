import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const displayStars = (review) => {
  const stars = [];
  for (let i = 0; i < review.rating; i++) {
    stars.push(<span> ★ </span>);
  }
  return stars;
};

const ReviewCardProfessor = ({ review }) => (
  <Card className="h-100 landing-card">
    <Card.Header>
      <Card.Title> {displayStars(review)} <br /> {review.professor}
      </Card.Title>
      <Card.Subtitle>Course: {review.courseName}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{review.reviewContent}</Card.Text>
      <Card.Subtitle>
        Grade: {review.grade}
        <br />
        Reviewer: {review.anonymous ? (<i>Anonymous</i>) : (<i>{review.reviewer}</i>)}
      </Card.Subtitle>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ReviewCardProfessor.propTypes = {
  review: PropTypes.shape({
    courseName: PropTypes.string,
    professor: PropTypes.string,
    reviewContent: PropTypes.string,
    rating: PropTypes.number,
    grade: PropTypes.string,
    reviewer: PropTypes.string,
    anonymous: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReviewCardProfessor;
