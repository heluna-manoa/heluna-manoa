import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/reviews/Review.js';
import { Professors } from '../../api/professors/Professor';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.reviewer}`);
  Reviews.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Reviews.collection.find().count() === 0) {
  if (Meteor.settings.reviewData) {
    console.log('Creating default data.');
    Meteor.settings.reviewData.forEach(data => addData(data));
  }
}

// Initialize the database with default professors
const addProfessor = (professor) => {
  console.log(`  Adding: ${professor.name}`);
  Professors.collection.insert(professor);
};

// Initialize the ProfessorCollection if empty.
if (Professors.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfessors) {
    console.log('Creating default professor.');
    Meteor.settings.defaultProfessors.forEach(professor => addProfessor(professor));
  }
}
