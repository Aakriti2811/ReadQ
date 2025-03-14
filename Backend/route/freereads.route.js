import express from "express";
import { downloadBook, getFreeReads, uploadFreeRead,  } from "../controller/freereads.controller.js";
import { upload } from "../controller/freereads.controller.js";

const router = express.Router();

router.get("/", getFreeReads);
router.post("/upload", upload.single("pdfFile"), uploadFreeRead);
// The endpoint for viewing the PDF inline uses the GridFS file id.
router.get("/file/:fileId", downloadBook);

export default router;
