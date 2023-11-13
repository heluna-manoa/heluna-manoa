import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../api/reviews/Review.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.reviewer} ${data.courseName}`);
  Reviews.collection.insert(data);
};

// Initialize the ReviewCollection if empty.
if (Reviews.collection.find().count() === 0) {
  if (Meteor.settings.reviewData) {
    console.log('Creating review data.');
    Meteor.settings.reviewData.forEach(data => addData(data));
  }
}
