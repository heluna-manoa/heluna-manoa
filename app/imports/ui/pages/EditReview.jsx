import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Reviews } from '../../api/reviews/Review';
import { Link } from 'react-router-dom';

/* Renders the EditContact page for editing a single document. */
const EditReview = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Reviews.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Reviews.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const editSchema = new SimpleSchema({
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
    anonymous: {
      type: Boolean,
      defaultValue: false,
    },
  });

  const bridge = new SimpleSchema2Bridge(editSchema);
  // console.log('EditReview', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { courseName, reviewContent, rating, grade } = data;
    Reviews.collection.update(_id, { $set: { courseName, reviewContent, rating, grade } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Review updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Review</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row><h1>{doc.courseName}</h1></Row>
                <Row>
                  <Col><SelectField name="rating" /></Col>
                </Row>
                <Row>
                  <Col><SelectField name="grade" /></Col>
                </Row>
                <Row>
                  <Col><LongTextField name="reviewContent" /></Col>
                </Row>
                <SubmitField value="Submit" />
                <Link to={`/userreviews`}><Button variant="warning">Cancel</Button></Link>
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditReview;
