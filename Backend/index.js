import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import freereadsRoute from "./route/freereads.route.js";
// (Other routes if needed)
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import wishlistRoute from "./route/wishlist.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose.connect(URI)
  .then(() => console.log("Connected to MongoDB Successfully"))
  .catch(error => console.log("Error:", error));

// Use routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/wishlist", wishlistRoute);
app.use("/freereads", freereadsRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
