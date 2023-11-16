import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ProfessorCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfessorCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      profName: String,
      courses: Array,
      'courses.$': String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.publicationName = `${this.name}.publication`;
  }
}

/**
 * The singleton instance of the ReviewCollection.
 * @type {ProfessorCollection}
 */
export const Professors = new ProfessorCollection();
