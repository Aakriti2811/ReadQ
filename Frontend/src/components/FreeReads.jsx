import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import Footer from "./Footer";

function FreeBook() {
  const [books, setBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Fetch free books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/freereads");
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching free books:", error);
      }
    };
    fetchBooks();
  }, [refresh]);

  // Handle form submission to suggest a free book
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    if (data.coverUrl) {
      formData.append("coverUrl", data.coverUrl);
    }
    // Append the PDF file; field name "pdfFile" must match your backend
    formData.append("pdfFile", data.pdfFile[0]);

    try {
      await axios.post("http://localhost:4001/freereads/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      reset();
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error uploading book:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container w-[90%] sm:w-[80%] pt-32 pb-8 mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Download Books
        </h1>

        {/* Display free books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book._id}
                className="border border-white p-4 rounded shadow-lg"
              >
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-[200px] sm:w-[250px] rounded-md"
                  />
                ) : (
                  <div className="w-[90%] h-40 bg-gray-200 text-gray-500  rounded">
                    No Cover
                  </div>
                )}
                <h2 className="text-lg sm:text-xl font-semibold mt-2 ">
                  {book.title}
                </h2>
                <p className="text-gray-500 ">{book.author}</p>
                <a
                  href={`http://localhost:4001/freereads/file/${book.gridfsId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  Read Now
                </a>
              </div>
            ))
          ) : (
            <div className="text-center col-span-full">
              <p className="text-gray-500 mt-2">
                No free books available. Upload one below!
              </p>
            </div>
          )}
        </div>

        {/* Suggest/Upload Form */}
        <div className="mt-8 border p-4 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Add a free book
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Author"
              {...register("author", { required: true })}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Cover Image URL (optional)"
              {...register("coverUrl")}
              className="p-2 border rounded w-full"
            />
            <input
              type="file"
              accept="application/pdf"
              {...register("pdfFile", { required: true })}
              className="p-2 w-full"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white p-2 rounded w-full hover:bg-pink-600 transition"
            >
              Upload Book
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FreeBook;
