class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set notes(notes) {
    this.render(notes);
  }

  render(notes) {
    this.shadowRoot.innerHTML = `
      <style>
        .note-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          background-color: #4A555E;
          border-radius: 10px;
        }
        @media (min-width: 600px) {
          .note-list {
            grid-template-columns: 1fr 1fr;
          }
        }
      </style>
      <div class="note-list">
        ${notes
          .map(
            (note) => `
          <note-item
            id="${note.id}"
            title="${note.title}"
            body="${note.body}"
          ></note-item>
        `
          )
          .join("")}
      </div>
    `;

    this.shadowRoot.querySelectorAll("note-item").forEach((item) => {
      item.addEventListener("deleteNote", (event) => {
        this.dispatchEvent(
          new CustomEvent("noteDeleted", { detail: event.detail })
        );
      });
    });
  }
}

customElements.define("note-list", NoteList);
