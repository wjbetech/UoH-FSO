import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
    minLength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

// INCORRECT
// userSchema.set("toJSON", {
//   transform: (document, returnedObj) => {
//     if (!returnedObj._id) {
//       console.error("User document is missing _id!", returnedObj);
//       returnedObj.id = null;
//     } else {
//       returnedObj.id = returnedObj._id.toString();
//     }
//     returnedObj.id = returnedObj?._id.toString();
//     delete returnedObj._id;
//     delete returnedObj.__v;
//     delete returnedObj.passwordHash;
//   },
// });

// CORRECT
userSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
  },
});

export default mongoose.model("User", userSchema);
