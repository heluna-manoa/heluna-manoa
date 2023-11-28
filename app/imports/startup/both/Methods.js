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

const addProfessorMethod = 'Professors.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'Professors.add'({ profName, bio, courses }) {
    Professors.collection.insert({ profName, bio, courses });
    courses.forEach((name) => {
      Courses.collection.update({ name: name }, { $addToSet: { professors: profName } });
    });
  },
});

export { addCourseMethod, addProfessorMethod };
