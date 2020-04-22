const todoForm = document.querySelector(".js-form-todo");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-list-todo");
const todos = [];

function handleSubmit(event) {
    event.preventDefault();
    addTodoItem(todoInput.value);
    localStorage.setItem("todos", JSON.stringify(todos))
    todoInput.value = "";
}

function addTodoItem(text) {
    const newID = todos.length + 1;
    const todoItem = {
        id: newID,
        text: text
    };
    todos.push(todoItem);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    span.innerHTML = text;
    delBtn.innerHTML = "X";
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newID;
    todoList.appendChild(li);
}

function loadTodos() {
    const parsedTodos = JSON.parse(localStorage.getItem("todos"));
    if (parsedTodos !== null) {
        parsedTodos.forEach(function (todo) {
            addTodoItem(todo.text);
        });
    }
}

function init() {
    todoForm.addEventListener("submit", handleSubmit);
    loadTodos();
}

init();