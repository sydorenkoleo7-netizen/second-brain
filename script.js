<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Second Brain</title>

<link rel="stylesheet" href="style.css">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

</head>

<body>

<div class="sidebar">

<div class="logo">
🧠 Second Brain
</div>

<div class="menu">

<button class="menu-item active" data-page="dashboard">
🏠 Dashboard
</button>

<button class="menu-item" data-page="notes">
📝 Notes
</button>

<button class="menu-item" data-page="tasks">
✅ Tasks
</button>

<button class="menu-item" data-page="habits">
🔥 Habits
</button>

<button class="menu-item" data-page="goals">
🎯 Goals
</button>

<button class="menu-item" data-page="finance">
💰 Finance
</button>

<button class="menu-item" data-page="workout">
🏋️ Workout
</button>

<button class="menu-item" data-page="calendar">
📅 Calendar
</button>

<button class="menu-item" data-page="journal">
📖 Journal
</button>

</div>

</div>

<div class="content">

<section id="dashboard" class="page active">

<h1>Добро пожаловать 👋</h1>

<div class="cards">

<div class="card">
<h2>Задачи</h2>
<p id="taskCount">0</p>
</div>

<div class="card">
<h2>Привычки</h2>
<p>0%</p>
</div>

<div class="card">
<h2>Доход</h2>
<p>0 ₴</p>
</div>

<div class="card">
<h2>Вес</h2>
<p>61 кг</p>
</div>

</div>

</section>

<section id="notes" class="page">
<h1>📝 Notes</h1>

<textarea placeholder="Начни писать..."></textarea>

</section>

<section id="tasks" class="page">

<h1>✅ Tasks</h1>

<div class="task-input">

<input
id="taskInput"
type="text"
placeholder="Новая задача">

<button id="addTask">
Добавить
</button>

</div>

<ul id="taskList"></ul>

</section>

<section id="habits" class="page">
<h1>🔥 Habits</h1>
<p>Скоро...</p>
</section>

<section id="goals" class="page">
<h1>🎯 Goals</h1>
<p>Скоро...</p>
</section>

<section id="finance" class="page">
<h1>💰 Finance</h1>
<p>Скоро...</p>
</section>

<section id="workout" class="page">
<h1>🏋️ Workout</h1>
<p>Скоро...</p>
</section>

<section id="calendar" class="page">
<h1>📅 Calendar</h1>
<p>Скоро...</p>
</section>

<section id="journal" class="page">
<h1>📖 Journal</h1>
<p>Скоро...</p>
</section>

</div>

<script src="script.js"></script>

</body>
</html>
// =================
// NOTES SYSTEM V2
// =================


const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const noteTags = document.getElementById("noteTags");

const saveNote = document.getElementById("saveNote");
const notesList = document.getElementById("notesList");
const searchNotes = document.getElementById("searchNotes");


let notes = JSON.parse(
localStorage.getItem("notes")
) || [];



saveNote.onclick = ()=>{


let note = {

title: noteTitle.value,

text: noteText.value,

tags: noteTags.value,

date: new Date().toLocaleDateString()

};


notes.push(note);


localStorage.setItem(
"notes",
JSON.stringify(notes)
);


noteTitle.value="";
noteText.value="";
noteTags.value="";


showNotes(notes);

};




function showNotes(data){

notesList.innerHTML="";


data.forEach((note,index)=>{


let li=document.createElement("li");


li.innerHTML=`

<h3>${note.title}</h3>

<p>${note.text}</p>

<small>${note.tags}</small>

<br>

<button onclick="openNote(${index})">
Открыть
</button>

<button onclick="removeNote(${index})">
❌
</button>

`;


notesList.appendChild(li);


});

}



function openNote(index){

let note=notes[index];

noteTitle.value=note.title;

noteText.value=note.text;

noteTags.value=note.tags;

}




function removeNote(index){

notes.splice(index,1);


localStorage.setItem(
"notes",
JSON.stringify(notes)
);


showNotes(notes);

}



searchNotes.oninput=()=>{


let value=
searchNotes.value.toLowerCase();



let filtered=notes.filter(note=>{


return (

note.title.toLowerCase().includes(value)

||

note.text.toLowerCase().includes(value)

||

note.tags.toLowerCase().includes(value)

);


});


showNotes(filtered);


};



showNotes(notes);


});



// показать заметки

function renderNotes(){


notesList.innerHTML="";


notes.forEach((note,index)=>{


let li=document.createElement("li");


li.innerHTML=`

<b>${note.title}</b>
<br>
${note.date}

<button onclick="openNote(${index})">
Открыть
</button>

<button onclick="deleteNote(${index})">
❌
</button>

`;


notesList.appendChild(li);


});


}



// открыть заметку

function openNote(index){

noteTitle.value=notes[index].title;

noteText.value=notes[index].text;


}



// удалить

function deleteNote(index){


notes.splice(index,1);


localStorage.setItem(
"notes",
JSON.stringify(notes)
);


renderNotes();


}


renderNotes();