import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  // seems like an error (redundant await) is being thrown here
  // but await on bcrypt.compare() method is IMPORTANT
  const passwordCheck = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCheck)) {
    return res.status(401).json({
      error: "invalid username or password"
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).send({
    token,
    username: user.username,
    name: user.name
  });
});

export default loginRouter;
