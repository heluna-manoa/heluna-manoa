import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ReviewCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ReviewCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      courseName: String,
      professor: String,
      semesterTaken: String,
      reviewContent: {
        type: String,
        optional: true, // Make reviewContent optional
      },
      rating: Number,
      grade: String,
      anonymous: {
        type: Boolean,
        optional: true, // Make anonymous optional
      },
      reviewer: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.publicationName = `${this.name}.publication`;
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ReviewCollection.
 * @type {ReviewCollection}
 */
export const Reviews = new ReviewCollection();
