import { Meteor } from 'meteor/meteor';
import { Courses } from '../../api/courses/Course';
import { Professors } from '../../api/professors/Professor';

const addCourseMethod = 'Courses.add';
/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Courses.add'({ name, title, professors, credits }) {
    Courses.collection.insert({ name, title, professors, credits });
    professors.forEach((profName) => {
      Professors.collection.update({ profName: profName }, { $addToSet: { courses: name } });
    });
  },
});

const addProjectMethod = 'Projects.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
// Meteor.methods({
//   'Projects.add'({ name, description, picture, interests, participants, homepage }) {
//     Projects.collection.insert({ name, description, picture, homepage });
//     ProfilesProjects.collection.remove({ project: name });
//     ProjectsInterests.collection.remove({ project: name });
//     if (interests) {
//       interests.map((interest) => ProjectsInterests.collection.insert({ project: name, interest }));
//     } else {
//       throw new Meteor.Error('At least one interest is required.');
//     }
//     if (participants) {
//       participants.map((participant) => ProfilesProjects.collection.insert({ project: name, profile: participant }));
//     }
//   },
// });

export { addCourseMethod, addProjectMethod };
