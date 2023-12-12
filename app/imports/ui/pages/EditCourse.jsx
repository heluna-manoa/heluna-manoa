import React, { useState } from 'react';
import swal from 'sweetalert';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Courses } from '../../api/courses/Course';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, Navigate } from 'react-router-dom';

const bridge = new SimpleSchema2Bridge(Courses.schema);

/* Renders the EditStuff page for editing a single document. */
const EditCourse = () => {
  const [redirect, setRedirect] = useState(false);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Courses.publicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Courses.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, title, professors, credit } = data;
    Courses.collection.update(_id, { $set: { name, title, professors, credit } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Review updated successfully', 'success');
        setRedirect(true);
      }
    });
  };
  if (redirect) {
    return (<Navigate to="/courseadmin" />);
  }
  return ready ? (
    <Container className="top-navbar-margin">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Course</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField id="name-text" name="name" />
                <TextField id="title-text" name="title" />
                <TextField id="professor-text" multiple name="professors" />
                <TextField id="credit-text" name="credits" />
                <SubmitField id="submit-button" value="Submit" />
                <Link to="/courseadmin"><Button variant="warning">Cancel</Button></Link>
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditCourse;
