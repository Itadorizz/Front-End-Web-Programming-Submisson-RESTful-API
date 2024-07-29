class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .form-group {
          margin-bottom: 10px;
          padding: 0 20px 0 0;
          
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px 15px;
          background-color: #af2030;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #4a555e;
        }
      </style>
      <div class="form-group">
        <input type="text" id="title" placeholder="Title" />
      </div>
      <div class="form-group">
        <textarea id="body" placeholder="Note"></textarea>
      </div>
      <button id="addNoteButton">Add Note</button>
    `;
    this.shadowRoot
      .querySelector("#addNoteButton")
      .addEventListener("click", this.addNote.bind(this));
  }

  addNote() {
    const title = this.shadowRoot.querySelector("#title").value;
    const body = this.shadowRoot.querySelector("#body").value;
    if (title && body) {
      const newNote = { title, body };
      this.dispatchEvent(new CustomEvent("noteAdded", { detail: newNote }));
      this.clearForm();
    } else {
      alert("Both title and body are required!");
    }
  }

  clearForm() {
    this.shadowRoot.querySelector("#title").value = "";
    this.shadowRoot.querySelector("#body").value = "";
  }
}

customElements.define("note-form", NoteForm);
