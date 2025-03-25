import express from "express";
import multer from "multer";
import pool from "../config/db.js"; // Import PostgreSQL connection
import path from "path";

const router = express.Router();

// 🗂 Set up Multer storage
const storage = multer.diskStorage({
   
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // ✅ Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
    
});

const upload = multer({ storage });

// 📂 File Upload Route
router.post("/", upload.single("file"), async (req, res) => {
    try {
        const { memberId } = req.body; // Get member ID from request
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (!memberId) {
            return res.status(400).json({ message: "Member ID is required" });
        }

        const fileName = req.file.filename;
        const uploadedAt = new Date();

        // Insert into database
        await pool.query(
            "INSERT INTO files (member_id, file_name, uploaded_at) VALUES ($1, $2, $3)",
            [memberId, fileName, uploadedAt]
        );

        res.json({ success: true, message: "File uploaded successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
});

export default router;
