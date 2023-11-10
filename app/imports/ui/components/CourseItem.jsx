import React from 'react';
import PropTypes from 'prop-types';

/** A function to render the professors. If no professors, write No professors */
// const renderProfessors = (professors) => {
//   if (professors && professors.length > 0) {
//     return professors.map((professor, index) => (
//       <span key={index}>{professor}{index !== professors.length - 1 ? ', ' : ''}</span>
//     ));
//   }
//   return 'No Professors';
// };

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const CourseItem = ({ course }) => (
  <tr>
    <td>{course.name}</td>
    <td>{course.title}</td>
    {/* <td>{renderProfessors(course.professors)}</td> */}
    <td>{course.credits}</td>
  </tr>
);

// Require a document to be passed to this component.
CourseItem.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    // professors: PropTypes.arrayOf(PropTypes.string),
    credits: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default CourseItem;
