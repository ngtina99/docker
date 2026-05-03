import React, { useEffect, useState } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";

const API_URL = "/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const fetchNotes = async () => {
    const response = await axios.get(`${API_URL}/notes`);
    setNotes(response.data);
  };

  const addNote = async () => {
    if (!text.trim()) return;

    await axios.post(`${API_URL}/notes`, { text });
    setText("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>☸️ Kubernetes Notes App</h1>

      <p>
        React frontend → Node.js backend → MongoDB database
      </p>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        style={{ padding: "10px", width: "70%" }}
      />

      <button onClick={addNote} style={{ padding: "10px", marginLeft: "10px" }}>
        Add
      </button>

      <h2>Notes</h2>

      {notes.map((note) => (
        <div
          key={note._id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          {note.text}
          <button
            onClick={() => deleteNote(note._id)}
            style={{ float: "right" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
