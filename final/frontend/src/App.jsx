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
    await fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/notes/${id}`);
    await fetchNotes();
  };

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
          <h1
            style={{
              fontSize: "2.5rem",
              margin: 0,
              color: "#4a1d62ff",
            }}
          >
            CloudNotes
          </h1>

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

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "30px",
          }}
        >
          <input
            value={text}
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

createRoot(document.getElementById("root")).render(<App />);