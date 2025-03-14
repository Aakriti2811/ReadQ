export const getBook = async (req, res) => {
    try {
        let { query, category, author, year } = req.query;

        // If no query is provided but a category is selected, use category as the search term
        if (!query && category) {
            query = category;
        } else if (!query) {
            return res.status(400).json({ message: "Please provide a search query or select a category" });
        }

        let apiUrl = `https://openlibrary.org/search.json?q=${query}&limit=20`;

        if (category) apiUrl += `&subject=${category}`;
        if (author) apiUrl += `&author=${author}`;
        if (year) apiUrl += `&first_publish_year=${year}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const books = data.docs.map(book => ({
            title: book.title,
            author: book.author_name?.join(", ") || "Unknown Author",
            cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
            first_publish_year: book.first_publish_year || "N/A",
            category: category || "General",
            openlibrary_id: book.key,
        }));

        res.status(200).json(books);
    } catch (error) {
        console.log("Error fetching books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
