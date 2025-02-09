const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
       .connect(process.env.MONGO_URI)
       .then(()=>{console.log('MongoDB Connected Successfully');})
       .catch((err)=>{console.log('Error is connecting Database : ',err);
       })


// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// Routes
app.get("/", (req, res) => res.send("API is running..."));
app.use("/api/home", require("./routes/homeRoutes"));
app.use("/api/education", require("./routes/educationRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
