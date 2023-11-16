import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trash } from 'react-bootstrap-icons';
import { Courses } from '../../api/courses/Course';

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
const CourseItemAdmin = ({ course }) => {
  const removeCourse = (collection, docID) => {
    console.log(`The item to remove is ${docID}`);
    collection.remove(docID);
  };
  return (
    <tr>
      <td>{course.name}</td>
      <td>{course.title}</td>
      <td>{renderProfessors(course.professors)}</td>
      <td>{course.credits}</td>
      <td><Link to={`/edit/${course._id}`}>Edit</Link></td>
      <td><Button variant="danger" onClick={() => removeCourse(Courses.collection, course._id)}><Trash /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
CourseItemAdmin.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    professors: PropTypes.arrayOf(PropTypes.string),
    credits: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  collection: PropTypes.object.isRequired,
};

export default CourseItemAdmin;
