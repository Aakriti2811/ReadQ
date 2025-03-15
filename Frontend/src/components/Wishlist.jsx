import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Navbar from "./Navbar";
import Footer from "./Footer";
import wishlistimg from "../assets/wishlist.png"

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // 🔹 NEW STATE

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const storedUser = localStorage.getItem("Users");
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        const userId = user._id;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/wishlist/${userId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setWishlist(data);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setWishlist([]);
      }
    };

    loadWishlist();
  }, [refreshTrigger]); // 🔹 Re-run useEffect when `refreshTrigger` changes

  const handleRemove = async (bookId) => {
    try {
      const storedUser = localStorage.getItem("Users");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      const userId = user._id;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/wishlist/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookId }),
      });

      if (response.status === 200) {
        console.log(`Book with ID ${bookId} removed successfully.`);

        // ✅ Trigger a re-render
        setRefreshTrigger((prev) => !prev);
      } else {
        console.error("Failed to remove book from wishlist");
      }
    } catch (error) {
      console.error("Error removing book from wishlist:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl py-5 container mx-auto md:px-20 px-4">
        <div className="mt-[68px] text-center">
          <h1 className="pt-16 text-2xl font-extrabold md:text-4xl">
            Your <span className="text-pink-500">Wishlist</span>
          </h1>
        </div>

        {/* Wishlist Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.length > 0 ? (
            wishlist.map((book) => (
              <Cards key={book.openlibrary_id} item={book} onRemove={handleRemove} />
            ))
          ) : (
          <div className="flex">
            <img src={wishlistimg} alt="no books" />
            <p className="ml-72  text-gray-200 leading-normal text-center font-bold text-2xl mt-32">Empty Wishlist!</p>
          </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
