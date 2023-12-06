import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

const displayStars = (professor) => {
  const stars = [];
  for (let i = 0; i < professor.rating; i++) {
    stars.push(<span> ★ </span>);
  }
  if (stars.length === 0) {
    return 'No Reviews';
  }
  return stars;
};

const ProfessorCard = ({ professor }) => (
  <Card className="landing-card">
    <Card.Header>
      <Card.Title>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={professor.image} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
          <div>
            {professor.profName}
            <br />
            {displayStars(professor)}
          </div>
        </div>
      </Card.Title>
      <Card.Subtitle>{professor.department}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{professor.bio}</Card.Text>
      <Card.Text>
        Courses:
        <ul>
          {professor.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfessorCard.propTypes = {
  professor: PropTypes.shape({
    profName: PropTypes.string,
    department: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    courses: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfessorCard;
