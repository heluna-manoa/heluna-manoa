import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const ReviewCard = ({ course }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{course.name} <br /> {course.title} <br /> {course.professors}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Subtitle>
        {course.credits}
      </Card.Subtitle>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ReviewCard.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    professors: PropTypes.arrayOf(PropTypes.string),
    credits: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;
