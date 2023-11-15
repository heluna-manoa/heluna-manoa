import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import { AutoForm, SelectField, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Courses } from '../../api/courses/Course';

const AdminAddCourse = () => {
  let fRef = null;

  const courseItems = useTracker(() => {
    const subscription = Meteor.subscribe(Courses.publicationName);
    return subscription.ready() ? Courses.collection.find({}).fetch() : [];
  }, []);
  const allProfessors = courseItems.reduce((acc, courseItem) => acc.concat(courseItem.professors), []);
  const uniqueProfessors = [...new Set(allProfessors)];
  const professorSchema = new SimpleSchema({
    name: String,
    title: String,
    professors: {
      type: Array,
      label: 'Professors',
    },
    'professors.$': {
      type: String,
      allowedValues: uniqueProfessors,
    },
    credits: {
      type: Number,
      allowedValues: [1, 2, 3, 4, 5, 6],
    },
  });
  const bridge = new SimpleSchema2Bridge(professorSchema);
  const submitCourse = (data, formRef) => {
    const { name, title, professors, credits } = data;
    const allNames = courseItems.reduce((acc, courseItem) => acc.concat(courseItem.name), []);
    const uniqueNames = [...new Set(allNames)];

    if (uniqueNames.includes(name)) {
      swal('ERROR! Class exists.');
    } else {
      // Course does not exist, perform insert
      Courses.collection.insert(
        { name, title, professors, credits },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Course added successfully', 'success');
            formRef.reset();
          }
        },
      );
    }
  };
  // const updateProfessors = (data) => {
  //   const { name, professors } = data;
  //   professors.forEach((profName) => {
  //     Professors.collection.update(
  //       { name: profName },
  //       {
  //         $addToSet: { courses: name },
  //       },
  //     );
  //   });
  // };
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2 style={{ color: 'white' }}>Add a Course</h2>
          </Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submitCourse(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <TextField name="title" />
                <SelectField multiple name="professors" />
                <SelectField name="credits" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddCourse;