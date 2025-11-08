import React, { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const data = await getNotes();
    setNotes(data);
  }

  async function handleAddNote(e) {
    e.preventDefault();
    if (!title || !content) return alert("Titre et contenu requis");

    if (editingId) {
      await updateNote(editingId, { title, content });
      setEditingId(null);
    } else {
      await createNote({ title, content });
    }

    setTitle("");
    setContent("");
    fetchNotes();
  }

  async function handleEditNote(note) {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  }

  async function handleDeleteNote(id) {
    await deleteNote(id);
    fetchNotes();
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-white mb-3">📝 MERN Notes</h1>
          <p className="lead text-light opacity-85">Votre application de notes moderne et intuitive</p>
        </div>

        {/* Formulaire */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0" style={{ 
              background: "rgba(255, 255, 255, 0.95)", 
              backdropFilter: "blur(10px)",
              borderRadius: "20px"
            }}>
              <div className="card-body p-4">
                <form onSubmit={handleAddNote}>
                  <div className="row g-3 align-items-end">
                    <div className="col-md-5">
                      <label className="form-label fw-semibold text-primary">Titre</label>
                      <input
                        type="text"
                        className="form-control form-control-lg border-0"
                        placeholder="Donnez un titre..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ 
                          background: "#f8f9fa", 
                          borderRadius: "12px",
                          fontSize: "1.1rem"
                        }}
                      />
                    </div>
                    <div className="col-md-5">
                      <label className="form-label fw-semibold text-primary">Contenu</label>
                      <input
                        type="text"
                        className="form-control form-control-lg border-0"
                        placeholder="Écrivez votre note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ 
                          background: "#f8f9fa", 
                          borderRadius: "12px",
                          fontSize: "1.1rem"
                        }}
                      />
                    </div>
                    <div className="col-md-2">
                      <button 
                        type="submit" 
                        className="btn btn-primary w-100 py-3 fw-bold border-0"
                        style={{ 
                          borderRadius: "12px",
                          background: "linear-gradient(45deg, #667eea, #764ba2)",
                          fontSize: "1.1rem",
                          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
                        }}
                      >
                        {editingId ? "✏️ Modifier" : "➕ Ajouter"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des notes */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {notes.length === 0 ? (
              <div className="text-center py-5">
                <div className="card border-0 shadow-lg" style={{ 
                  background: "rgba(255, 255, 255, 0.9)", 
                  borderRadius: "20px"
                }}>
                  <div className="card-body py-5">
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📄</div>
                    <h3 className="text-muted mb-3">Aucune note pour le moment</h3>
                    <p className="text-muted">Commencez par ajouter votre première note !</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {notes.map((note) => (
                  <div key={note._id} className="col-12">
                    <div className="card shadow-sm border-0 h-100" style={{ 
                      background: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      border: "1px solid rgba(255, 255, 255, 0.2)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
                    }}>
                      <div className="card-body p-4">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <h5 className="card-title fw-bold text-primary mb-2">
                              {note.title}
                            </h5>
                            <p className="card-text text-muted mb-0" style={{ fontSize: "1.1rem" }}>
                              {note.content}
                            </p>
                          </div>
                          <div className="col-md-4 text-end">
                            <div className="btn-group" role="group">
                              <button 
                                onClick={() => handleEditNote(note)}
                                className="btn btn-outline-warning btn-sm px-3 py-2 me-2 fw-semibold border-2"
                                style={{ borderRadius: "10px" }}
                              >
                                ✏️ Modifier
                              </button>
                              <button 
                                onClick={() => handleDeleteNote(note._id)}
                                className="btn btn-outline-danger btn-sm px-3 py-2 fw-semibold border-2"
                                style={{ borderRadius: "10px" }}
                              >
                                🗑️ Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-5 pt-3">
          <p className="text-light opacity-75">
            {notes.length} note{notes.length !== 1 ? 's' : ''} au total
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;