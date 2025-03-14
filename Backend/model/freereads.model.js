import mongoose from "mongoose";

const bookPdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pdfUrl: { type: String, required: true }, // URL to access the PDF via our endpoint
  gridfsId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the file in GridFS
  cover: { type: String }, // Optional cover image URL
  createdAt: { type: Date, default: Date.now },
});

const BookPDF = mongoose.model("BookPDF", bookPdfSchema);
export default BookPDF;
