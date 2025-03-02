import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 64
  },
  passwordHash: {
    type: String
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

export default mongoose.model("User", userSchema);
