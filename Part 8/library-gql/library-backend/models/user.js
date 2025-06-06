import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenres: {
    type: [{ type: String }]
  }
});

const User = mongoose.model("User", userSchema);

export default User;
