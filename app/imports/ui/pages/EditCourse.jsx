import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* Renders the EditStuff page for editing a single document. */
const EditCourse = () => (
  <Container className="py-3">
    <Row className="justify-content-center">
      <Col xs={5}>
        <Col className="text-center"><h2>Edit Course</h2></Col>
      </Col>
    </Row>
  </Container>
);

export default EditCourse;
