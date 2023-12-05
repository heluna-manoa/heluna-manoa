import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

const displayStars = (professor) => {
  const stars = [];
  for (let i = 0; i < professor.rating; i++) {
    stars.push(<span> ★ </span>);
  }
  return stars;
};

const ProfessorCard = ({ professor }) => (
  <Card className="h-100 landing-card">
    <Card.Header>
      <Card.Title>
        <Image src={professor.image} />
        {professor.profName}
        <br />
        {displayStars(professor)}
      </Card.Title>
      <Card.Subtitle>{professor.department}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{professor.courses}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfessorCard.propTypes = {
  professor: PropTypes.shape({
    profName: PropTypes.string,
    department: PropTypes.string,
    image: PropTypes.string,
    courses: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfessorCard;
