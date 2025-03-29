import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5
  },
  phoneNumber: {
    type: String,
    minLength: 8
  },
  street: {
    type: String,
    required: true,
    minLength: 5
  },
  city: {
    type: String,
    required: true,
    minLength: 3
  }
});

const PersonSchema = mongoose.model("Person", schema);

export default PersonSchema;
