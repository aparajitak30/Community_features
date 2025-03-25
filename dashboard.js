
import jwt from "jsonwebtoken";
import express from "express";
import authMiddleware from "../middleware/auth.js"; // Ensure authentication
import pool from "../config/db.js"; // Import PostgreSQL connection
import bcrypt from "bcryptjs";

const router = express.Router();

// 🔒 Protected Route: Fetch User Data & Uploaded Files
router.get("/", async (req, res) => {
    try {
        const {username} = req.body; 

        // Fetch user details
        const userQuery = await pool.query(
            "SELECT name, username FROM members WHERE username = $1",
            [username]
        );

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch user's uploaded files
        const filesQuery = await pool.query( 
             "SELECT id, file_name, uploaded_at FROM files WHERE member_id = (SELECT id FROM members WHERE username = $1)" ,
            [username]
        );

        res.json({
            user: userQuery.rows[0],
            files: filesQuery.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// 🔄 Update User Profile
router.put("/update",async (req, res) => {
    const { name, password } = req.body;
    
    try {
        let hashedPassword = null;
        if (password) {
            hashedPassword = bcrypt.hashSync(password, 10);
        }

        // ✅ Update user details
        let updateQuery;
        let values;

        if (password) {
            updateQuery = `
                UPDATE members 
                SET name = $1, password = $2
                WHERE username = $3
                RETURNING name, username
            `;
            values = [name, hashedPassword, username];
        } else {
            updateQuery = `
                UPDATE members 
                SET name = $1
                WHERE username = $2
                RETURNING name, username
            `;
            values = [name, username];
        }

        const updatedUser = await pool.query(updateQuery, values);

        res.json({ message: "Profile updated successfully!", user: updatedUser.rows[0] });

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Update failed" });
    }
});

export default router;
