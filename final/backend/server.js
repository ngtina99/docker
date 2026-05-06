// Import Express framework
const express = require("express");

// Import MongoDB library
const mongoose = require("mongoose");

// Import CORS middleware
const cors = require("cors");

// Create Express app
const app = express();

// Allow frontend requests
app.use(cors());

// Allow JSON request bodies
app.use(express.json());

// Server port
const PORT = process.env.PORT || 5000;

// MongoDB settings from Kubernetes
const MONGO_HOST = process.env.MONGO_HOST || "mongo-service";
const MONGO_DATABASE = process.env.MONGO_DATABASE || "notesdb";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "admin";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "password123";

// MongoDB connection URL
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DATABASE}?authSource=admin`;

// Connect backend to MongoDB
mongoose
  .connect(MONGO_URL)

  // Success message
  .then(() => console.log("Connected to MongoDB"))

  // Error message
  .catch((err) => console.error("MongoDB connection error:", err));

// Note structure
const noteSchema = new mongoose.Schema({

  // Note text
  text: {

    // Text type
    type: String,

    // Text required
    required: true
  }
});

// Create Note model
const Note = mongoose.model("Note", noteSchema);

// Test route
app.get("/", (req, res) => {

  // Send response
  res.send("Backend API is running");
});

// Get all notes
app.get("/api/notes", async (req, res) => {

  // Fetch notes from MongoDB
  const notes = await Note.find();

  // Return notes
  res.json(notes);
});

// Add new note
app.post("/api/notes", async (req, res) => {

  // Create note
  const note = new Note({ text: req.body.text });

  // Save note to MongoDB
  await note.save();

  // Return saved note
  res.json(note);
});

// Delete note
app.delete("/api/notes/:id", async (req, res) => {

  // Delete note by ID
  await Note.findByIdAndDelete(req.params.id);

  // Return response
  res.json({ message: "Note deleted" });
});

// Start backend server
app.listen(PORT, () => {

  // Console message
  console.log(`Server running on port ${PORT}`);
});