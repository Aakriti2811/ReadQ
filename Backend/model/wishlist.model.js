// model/wishlist.model.js
import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    books: [
        {
            title: String,
            author: String,
            cover: String,
            openlibrary_id: String,
        },
    ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
