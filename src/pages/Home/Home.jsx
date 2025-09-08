import React, { useEffect, useState } from "react";
import { getNotes, addNote, updateNote, deleteNote } from "../../service/notesService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [userNotes, setUserNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [username, setUsername] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAllNotes();
    if (token && userId) {
      fetchUserNotes();
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) setUsername(storedUsername);
    }
  }, []);

  const fetchAllNotes = async () => {
    try {
      const response = await getNotes("all", token);
      setAllNotes(response.data);
    } catch (err) {
      console.error("Error fetching all notes:", err);
      toast.error("Cannot fetch all notes ❌");
    }
  };

  const fetchUserNotes = async () => {
    try {
      const response = await getNotes(userId, token);
      setUserNotes(response.data);
    } catch (err) {
      console.error("Error fetching user notes:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !userId) {
      toast.info("Login first to add notes 🔒");
      return;
    }
    try {
      if (editId) {
        await updateNote(editId, { title, content }, token);
        toast.success("Note updated ✅");
      } else {
        await addNote(userId, { title, content }, token);
        toast.success("Note added 🎉");
      }
      setTitle("");
      setContent("");
      setEditId(null);
      fetchUserNotes();
      fetchAllNotes();
    } catch (err) {
      console.error(err);
      toast.error("Error saving note ❌");
    }
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id, token);
      toast.success("Note deleted ✅");
      fetchUserNotes();
      fetchAllNotes();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting note ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    toast.info("Logged out 👋");
    setUserNotes([]);
    setUsername("");
  };

  const openModal = (note) => {
    if (!token) {
      toast.info("Login to see full content 🔒");
      return;
    }
    setSelectedNote(note);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setShowModal(false);
  };

  return (
    <div className="home-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-black">All Notes</h2>
        {!token ? (
          <div>
            <a href="/login" className="btn btn-primary me-2">Login</a>
            <a href="/register" className="btn btn-success">Register</a>
          </div>
        ) : (
          <div className="d-flex align-items-center ">
            <span className="text-black fw-bold me-3 fs-5 ">Hello, <span className="username-display">{username}</span></span>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div className="row mb-5">
        {allNotes.length === 0 && <p className="text-black">No notes available.</p>}
        {allNotes.map((note) => (
          <div key={note.id} className="col-md-4 mb-3">
            <div
              className="card shadow-sm hover-card d-flex flex-column"
              style={{ borderRadius: "15px", overflow: "hidden", height: "400px", cursor: "pointer" }}
              onClick={() => openModal(note)}
            >
              <img
                src={`https://picsum.photos/400/200?random=${note.id}`}
                className="card-img-top"
                alt="Note"
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-truncate">{note.title}</h5>
                <p className="card-text">{note.content.substring(0, 100)}...</p>
                {!token && <a href="/login" className="btn btn-primary w-100">Login to see full content</a>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {token && (
        <>
          <div className="user-notes-form mb-4">
            <h3 className="text-black">Add / Edit Your Notes</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control mb-2"
                required
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control mb-2"
                required
              />
              <button type="submit" className="btn btn-primary">
                {editId ? "Update Note" : "Add Note"}
              </button>
            </form>
          </div>

          <div className="user-notes">
            <h3 className="text-black mb-3">Your Notes</h3>
            <div className="row">
              {userNotes.length === 0 && <p className="text-white">No notes yet.</p>}
              {userNotes.map((note) => (
                <div key={note.id} className="col-md-4 mb-3">
                  <div className="card shadow-sm hover-card d-flex flex-column" style={{ borderRadius: "15px", overflow: "hidden", height: "400px" }}>
                    <img
                      src={`https://picsum.photos/400/200?random=${note.id}`}
                      className="card-img-top"
                      alt="Note"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div className="note-content-scroll">
                        <h5 className="card-title text-truncate">{note.title}</h5>
                        <p className="card-text">{note.content}</p>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <button className="btn btn-sm btn-warning" onClick={() => handleEdit(note)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(note.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedNote?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedNote?.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
