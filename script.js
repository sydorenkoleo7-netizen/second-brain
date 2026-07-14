let notes = JSON.parse(localStorage.getItem('second-brain-notes')) || [];
let activeNoteId = null;
let isPreview = false;

// Элементы DOM
const notesList = document.getElementById('notes-list');
const newNoteBtn = document.getElementById('new-note-btn');
const searchBar = document.getElementById('search-bar');
const noteTitle = document.getElementById('note-title');
const noteTags = document.getElementById('note-tags');
const noteContent = document.getElementById('note-content');
const previewArea = document.getElementById('preview-area');
const saveBtn = document.getElementById('save-btn');
const togglePreviewBtn = document.getElementById('toggle-preview-btn');

// Инициализация
renderNotesList();

newNoteBtn.addEventListener('click', () => {
    const newNote = {
        id: Date.now().toString(),
        title: 'Новая заметка',
        tags: '',
        content: ''
    };
    notes.push(newNote);
    saveToLocalStorage();
    renderNotesList();
    openNote(newNote.id);
});

saveBtn.addEventListener('click', () => {
    if (!activeNoteId) return;
    const note = notes.find(n => n.id === activeNoteId);
    if (note) {
        note.title = noteTitle.value;
        note.tags = noteTags.value;
        note.content = noteContent.value;
        saveToLocalStorage();
        renderNotesList();
        alert('Сохранено!');
    }
});

togglePreviewBtn.addEventListener('click', () => {
    isPreview = !isPreview;
    if (isPreview) {
        noteContent.classList.add('hidden');
        previewArea.classList.remove('hidden');
        togglePreviewBtn.textContent = 'Редактор';
        renderPreview();
    } else {
        noteContent.classList.remove('hidden');
        previewArea.classList.add('hidden');
        togglePreviewBtn.textContent = 'Предпросмотр';
    }
});

searchBar.addEventListener('input', renderNotesList);

function saveToLocalStorage() {
    localStorage.setItem('second-brain-notes', JSON.stringify(notes));
}

function renderNotesList() {
    notesList.innerHTML = '';
    const query = searchBar.value.toLowerCase();

    const filtered = notes.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.tags.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );

    filtered.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note.title;
        li.addEventListener('click', () => openNote(note.id));
        notesList.appendChild(li);
    });
}

function openNote(id) {
    activeNoteId = id;
    const note = notes.find(n => n.id === id);
    
    noteTitle.disabled = false;
    noteTags.disabled = false;
    noteContent.disabled = false;
    saveBtn.disabled = false;
    togglePreviewBtn.disabled = false;

    noteTitle.value = note.title;
    noteTags.value = note.tags;
    noteContent.value = note.content;

    // Сброс превью при переключении заметки
    isPreview = false;
    noteContent.classList.remove('hidden');
    previewArea.classList.add('hidden');
    togglePreviewBtn.textContent = 'Предпросмотр';
}

// Парсинг Вики-ссылок [[Название заметки]] в превью
function renderPreview() {
    let rawContent = noteContent.value;
    
    // Экранирование HTML тегов для безопасности
    rawContent = rawContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Превращаем [[Заметка]] в кликабельные ссылки
    const wikiLinkRegex = /\[\[(.*?)\]\]/g;
    const htmlContent = rawContent.replace(wikiLinkRegex, (match, title) => {
        const targetNote = notes.find(n => n.title.trim().toLowerCase() === title.trim().toLowerCase());
        if (targetNote) {
            return `<a href="#" style="color: #5865f2; text-decoration: underline;" onclick="window.openLinkedNote('${targetNote.id}')">${title}</a>`;
        } else {
            return `<span style="color: #f04747; border-bottom: 1px dashed;">${title} (не создана)</span>`;
        }
    });

    previewArea.innerHTML = htmlContent.replace(/\n/g, '<br>');
}

// Глобальная функция для перехода по линкам внутри превью
window.openLinkedNote = function(id) {
    openNote(id);
};
