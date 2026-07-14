// Переключение страниц

const buttons = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        pages.forEach(page => {
            page.classList.remove("active");
        });


        button.classList.add("active");

        const pageId = button.dataset.page;

        document
        .getElementById(pageId)
        .classList.add("active");

    });

});


// TASK SYSTEM

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// показать задачи

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
        ${task}

        <button onclick="deleteTask(${index})">
        ❌
        </button>
        `;

        taskList.appendChild(li);

    });


    taskCount.textContent = tasks.length;

}


// добавить задачу

addTask.addEventListener("click",()=>{

    if(taskInput.value.trim() !== ""){

        tasks.push(taskInput.value);

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );


        taskInput.value="";

        renderTasks();

    }

});


// удалить задачу

function deleteTask(index){

    tasks.splice(index,1);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    renderTasks();

}


// запуск

renderTasks();
