import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/courses/Course';
import CourseItem from '../components/CourseItem';
import { Reviews } from '../../api/reviews/Review';
import ReviewCard from '../components/ReviewCard';

/* Renders a table containing all of the Course documents. Use <CourseItem> to render each row. */
const CourseReview = () => {
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
  const reviewsFiltered = reviews.filter((review) => review.name === courseName);
  const chosenCourse = courses.find((course) => course.name === courseName);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <CourseItem key={chosenCourse._id} course={chosenCourse} />
        </Col>
        <Col md={7}>
          <Col className="text-center">
            <h2>Course Review</h2>
            {reviewsFiltered.map((review) => <ReviewCard review={review} />)}
          </Col>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default CourseReview;
