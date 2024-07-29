import "./styles/styles.css";
import "./components/NoteForm.js";
import "./components/NoteList.js";
import "./components/NoteItem.js";
import "./components/LoadingIndicator.js";

const API_URL = "https://notes-api.dicoding.dev/v2";

function showLoading() {
  document.querySelector("loading-indicator").show();
}

function hideLoading() {
  document.querySelector("loading-indicator").hide();
}

async function fetchNotes() {
  showLoading();
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    const result = await response.json();
    hideLoading();
    console.log("API response:", result); // Log seluruh respons
    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error("Unexpected API response format:", result);
      return [];
    }
  } catch (error) {
    hideLoading();
    console.error("Error fetching notes:", error);
    alert("Failed to fetch notes. Please try again.");
    return [];
  }
}

async function addNote(newNote) {
  showLoading();
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    const data = await response.json();
    hideLoading();
    return data;
  } catch (error) {
    hideLoading();
    console.error("Error adding note:", error);
    alert("Failed to add note. Please try again.");
    return null;
  }
}

async function deleteNote(id) {
  showLoading();
  try {
    await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    });
    hideLoading();
    return true;
  } catch (error) {
    hideLoading();
    console.error("Error deleting note:", error);
    alert("Failed to delete note. Please try again.");
    return false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const noteListElement = document.querySelector("note-list");
  const noteFormElement = document.querySelector("note-form");

  const initialNotes = await fetchNotes();
  noteListElement.notes = initialNotes;

  noteFormElement.addEventListener("noteAdded", async (event) => {
    const newNote = event.detail;
    const addedNote = await addNote(newNote);
    if (addedNote) {
      const updatedNotes = await fetchNotes();
      noteListElement.notes = updatedNotes;
    }
  });

  noteListElement.addEventListener("noteDeleted", async (event) => {
    const noteId = event.detail;
    const deleted = await deleteNote(noteId);
    if (deleted) {
      const updatedNotes = await fetchNotes();
      noteListElement.notes = updatedNotes;
    }
  });
});
