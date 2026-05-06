// Import React features
import React, { useEffect, useState } from "react";

// Import Axios for API requests
import axios from "axios";

// React renderer
import { createRoot } from "react-dom/client";

// Backend API URL
const API_URL = "/api";

// Main React component
function App() {

  // Store notes
  const [notes, setNotes] = useState([]);

  // Store input text
  const [text, setText] = useState("");

  // Get notes from backend
  const fetchNotes = async () => {

    // Request notes
    const response = await axios.get(`${API_URL}/notes`);

    // Save notes into state
    setNotes(response.data);
  };

  // Add new note
  const addNote = async () => {

    // Prevent empty notes
    if (!text.trim()) return;

    // Send note to backend
    await axios.post(`${API_URL}/notes`, { text });

    // Clear input field
    setText("");

    // Reload notes
    await fetchNotes();
  };

  // Delete note
  const deleteNote = async (id) => {

    // Delete note by ID
    await axios.delete(`${API_URL}/notes/${id}`);

    // Reload notes
    await fetchNotes();
  };

  // Runs when app loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Frontend UI
  return (
    <div>

      {/* App container */}
      <div>

        {/* App title */}
        <div>

          {/* Main heading */}
          <h1>
            CloudNotes
          </h1>

          {/* Description */}
          <p>
            A simple full-stack notes application running on Kubernetes.
          </p>
        </div>

        {/* Input section */}
        <div>

          {/* Note input */}
          <input
            value={text}

            // Update text while typing
            onChange={(e) => setText(e.target.value)}

            placeholder="Write a note"
          />

          {/* Add button */}
          <button onClick={addNote}>
            Add
          </button>
        </div>

        {/* Notes title */}
        <h2>
          Your Notes
        </h2>

        {/* Show message if no notes */}
        {notes.length === 0 ? (

          <div>
            No notes yet.
          </div>

        ) : (

          // Show notes
          notes.map((note) => (

            <div key={note._id}>

              {/* Note text */}
              <div>
                ☁️ {note.text}
              </div>

              {/* Delete button */}
              <button
                onClick={() => deleteNote(note._id)}
              >
                🗑
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Render React app
createRoot(
  document.getElementById("root")
).render(<App />);