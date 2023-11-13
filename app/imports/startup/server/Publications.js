import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Reviews } from '../../api/reviews/Review';
import { Courses } from '../../api/courses/Course';

/** Publication to the course documents (Cade) */
// I actually just need a collection of documents, no need to be logged in
// Just publishes everything
Meteor.publish(Courses.publicationName, function () {
  return Courses.collection.find();
});
>>>>>>> issue-05

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Reviews.publicationName, function () {
  return Reviews.collection.find();
});
Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).reviewer;
    return Reviews.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Reviews.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reviews.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
