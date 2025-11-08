const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5002";

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes`);
  return res.json();
}

export async function createNote(note) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/notes/${id}`, { method: "DELETE" });
  return res.json();
}
