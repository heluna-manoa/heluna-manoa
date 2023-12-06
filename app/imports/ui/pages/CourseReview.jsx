import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/courses/Course';
import { Reviews } from '../../api/reviews/Review';
import ReviewCard from '../components/ReviewCard';
import ReviewCardCourse from '../components/ReviewCardCourse';

/* Renders a table containing all of the Course documents. Use <CourseItem> to render each row. */
const CourseReview = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const { courseName } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses, reviews } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Course documents.
    const subscription = Meteor.subscribe(Courses.publicationName);
    const subscription2 = Meteor.subscribe(Reviews.publicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Stuff documents
    const courseItems = Courses.collection.find({}).fetch();
    const reviewItems = Reviews.collection.find({}).fetch();
    return {
      courses: courseItems,
      reviews: reviewItems,
      ready: rdy,
    };
  }, []);

  // Filter reviews based on the provided courseName
  const reviewsFiltered = reviews.filter((review) => review.courseName === courseName);
  const chosenCourse = courses.find((course) => course.name === courseName);
  // Calculate the average rating given to the course
  const avgRating = () => {
    if (reviewsFiltered.length === 0) {
      return 'N/A';
    }
    return reviewsFiltered.reduce((memo, review) => memo + review.rating, 0) / reviewsFiltered.length;
  };

  return (ready ? (
    <Container className="top-navbar-margin">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h1 style={{ color: 'white' }}>{chosenCourse.name}</h1>
          <h2 style={{ color: 'white' }}>{chosenCourse.title}</h2>
          <h2 style={{ color: 'white' }}>Average Rating: {avgRating()}</h2>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h2 style={{ color: 'white' }}>Credits: {chosenCourse.credits}</h2>
        </Col>
        <Col className="text-center">
          <h2 style={{ color: 'white' }}>Professors:</h2>
          {chosenCourse.professors.map((professor) => <h3 style={{ color: 'white' }}>{professor}</h3>)}
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {reviewsFiltered.length === 0 ? (
          <Col className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <h1 style={{ color: 'white' }}>No Reviews Yet!</h1>
          </Col>
        ) : (
          reviewsFiltered.map((review) => (
            <Col key={review._id}>
              {currentUser === review.reviewer ? (
                <ReviewCard review={review} />
              ) : (
                <ReviewCardCourse review={review} />
              )}
            </Col>
          ))
        )}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default CourseReview;
