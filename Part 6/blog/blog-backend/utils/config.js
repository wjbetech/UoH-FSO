import "dotenv/config";

const PORT = process.env.PORT;
const MONGODB_URI = process.env.NODE_ENV === "test" ? process.env.MONGODB_TEST_URI : process.env.MONGODB_BLOG_URI;

export default { PORT, MONGODB_URI };
