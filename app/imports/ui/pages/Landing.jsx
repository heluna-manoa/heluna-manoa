import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function courseSearch(name) {
  // go through all courses, if course exists
  if (name === course.name) {
    return `coursereview/${course.name}`;
  }
  return 'searchcourses/';

  // send to course page
  // else send to list with search query
}

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  function useState(something) {
    return something;
  }

  const [query, setQuery] = useState('');

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <h1>Heluna Manoa</h1>
      </Row>
      <Row className="align-middle text-center">
        <Col>
          <h2>Search by Course</h2>
          <form method="get" action="/searchcourse">
            <input type="text" id="course-search" name="course" />
          </form>
          <form>
            <input
              id="searchInput"
              className="focus:outline-none"
              type="text"
              placeholder="Search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <div className="flex mt-1.5">
              <Link to={{ pathname: `/coursereview/${query}` }}>
                <button type="submit" onClick={() => setQuery(() => '')}>
                  <svg
                    className="fill-current h-auto w-4 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  />
                </button>
              </Link>
            </div>
          </form>
        </Col>
        <Col>
          <h2>Search by Professor</h2>
          <form method="get" action="/searchcourse">
            <input type="search" id="prof-search" name="professor" />
          </form>
        </Col>
      </Row>
      {currentUser === '' ? (
        <Row className="align-middle text-center">
          <Col>
            <h2>Recent Course Reviews</h2>
          </Col>
          <Col>
            <h2>Recent Professor Reviews</h2>
          </Col>
        </Row>
      ) : (
        <Row className="align-middle text-center">
          <Col>
            <h2>My Courses</h2>
          </Col>
          <Col>
            <h2>My Professors</h2>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Landing;
