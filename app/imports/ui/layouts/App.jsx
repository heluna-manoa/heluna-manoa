import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import WriteReview from '../pages/WriteReview';
import ListCourses from '../pages/ListCourses';
import UserReviews from '../pages/UserReviews';
import EditReview from '../pages/EditReview';
import ListCoursesAdmin from '../pages/ListCoursesAdmin';
import CourseReview from '../pages/CourseReview';
import AdminAddCourse from '../pages/AdminAddCourse';
import EditCourse from '../pages/EditCourse';
import AdminAddProfessor from '../pages/AdminAddProfessor';
import ListProfessors from '../pages/ListProfessors';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/write" element={<ProtectedRoute><WriteReview /></ProtectedRoute>} />
          <Route path="/searchcourse/" element={<ListCourses />} />
          <Route path="/addcourse" element={<ProtectedRoute><AdminAddCourse /></ProtectedRoute>} />
          <Route path="/addprof" element={<ProtectedRoute><AdminAddProfessor /></ProtectedRoute>} />
          <Route path="/searchprofessor/" element={<ListProfessors />} />
          <Route path="/courseadmin" element={<AdminProtectedRoute ready={ready}><ListCoursesAdmin /></AdminProtectedRoute>} />
          <Route path="/edit/:_id" element={<AdminProtectedRoute ready={ready}><EditCourse /></AdminProtectedRoute>} />
          <Route path="/coursereview/:courseName" element={<CourseReview />} />
          <Route path="/userreviews" element={<ProtectedRoute><UserReviews /></ProtectedRoute>} />
          <Route path="/editreview/:_id" element={<ProtectedRoute ready={ready}><EditReview /></ProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
