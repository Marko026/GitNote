import { Schema, Types, model, models } from "mongoose";

export interface ITags {
  name: string;
  posts: Types.ObjectId[];
}

const tagsSchema = new Schema({
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  name: {
    type: String,
    required: false,
    unique: true,
  },
});

export const Tags = models.Tags || model("Tags", tagsSchema);

// Find all tags in the DB
// Queryaj Posts u DB, i napisi WHERE Tags contains our tag
// Queryaj Tag u DB, i pronadji da li taj tag ima POST spremljen u sebi
