const titleInput = document.querySelector('#noteTitle');
const bodyInput = document.querySelector('#noteBody');
const saveButton = document.querySelector('#saveBtn');
const copyButton = document.querySelector('#copyBtn');
const clearButton = document.querySelector('#clearBtn');
const saveState = document.querySelector('#saveState');
const savedNotes = document.querySelector('#savedNotes');
const storageKey = 'rain-note-current';

const defaultNotes = ['Ý tưởng sản phẩm', 'Checklist hôm nay', 'Link chia sẻ demo'];

function setSaveState(text, icon = 'fa-check') {
  saveState.innerHTML = `<i class="fa-solid ${icon}"></i> ${text}`;
}

function renderSavedNotes() {
  const currentTitle = titleInput.value.trim();
  const notes = currentTitle ? [currentTitle, ...defaultNotes] : defaultNotes;
  savedNotes.innerHTML = notes.map((note) => `<li><i class="fa-regular fa-note-sticky"></i> ${note}</li>`).join('');
}

function saveNote() {
  const payload = {
    title: titleInput.value,
    body: bodyInput.value,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(storageKey, JSON.stringify(payload));
  setSaveState('Đã lưu', 'fa-check');
  renderSavedNotes();
}

function loadNote() {
  const rawNote = localStorage.getItem(storageKey);
  if (!rawNote) {
    renderSavedNotes();
    return;
  }
  const note = JSON.parse(rawNote);
  titleInput.value = note.title || '';
  bodyInput.value = note.body || '';
  renderSavedNotes();
}

let saveTimer;
[titleInput, bodyInput].forEach((field) => {
  field.addEventListener('input', () => {
    setSaveState('Đang lưu...', 'fa-spinner fa-spin');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNote, 450);
  });
});

saveButton.addEventListener('click', saveNote);

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(`${titleInput.value}\n\n${bodyInput.value}`.trim());
  setSaveState('Đã copy', 'fa-copy');
});

clearButton.addEventListener('click', () => {
  titleInput.value = '';
  bodyInput.value = '';
  localStorage.removeItem(storageKey);
  setSaveState('Đã xóa', 'fa-trash-can');
  renderSavedNotes();
});

loadNote();
