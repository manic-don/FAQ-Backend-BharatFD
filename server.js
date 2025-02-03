const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
dotenv.config();

const faqRoutes = require("./routes/faq");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Test Route
app.get("/", (req, res) => {
    res.send("Server is Running!");
});

// Routes
app.use("/api/faqs", faqRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB(); // Establish DataBase connection
    console.log(`Server Running on Port: ${PORT}`);
});
