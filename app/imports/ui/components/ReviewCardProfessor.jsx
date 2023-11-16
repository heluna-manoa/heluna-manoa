import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ReviewCardProfessor = ({ review }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title> {review.professor} <br /> Rating: {review.rating} <br /> {review.courseName}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>{review.reviewContent}</Card.Text>
      <Card.Subtitle>
        Grade: {review.grade} <br /> <i>{review.reviewer}</i>
      </Card.Subtitle>
      <Link to={`/editreview/${review._id}`}>Edit</Link>
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
    _id: PropTypes.string,
  }).isRequired,
};

export default ReviewCardProfessor;
