// React hooks
import React, { useEffect, useState } from "react";

// Axios for backend API requests
import axios from "axios";

// React renderer
import { createRoot } from "react-dom/client";

// Backend API route
const API_URL = "/api";

function App() {

  // Stores notes from MongoDB
  const [notes, setNotes] = useState([]);

  // Stores input text
  const [text, setText] = useState("");

  // Fetch all notes
  const fetchNotes = async () => {
    const response = await axios.get(`${API_URL}/notes`);
    setNotes(response.data);
  };

  // Add new note
  const addNote = async () => {

    // Prevent empty notes
    if (!text.trim()) return;

    await axios.post(`${API_URL}/notes`, { text });

    // Clear input
    setText("");

    // Reload notes
    await fetchNotes();
  };

  // Delete note
  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/notes/${id}`);

    // Reload notes
    await fetchNotes();
  };

  // Runs when app loads
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #ffe6f2 0%, #e6f7ff 50%, #f9f0ff 100%)",
        padding: "40px 20px",
        fontFamily: "'Trebuchet MS', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(10px)",
          borderRadius: "28px",
          padding: "30px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          border: "2px solid rgba(255,255,255,0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>

          {/* App title */}
          <h1
            style={{
              fontSize: "2.5rem",
              margin: 0,
              color: "#4a1d62ff",
            }}
          >
            CloudNotes
          </h1>

          {/* App description */}
          <p
            style={{
              color: "#666",
              marginTop: "10px",
              fontSize: "1rem",
            }}
          >
            A simple full-stack notes application running on Kubernetes.
            <br />
            The React frontend communicates seamlessly with a Node.js API.
            <br />
            MongoDB securely stores and manages all application data.
          </p>
        </div>

        {/* Input section */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "30px",
          }}
        >
          <input
            value={text}

            // Updates text while typing
            onChange={(e) => setText(e.target.value)}

            placeholder="Write a note"
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "16px",
              border: "2px solid #f2b3ffff",
              outline: "none",
              fontSize: "1rem",
              background: "#fffafc",
            }}
          />

          {/* Add note button */}
          <button
            onClick={addNote}
            style={{
              padding: "14px 22px",
              border: "none",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #dd7effff, #4c005dff)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(255,79,163,0.3)",
            }}
          >
            Add
          </button>
        </div>

        <h2
          style={{
            color: "#060d18ff",
            marginBottom: "18px",
          }}
        >
          Your Notes
        </h2>

        {/* Show message if no notes */}
        {notes.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              borderRadius: "20px",
              background: "#fff",
              color: "#999",
            }}
          >
            No notes yet. Add one above! ☀️
          </div>
        ) : (

          // Display notes
          notes.map((note) => (
            <div
              key={note._id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "18px",
                marginBottom: "16px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                borderLeft: "8px solid #e2b3ffff",
                position: "relative",
                transition: "0.2s",
              }}
            >
              <div
                style={{
                  fontSize: "1rem",
                  color: "#444",
                  paddingRight: "80px",
                  lineHeight: "1.5",
                }}
              >
                ☁️ {note.text}
              </div>

              {/* Delete note button */}
              <button
                onClick={() => deleteNote(note._id)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "16px",
                  border: "none",
                  background: "#fce6ffff",
                  color: "#aa4fffff",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
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
createRoot(document.getElementById("root")).render(<App />);
