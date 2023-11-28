import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

const displayStars = (review) => {
  const stars = [];
  for (let i = 0; i < review.rating; i++) {
    stars.push(<span> ★ </span>);
  }
  return stars;
};

const ProfessorCard = ({ review }) => (
  <Card className="h-100 landing-card">
    <Card.Header>
      <Card.Title>
        <Image src={review.image} />
        {review.professor}
        <br />
        {displayStars(review)}
      </Card.Title>
      <Card.Subtitle>{review.department}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{review.courses}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfessorCard.propTypes = {
  review: PropTypes.shape({
    professor: PropTypes.string,
    department: PropTypes.string,
    image: PropTypes.string,
    courses: PropTypes.string,
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfessorCard;
