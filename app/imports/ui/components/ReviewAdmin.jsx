import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

const ReviewAdmin = ({ review }) => {
  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title>{review.className} {review.professor}</Card.Title>
        <Card.Subtitle>{contact.address}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <p>{contact.description}</p>
        <footer className="blockquote-footer">{contact.owner}</footer>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
ReviewAdmin.propTypes = {
  review: PropTypes.shape({
    className: PropTypes.string,
    professor: PropTypes.string,
    reviewContent: PropTypes.string,
    rating: PropTypes.number,
    reviewer: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default ReviewAdmin;
