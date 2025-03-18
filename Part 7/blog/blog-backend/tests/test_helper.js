import Blog from "../models/blog.js";
import User from "../models/user.js";

const initialBlogs = [
  {
    title: "First blog post!",
    author: "wjbetech",
    content: "Welcome to my blog and thanks for visiting!",
    url: "www.wjbeblog.com",
    likes: 0,
  },
  {
    title: "Second blog post!",
    author: "wjbetech",
    content: "Today I want to look at JS vs TS",
    url: "www.wjbeblog.com",
    likes: 0,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    content: "removethissoon",
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const getBlogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getUsersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export default { initialBlogs, nonExistingId, getBlogsInDb, getUsersInDb };
