import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons';
import { Reviews } from '../../api/reviews/Review';

const displayStars = (review) => {
  const stars = [];
  for (let i = 0; i < review.rating; i++) {
    stars.push(<span> ★ </span>);
  }
  return stars;
};

const ReviewCardProfessor = ({ review }) => {
  const removeReview = (collection, docID) => {
    collection.remove(docID);
  };
  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title> {displayStars(review)} <br /> {review.professor} <br /> {review.courseName}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{review.reviewContent}</Card.Text>
        <Card.Subtitle>
          Grade: {review.grade} <br /> <i>{review.reviewer}</i>
        </Card.Subtitle>
        <Link to={`/editreview/${review._id}`}><Button variant="warning">Edit</Button></Link>
        <Button variant="danger" onClick={() => removeReview(Reviews.collection, review._id)}><Trash /></Button>
      </Card.Body>
    </Card>
  );
};

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
