import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./config/db.js"; // Import PostgreSQL connection

dotenv.config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

import dashboardRoutes from "./routes/dashboard.js"; // Import Dashboard Routes
app.use("/dashboard", dashboardRoutes); // Use dashboard route

const SECRET_KEY = "supersecretkey" ;
; // Secret key for member registration

// ✅ Test Database Connection
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()"); // Test query
        res.send(`✅ Database connected! Server Time: ${result.rows[0].now}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("❌ Database connection failed.");
    }
});

// ✅ Member Signup (Stores user in PostgreSQL)
app.post("/signup", async (req, res) => {
    const { username,password ,secretKey } = req.body;

    if (!username || !password || !secretKey) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // 1️⃣ Check if Secret Key is correct
    if (secretKey !== SECRET_KEY) {
        return res.status(403).json({ message: "Invalid Secret Key" });
    }

    try {
        
         // ✅ Step 2: Save User to Database
         const hashedPassword = await bcrypt.hash(password, 10); // Secure password
         const result = await pool.query(
             "INSERT INTO members (username, password) VALUES ($1, $2) RETURNING *",
             [username, hashedPassword]
         );
 
         res.status(201).json({ message: "Signup successful!", user: result.rows[0] });
    } 
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Member Login (Verifies user from PostgreSQL)
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
     
    if (!username || !password) {
        return res.status(400).json({ message: "Both fields are required" });
    }
    try {
        const user = await pool.query("SELECT * FROM members WHERE username = $1", [username]);

        if (user.rows.length === 0 ) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

      //  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
      //  res.json({ token });
      

        // 🔹 Verify password
        const isPasswordValid = bcrypt.compareSync(password, user.rows[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // 🔹 Successful login → Redirect to member.html
        res.json({ message: "Login successful!", redirect: "/member.html" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/", (req, res) => {
    res.send("✅ Server is running and connected to the database!");
});


// ✅ Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
