import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, SelectField, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Reviews } from '../../api/reviews/Review';

const classes = [
  { name: 'ICS314', professors: ['Cam Moore', 'Philip Johnson'] },
  { name: 'ICS212', professors: ['Ravi Narayan', 'Blah Blah'] },
];

const reviewSchema = new SimpleSchema({
  className: {
    type: String,
    allowedValues: classes.map((classItem) => classItem.name),
  },
  professor: {
    type: String,
    allowedValues: (fieldValue) => {
      const classItem = classes.find((item) => item.name === fieldValue);
      return classItem ? classItem.professors : [];
    },
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

  const submitReview = (data, formRef) => {
    const { className, professor, reviewContent, rating, grade } = data;
    const reviewer = Meteor.user().username;
    Reviews.collection.insert(
      { className, professor, reviewContent, rating, grade, reviewer },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Write a Review</h2></Col>
          <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={(data) => submitReview(data, fRef)}>
            <Card>
              <Card.Body>
                <SelectField name="className" placeholder="Class Name" />
                <SelectField name="professor" placeholder="Professor's Name" />
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
