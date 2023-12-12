import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import { AutoForm, SelectField, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Navigate } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { addProfessorMethod } from '../../startup/both/Methods';
import { Professors } from '../../api/professors/Professor';
import { Courses } from '../../api/courses/Course';

const AdminAddProfessor = () => {
  let fRef = null;
  const [redirect, setRedirect] = useState(false);
  const DEPTLISTING = [
    'American Studies',
    'Accounting',
    'Animal Sciences',
    'Anthropology',
    'Architecture',
    'Art',
    'Asian Studies',
    'Astronomy',
    'Biology',
    'Botany',
    'Business',
    'Chemistry',
    'Communications',
    'Earth Sciences',
    'Economics',
    'Education',
    'Engineering',
    'English',
    'Ethnic Studies',
    'Finance',
    'Food Science',
    'Geography',
    'Hawaiian Studies',
    'History',
    'Information and Computer Sciences',
    'Japanese Studies',
    'Journalism',
    'Kinesiology',
    'Korean Studies',
    'Language',
    'Law',
    'Linguistics',
    'Marketing',
    'Mathematics',
    'Natural Resources',
    'Oceanography',
    'Philosophy',
    'Physics',
    'Psychology',
    'Public Health',
    'Religion',
    'Second Language Studies',
    'Sociology',
    'Theatre',
    'Tropical Agriculture',
    'WGSS',
  ];
  const professorItems = useTracker(() => {
    const subscription = Meteor.subscribe(Professors.publicationName);
    return subscription.ready() ? Professors.collection.find({}).fetch() : [];
  }, []);
  const courseItems = useTracker(() => {
    const subscription = Meteor.subscribe(Courses.publicationName);
    return subscription.ready() ? Courses.collection.find({}).fetch() : [];
  }, []);
  const allCourses = courseItems.map(courseItem => courseItem.name);
  const uniqueCourses = [...new Set(allCourses)];
  const professorSchema = new SimpleSchema({
    profName: String,
    bio: {
      type: String,
      optional: true,
    },
    department: {
      type: String,
      allowedValues: DEPTLISTING,
    },
    courses: {
      type: Array,
      label: 'Courses',
    },
    'courses.$': {
      type: String,
      allowedValues: uniqueCourses,
    },
    image: String,
  });
  const bridge = new SimpleSchema2Bridge(professorSchema);
  const submitProfessor = (data, formRef) => {
    const { profName } = data;
    const allNames = professorItems.reduce((acc, professorItem) => acc.concat(professorItem.profName), []);
    const uniqueNames = [...new Set(allNames)];

    if (uniqueNames.includes(profName)) {
      swal('ERROR! Professor exists.');
      setRedirect(true);
    } else {
      const newData = { ...data, rating: 0 };
      // Course does not exist, perform insert
      Meteor.call(addProfessorMethod, newData, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Professor added successfully', 'success').then(() => formRef.reset());
          setRedirect(true);
        }
      });
    }
  };
  if (redirect) {
    return (<Navigate to="/courseadmin" />);
  }
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
    <Container className="top-navbar-margin">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h1 style={{ color: 'white' }}>Add a Professor</h1>
          </Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submitProfessor(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id="professor-name" name="profName" label="Professor Name (First Last)" />
                <SelectField id="department-name" name="department" label="Select a Department" />
                <TextField id="biography-text" name="bio" label="Short Biography (optional)" />
                <SelectField id="select-courses" multiple name="courses" />
                <TextField id="image-url" name="image" label="Image Link" />
                <SubmitField id="submit-button" value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAddProfessor;
