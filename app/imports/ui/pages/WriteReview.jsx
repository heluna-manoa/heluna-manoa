import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import { AutoForm, SelectField, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Reviews } from '../../api/reviews/Review';

const courses = [
  { name: 'ICS314', professors: ['Cam Moore', 'Philip Johnson'] },
  { name: 'ICS212', professors: ['Ravi Narayan', 'Blah Blah'] },
];

const allProfessors = courses.reduce((acc, courseItem) => acc.concat(courseItem.professors), []);

const reviewSchema = new SimpleSchema({
  courseName: {
    type: String,
    allowedValues: courses.map((courseItem) => courseItem.name),
  },
  professor: {
    type: String,
    allowedValues: allProfessors,
  },
  rating: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
  },
  grade: {
    type: String,
    allowedValues: ['A', 'B', 'C', 'D', 'F', 'In-Progress A', 'In-Progress B', 'In-Progress C', 'In-Progress D', 'In-Progress F', 'Withdrew'],
  },
  reviewContent: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(reviewSchema);

const WriteReview = () => {
  let fRef = null;
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [allowedProfessors, setAllowedProfessors] = useState([]);

  useEffect(() => {
    const courseObj = courses.find(c => c.name === selectedCourse);
    if (courseObj) {
      setAllowedProfessors(courseObj.professors);
    } else {
      setAllowedProfessors([]);
    }

    if (fRef) {
      fRef.reset();
    }
  }, [selectedCourse]);

  const submitReview = (data, formRef) => {
    const { courseName, professor, reviewContent, rating, grade } = data;
    const reviewer = Meteor.user().username;
    Reviews.collection.insert(
      { courseName, professor, reviewContent, rating, grade, reviewer },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Review added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  const onCourseChange = (value) => {
    setSelectedCourse(value);
    setSelectedProfessor(''); // Reset professor selection when class changes
  };

  const onProfessorChange = (value) => {
    setSelectedProfessor(value);
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Write a Review</h2></Col>
          <AutoForm
            ref={(ref) => { fRef = ref; }}
            schema={bridge}
            model={{ courseName: selectedCourse, professor: selectedProfessor }}
            onSubmit={(data) => submitReview(data, fRef)}
          >
            <Card>
              <Card.Body>
                <SelectField name="courseName" placeholder="Course Name" value={selectedCourse} onChange={onCourseChange} />
                <SelectField
                  name="professor"
                  placeholder="Professor's Name"
                  value={selectedProfessor}
                  onChange={onProfessorChange}
                  allowedValues={allowedProfessors}
                />
                <SelectField name="rating" placeholder="Input your rating" />
                <SelectField name="grade" placeholder="Input grade received" />
                <TextField name="reviewContent" component="textarea" rows={4} placeholder="Write your review here" />
                <SubmitField value="Submit Review" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default WriteReview;
