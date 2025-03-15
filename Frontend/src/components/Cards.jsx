import React, { useState, useEffect } from "react";
import placeholderImg from "../assets/Banner.png";
import Login from "./Login"; // Import Login modal
import axios from "axios"; // Import axios for API requests

function Cards({ item, onRemove }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [user, setUser] = useState(null); // State to hold logged-in user info
  const [hasLoadedUser, setHasLoadedUser] = useState(false); // Track if we've attempted to load the user
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("Users");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
      }
    }
    setHasLoadedUser(true);
  }, []);

  // Helper to check if user is logged in (only check after user has been loaded)
  const isLoggedIn = () => {
    return hasLoadedUser && user && user._id;
  };

  // Fetch wishlist status once user is available and when item changes
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      // Only attempt to fetch if we have loaded user data
      if (!hasLoadedUser) return;

      if (!user || !user._id) {
        console.log("User not logged in");
        return;
      }
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/wishlist/${user._id}`);
        const wishlistBooks = response.data;
        if (Array.isArray(wishlistBooks)) {
          setIsWishlisted(
            wishlistBooks.some((book) => book.openlibrary_id === item.openlibrary_id)
          );
        } else {
          console.error("Wishlist data is not an array:", wishlistBooks);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlistStatus();
  }, [item.openlibrary_id, user, hasLoadedUser]);

  const toggleWishlist = async () => {
    if (!isLoggedIn()) {
      document.getElementById("my_modal_3").showModal();
      return;
    }

    try {
      if (isWishlisted) {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/wishlist/remove`, {
          data: { userId: user._id, bookId: item.openlibrary_id },
        });

        if (response.status === 200) {
          setIsWishlisted(false);
          onRemove(item.openlibrary_id); // ✅ Notify Wishlist page
        }
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/wishlist/add`, {
          userId: user._id,
          book: item,
        });

        if (response.status === 200) {
          setIsWishlisted(true);
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };



  return (
    <div className="rounded-sm">
      <div className="card w-92 bg-base-100 h-[100%] shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img
            src={item.cover || placeholderImg}
            alt="Book Cover"
            className="h-[250px] w-full object-fill"
          />
        </figure>
        <div className="card-body px-3 py-4">
          <h2 className="card-title">{item.title}</h2>
          <p className="text-gray-500">{item.author}</p>
          <p className="text-sm text-gray-400">
            Published: {item.first_publish_year}
          </p>
          <p className="text-sm text-gray-500">Category: {item.category || "General"}</p>
          <div className="card-actions flex align-bottom justify-between mt-2">
            <a
              href={`https://openlibrary.org${item.openlibrary_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200 cursor-pointer"
            >
              View Book
            </a>
            <button
              onClick={toggleWishlist}
              className={`border-[2px] rounded-full p-1 text-2xl duration-200 cursor-pointer ${
                isWishlisted ? "text-pink-500" : "text-gray-500"
              }`}
            >
              {isWishlisted ? "🩷" : "🤍"}
            </button>
          </div>
        </div>
      </div>

      {/* Render Login modal if needed */}
      {isLoginModalOpen && <Login />}
    </div>
  );
}

export default Cards;
