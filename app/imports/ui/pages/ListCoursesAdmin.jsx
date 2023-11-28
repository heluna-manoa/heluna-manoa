import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { PlusCircleFill } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/courses/Course';
import CourseItemAdmin from '../components/CourseItemAdmin';

/* Renders a table containing all of the Course documents. Use <CourseItem> to render each row. */
const ListCoursesAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const navigate = useNavigate();
  const routeChange = () => {
    const path = '/addcourse';
    navigate(path);
  };
  const routeChange2 = () => {
    const path = '/addprof';
    navigate(path);
  };
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
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2 style={{ color: 'white' }}>List Courses Admin</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course</th>
                <th>Title</th>
                <th>Professors</th>
                <th>Credits</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => <CourseItemAdmin key={course._id} course={course} collection={Courses.collection} />)}
            </tbody>
          </Table>
          <h2 style={{ color: 'white' }}><Button variant="primary" onClick={routeChange}><PlusCircleFill /> Add Course</Button></h2>
          <h2 style={{ color: 'white' }}><Button variant="primary" onClick={routeChange2}><PlusCircleFill /> Add Professor</Button></h2>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCoursesAdmin;
