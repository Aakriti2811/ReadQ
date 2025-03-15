import express from "express";
import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import Grid from "gridfs-stream";
import dotenv from "dotenv";
import BookPDF from "../model/freereads.model.js";

dotenv.config();

const URI = process.env.MongoDBURI; // Ensure your URI includes your database name

// Configure GridFS storage using multer-gridfs-storage.
// We return a promise to set the file information.
const storage = new GridFsStorage({
  url: URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename: filename,
        bucketName: "pdfs", // This is the GridFS bucket where files are stored
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

// GET: Retrieve all free-read books (metadata only)
export const getFreeReads = async (req, res) => {
  try {
    const books = await BookPDF.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching free reads:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST: Upload a new free-read book PDF using GridFS
export const uploadFreeRead = async (req, res) => {
  try {
    console.log("Uploaded file object:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "PDF file is required" });
    }
    // Create a URL that points to our inline viewing endpoint.
    const pdfUrl = `/freereads/file/${req.file.id}`;
    // Get the cover image URL from the request body (if provided)
    const cover = req.body.coverUrl || null;
    // Create a new BookPDF document including the cover field.
    const newBook = new BookPDF({
      title: req.body.title,
      author: req.body.author,
      pdfUrl,
      gridfsId: req.file.id,
      cover: cover,
    });
    await newBook.save();
    res.status(201).json({ message: "Book PDF uploaded successfully", book: newBook });
  } catch (error) {
    console.error("Error uploading free read:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Set up GridFS stream for serving files from GridFS.
let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("pdfs"); // This must match the bucketName above.
});


// GET: Serve a PDF file for download so that it opens in the native PDF viewer
export const downloadBook = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) }, (err, file) => {
      if (err || !file) {
        console.error("File not found:", err);
        return res.status(404).json({ message: "File not found" });
      }
      res.set("Content-Type", file.contentType);
      res.set("Content-Disposition", `inline; filename="${file.filename}"`);
      
      const readstream = gfs.createReadStream({ _id: file._id });
      readstream.pipe(res);
    });
  } catch (error) {
    console.error("Error in downloadBook:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export { upload };
