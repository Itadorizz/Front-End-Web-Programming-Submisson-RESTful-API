class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["id", "title", "body"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .note {
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px;
          border-radius: 5px;
          background-color: #f9f9f9;
          position: relative;
          transition: transform 0.3s ease;
        }
        .note:hover {
          transform: translateY(-5px);
          background-color: #ffffff;
          transition: ease-in-out;
        }
        .note-title {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .delete-btn {
          position: absolute;
          top: 5px;
          right: 5px;
          background-color: #af2030;
          color: #f9f9f9;
          border: none;
          border-radius: 10px;
          width: 50px;
          height: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transition: background-color 0.3s ease;
        }
        .delete-btn:hover {
          background-color: #4a555e;
        }
      </style>
      <div class="note">
        <div class="note-title">${this.getAttribute("title")}</div>
        <div class="note-body">${this.getAttribute("body")}</div>
        <button class="delete-btn">Delete Note</button>
      </div>
    `;

    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("deleteNote", { detail: this.getAttribute("id") })
        );
      });
  }
}

customElements.define("note-item", NoteItem);
