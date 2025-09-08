import React, { useEffect, useState } from "react";
import { addNote, deleteNote, getNotes, updateNote } from "../../service/notesService";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // ✅ store this at login

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const response = await getNotes(userId, token);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

 useEffect(() => {
  if (token && userId) {
    fetchNotes();
  } else {
    console.warn("No token or userId found in localStorage");
  }
}, []);

  // Handle Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateNote(editId, { title, content }, token);
      } else {
        await addNote(userId, { title, content }, token);
      }
      setTitle("");
      setContent("");
      setEditId(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // Handle Edit
  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteNote(id, token);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>My Notes</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit">
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id} style={{ marginBottom: "15px", listStyle: "none" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
