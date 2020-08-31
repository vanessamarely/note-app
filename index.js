const form = {};
form.addNotesForm = document.querySelector("#notes-add__form");
form.addNotesText = document.querySelector("#note-text");
form.noteColor = document.querySelector("#note-color");

const notes = document.querySelector("#notes-list");

document.addEventListener("submit", (event) => {
  event.preventDefault();
  addNote();
});

function addNote() {
  console.log("add note");
  //declaration
  const textValue = form.addNotesText.value;
  const color = form.noteColor.value;
  const messages = document.querySelector(".notes-messages");
  if (!!textValue && !!color) {
    let note = document.createElement("div");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    messages.style.display = "none";
    // create note
    note.classList.add("note-card");
    note.style.background = color;
    note.innerHTML = `
    <p class="note-card__text">${textValue}</p>
    <div class="note-card__edit">
        <input type="text" class="notes-add__form__box note-card__edit-text" value="${textValue}" />
        <button type=button" class="note-card__button note-card__edit-save">save</button>
    </div>
    `;

    deleteButton.classList.add("note-card__button");
    editButton.classList.add("note-card__button");
    deleteButton.innerHTML = "Delete";
    editButton.innerHTML = "Edit";

    note.appendChild(editButton);
    note.appendChild(deleteButton);

    handleDeleteButton(deleteButton);
    handleEditButton(editButton);

    notes.appendChild(note);
  } else {
    messages.style.display = "block";
  }

  form.addNotesText.value = "";
  form.noteColor.value = "";
  form.addNotesText.focus();
}

function handleDeleteButton(deleteButton) {
  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteNote(event);
  });
}

function handleEditButton(editButton) {
  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    editNote(event);
  });
}

function deleteNote(event) {
  const eventNode = event.target.parentNode;
  eventNode.parentNode.removeChild(eventNode);
}

function editNote(event) {
  const eventNode = event.target.parentNode;
  const childNodes = eventNode.childNodes;
  const count = childNodes.length;
  for (let index = 0; index <= count; index++) {
    let element = childNodes[index];
    if (element.className === "note-card__edit") {
      const save = element.querySelector(".note-card__edit-save");
      const text = element.querySelector(".note-card__edit-text");
      element.style.display = "block";
      text.select();
      handleSaveText(eventNode, element, save);
    }
  }
}

function handleSaveText(eventNode, element, save) {
  save.addEventListener("click", (event) => {
    event.preventDefault();
    const text = element.querySelector(".note-card__edit-text");
    eventNode.querySelector(".note-card__text").innerText = text.value;
    element.style.display = "none";
    console.info("Edited!!");
  });
}
