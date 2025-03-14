


// import React, { useEffect, useState } from "react";
// import Cards from "./Cards";
// import axios from "axios";

// function Course() {
//   const [books, setBooks] = useState([]);
//   const [query, setQuery] = useState("JavaScript"); // Default search term

//   useEffect(() => {
//     const getBooks = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4001/book?query=${query}`);
//         console.log(res.data);
//         setBooks(res.data);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };
//     getBooks();
//   }, [query]); // Fetch books when query changes

//   return (
//     <>
//       <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
//         <div className="mt-[90px] text-center">
//           <h1 className="py-8 text-2xl md:text-4xl">
//             We're delighted to have you{" "}
//             <span className="text-pink-500">Here! :)</span>
//           </h1>
//           <input  
//             type="text"
//             placeholder="Search for books..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className=" p-2 border rounded-md bg-slate-900 w-[500px]"
//           />
//         </div>

//         <div>
//           <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
//             {books.length > 0 ? (
//               books.map((book) => (
//                 <Cards key={book.openlibrary_id} item={book} />
//               ))
//             ) : (
//               <p className="text-center pt-6 col-span-4">No books found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Course;
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";

function Course() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState(""); // Book name input
  const [category, setCategory] = useState(""); // Default category
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        let url = `http://localhost:4001/book`;

        // If category is selected but no query, use category as query
        if (!query && category) {
          url += `?query=${category}`;
        } else if (query) {
          url += `?query=${query}`;
        }

        if (category) url += `&category=${category}`;
        if (author) url += `&author=${author}`;
        if (year) url += `&year=${year}`;

        const res = await axios.get(url);
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    if (query || category) getBooks(); // Fetch books when query or category is selected
  }, [query, category, author, year]);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-[68px] text-center">
          <h1 className="pt-16 text-2xl md:text-4xl">
            Browse Our <span className="text-pink-500">Book Collection 📚</span>
          </h1>

          {/* Search Input (Optional) */}
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-4 bg-slate-900 p-2 w-[500px] border rounded-md"
          />

          {/* Filters Section */}
          <div className="flex justify-center gap-4 mt-4">
            {/* Category Dropdown */}
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border bg-slate-900 rounded-md"
            >
              <option value="fiction">Select category</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="fantasy">Fantasy</option>
              <option value="history">History</option>
              <option value="science">Science</option>
              <option value="mystery">Mystery & Thriller</option>
              <option value="romance">Romance</option>
              <option value="horror">Horror</option>
              <option value="biography">Biography</option>
              <option value="self-help">Self-Help</option>
              <option value="philosophy">Philosophy</option>
              <option value="poetry">Poetry</option>
              <option value="technology">Technology</option>
              <option value="education">Education</option>
              <option value="comics">Comics & Graphic Novels</option>
            </select>

            {/* Author Input */}
            <input
              type="text"
              placeholder="Filter by author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="p-2 bg-slate-900 border rounded-md"
            />

            {/* Year Input */}
            <input
              type="number"
              placeholder="Filter by year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 bg-slate-900 border rounded-md"
            />
          </div>
        </div>

        {/* Display Books */}
        <div>
         
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {books.length > 0 ? (
              books.map((book) => <Cards key={book.openlibrary_id} item={book} />)
            ) : (
              <p className="text-center pt-32 col-span-4">No books found. Try adjusting filters!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
