import pkg from 'pg'; // Import 'pg' package
import dotenv from 'dotenv'; // Import dotenv for environment variables

dotenv.config(); // Load environment variables from .env file

const { Pool } = pkg; // Destructure Pool from 'pg' package

// Create PostgreSQL connection pool
const pool = new Pool({
    user: process.env.DB_USER,       // PostgreSQL username
    host: process.env.DB_HOST,       // Database host (usually 'localhost')
    database: process.env.DB_NAME,   // Database name
    password: process.env.DB_PASSWORD, // Database password
    port: process.env.DB_PORT,       // PostgreSQL port (default: 5432)
});

// ✅ Test the database connection
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL Database!"))
    .catch(err => console.error("❌ Database connection error:", err));

export default pool; // ✅ Export 'pool' as default
