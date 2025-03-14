import express from "express";
import Wishlist from "../model/wishlist.model.js"; // Import wishlist model

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { userId, book } = req.body;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      const newWishlist = new Wishlist({
        userId,
        books: [book],
      });
      await newWishlist.save();
    } else {
      wishlist.books.push(book);
      await wishlist.save();
    }

    res.status(200).json({ message: "Book added to wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/remove", async (req, res) => {
    try {
      const { userId, bookId } = req.body;
  
      const wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      // Remove the book from wishlist using openlibrary_id
      wishlist.books = wishlist.books.filter((book) => book.openlibrary_id !== bookId);
      await wishlist.save();
  
      res.status(200).json({ message: "Book removed from wishlist" });
    } catch (error) {
      console.error("Error removing book from wishlist:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
router.get("/:userId", async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ userId: req.params.userId });
  
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
  
      res.status(200).json(wishlist.books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
export default router;
