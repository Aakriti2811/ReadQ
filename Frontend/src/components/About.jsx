import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  return (
    <>
    <Navbar/>
    <div className=" w-[100%] pt-32 h-screen flex flex-col items-center align-middle bg-slate-900 text-white mx-auto  p-6">
      <h1 className="text-4xl font-bold text-center text-pink-600">About ReadQ 📚</h1>
      <p className="text-lg text-gray-300 text-center w-[80%] mt-4">
        Welcome to <span className="font-semibold text-pink-500">ReadQ</span>, your AI-powered digital library and knowledge-sharing platform. 
        Whether you're a reader, student, or researcher, ReadQ helps you explore, discover, and save books effortlessly.
      </p>

      {/* Features Section */}
      <div className="mt-8 w-[80%] grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature 1 */}
        <div className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-pink-500">📖 Real-Time Book Discovery</h2>
          <p className="text-gray-600 mt-2">
            We fetch book data **in real-time** from Open Library, ensuring you always find **the latest and most popular books**.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-pink-500">🔖 Personalized Wishlist</h2>
          <p className="text-gray-600 mt-2">
            Save your favorite books in your **personalized wishlist**, accessible anytime, anywhere.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-pink-500">🎯 Smart Filters & Categories</h2>
          <p className="text-gray-600 mt-2">
            Easily **filter books** by category, author, and year, making it simple to find exactly what you're looking for.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-pink-500">🌍 AI & Multilingual Support</h2>
          <p className="text-gray-600 mt-2">
            Future updates will include **AI-powered recommendations and book translations** for a better reading experience.
          </p>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-gray-300"> Start your reading journey with ReadQ today!</h2>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default About;
