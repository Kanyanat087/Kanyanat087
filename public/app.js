const storageKey = "simple-node-local-notes";
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const list = document.querySelector("#notes-list");
const emptyState = document.querySelector("#empty-state");
const clearButton = document.querySelector("#clear-button");
const noteCount = document.querySelector("#note-count");

function getNotes() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(storageKey, JSON.stringify(notes));
}

function renderNotes() {
  const notes = getNotes();
  list.innerHTML = "";
  emptyState.hidden = notes.length > 0;
  noteCount.textContent = `${notes.length} ${notes.length === 1 ? "note" : "notes"}`;

  notes.forEach((note) => {
    const item = document.createElement("li");
    const content = document.createElement("div");
    const date = document.createElement("time");
    const body = document.createElement("p");
    const deleteButton = document.createElement("button");

    item.className = "note";
    content.className = "note-content";
    date.dateTime = note.createdAt;
    date.textContent = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(note.createdAt));
    body.textContent = note.text;
    deleteButton.className = "delete-note";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Delete note");
    deleteButton.addEventListener("click", () => {
      saveNotes(getNotes().filter((savedNote) => savedNote.id !== note.id));
      renderNotes();
    });

    content.append(date, body);
    item.append(content, deleteButton);
    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  const notes = getNotes();
  notes.unshift({
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString()
  });

  saveNotes(notes);
  input.value = "";
  renderNotes();
});

clearButton.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  renderNotes();
  input.focus();
});

renderNotes();
