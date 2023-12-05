import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useLocation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Professors } from '../../api/professors/Professor';
import ProfessorCard from '../components/ProfessorCard';

/* Renders a table containing all of the Course documents. Use <CourseItem> to render each row. */
const ListProfessors = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, professors } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Course documents.
    const subscription = Meteor.subscribe(Professors.publicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const professorCards = Professors.collection.find({}).fetch();
    return {
      professors: professorCards,
      ready: rdy,
    };
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let query = queryParams.get('query');

  let professorsFiltered = professors; // Initialize coursesFiltered with all courses

  if (query) { // Check if query has a value (is not null, undefined, or an empty string)
    query = query.replace(/\s/g, '');
    professorsFiltered = professors.filter((professor) => {
      const professorName = professor.profName.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return professorName.includes(lowerCaseQuery);
    });
  }

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2 style={{ color: 'white' }}>List Professors</h2>
          </Col>
        </Col>
      </Row>
      <Container className="py-3">
        <Row>
          <Col className="format-align-center">
            {professorsFiltered.map((professor) => <ProfessorCard professor={professor} />)}
          </Col>
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfessors;
