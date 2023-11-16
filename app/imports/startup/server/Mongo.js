import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/reviews/Review.js';
import { Courses } from '../../api/courses/Course';
import { Professors } from '../../api/professors/Professor';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.reviewer} ${data.courseName}`);
  Reviews.collection.insert(data);
};

// Initialize the ReviewsCollection if empty.
if (Reviews.collection.find().count() === 0) {
  if (Meteor.settings.reviewData) {
    console.log('Creating review data.');
    Meteor.settings.reviewData.forEach(data => addData(data));
  }
}

// Initialize the database with default courses
// Do NOT need owner for the courses. Have to fix that.
const addCourse = (course) => {
  console.log(`  Adding: ${course.name}`);
  Courses.collection.insert(course);
};

// Initialize the CourseCollection if empty.
if (Courses.collection.find().count() === 0) {
  if (Meteor.settings.defaultCourses) {
    console.log('Creating default course.');
    Meteor.settings.defaultCourses.forEach(course => addCourse(course));
  }
}
// Initialize the database with default professors
const addProfessor = (professor) => {
  console.log(`  Adding: ${professor.profName}`);
  Professors.collection.insert(professor);
};

// Initialize the ReviewCollection if empty.
if (Professors.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfessors) {
    console.log('Creating default professor.');
    Meteor.settings.defaultProfessors.forEach(professor => addProfessor(professor));
  }
}
