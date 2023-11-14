import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const ReviewCard = ({ review }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title> {review.rating} <br /> {review.courseName} <br /> {review.professor}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>{review.reviewContent}</Card.Text>
      <Card.Subtitle>
        {review.grade} <br /> {review.reviewer}
      </Card.Subtitle>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ReviewCard.propTypes = {
  review: PropTypes.shape({
    courseName: PropTypes.string,
    professor: PropTypes.string,
    reviewContent: PropTypes.string,
    rating: PropTypes.number,
    grade: PropTypes.string,
    reviewer: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;
