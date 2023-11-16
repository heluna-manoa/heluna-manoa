import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The CoursesCollection. It encapsulates state and variable values for Course.
 */
class CoursesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CoursesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      title: String,
      professors: {
        type: Array,
        optional: true,
      },
      'professors.$': String,
      credits: Number,
      _id: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    this.publicationName = `${this.name}.publication`;
  }
}

/**
 * The singleton instance of the CoursesCollection.
 * @type {CoursesCollection}
 */
export const Courses = new CoursesCollection();
