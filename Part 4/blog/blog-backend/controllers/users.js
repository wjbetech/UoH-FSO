import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    passwordHash
  });

  const savedUser = await newUser.save();
  logger.info("User created: ", savedUser.username, savedUser.name);
  res.status(201).json(savedUser);
});

export default userRouter;
