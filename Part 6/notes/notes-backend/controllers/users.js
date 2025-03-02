import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", { content: 1, important: 1 });
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash
  });

  // logger.info("Attempting to add: ", `${newUser.username}`, " to DB");
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

export default userRouter;
