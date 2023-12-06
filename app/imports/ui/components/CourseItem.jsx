import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Reviews } from '../../api/reviews/Review';

/** A function to render the professors. If no professors, write No professors */
const renderProfessors = (professors) => {
  if (professors && professors.length > 0) {
    return professors.map((professor, index) => (
      <span key={index}>{professor}{index !== professors.length - 1 ? ', ' : ''}</span>
    ));
  }
  return 'No Professors';
};

/** Renders a single row in the List Courses table. See pages/ListCourses.jsx. */
const CourseItem = ({ course }) => {
  const reviewItems = useTracker(() => {
    const subscription = Meteor.subscribe(Reviews.publicationName);
    return subscription.ready() ? Reviews.collection.find({}).fetch() : [];
  }, []);

  const avgRating = (courseName) => {
    const reviewsFiltered = reviewItems.filter((review) => review.courseName === courseName);
    if (reviewsFiltered.length === 0) {
      return 'N/A';
    }
    return `${reviewsFiltered.reduce((memo, review) => memo + review.rating, 0) / reviewsFiltered.length}/5`;
  };

  return (
    <tr>
      <td>
        <Link to={`/coursereview/${course.name}`}>
          {course.name}
        </Link>
      </td>
      <td>{course.title}</td>
      <td>{renderProfessors(course.professors)}</td>
      <td>{course.credits}</td>
      <td>{avgRating(course.name)}</td>
    </tr>
  );
};

// Require a document to be passed to this component.
CourseItem.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    professors: PropTypes.arrayOf(PropTypes.string),
    credits: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default CourseItem;
