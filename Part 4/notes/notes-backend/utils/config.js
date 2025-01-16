import "dotenv/config";

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_NOTES_URI;

export default { PORT, MONGODB_URI };
