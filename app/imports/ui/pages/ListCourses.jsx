import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useLocation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/courses/Course';
import CourseItem from '../components/CourseItem';

/* Renders a table containing all of the Course documents. Use <CourseItem> to render each row. */
const ListCourses = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Course documents.
    const subscription = Meteor.subscribe(Courses.publicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const courseItems = Courses.collection.find({}).fetch();
    return {
      courses: courseItems,
      ready: rdy,
    };
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let query = queryParams.get('query');

  let coursesFiltered = courses; // Initialize coursesFiltered with all courses

  if (query) { // Check if query has a value (is not null, undefined, or an empty string)
    query = query.replace(/\s/g, '');
    coursesFiltered = courses.filter((course) => {
      const courseName = course.name.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return courseName.includes(lowerCaseQuery);
    });
  }

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Courses</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course</th>
                <th>Title</th>
                <th>Professors</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {coursesFiltered.map((course) => <CourseItem key={course._id} course={course} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCourses;
