const todoForm = document.querySelector(".js-form-todo");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-list-todo");
const TODOS_LS = "todos";
let todos = [];

function handleSubmit(event) {
    event.preventDefault();
    addTodoItem(todoInput.value);
    saveTodos();
    todoInput.value = "";
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function handleDelBtnClick(event) {
    const li = event.target.parentNode;
    todoList.removeChild(li);
    todos = todos.filter(function (todo) { return todo.id !== parseInt(li.id) });
    saveTodos();
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
    span.innerHTML = text;
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click", handleDelBtnClick)
    delBtn.innerHTML = "X";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newID;
    todoList.appendChild(li);
}

function loadTodos() {
    const parsedTodos = JSON.parse(localStorage.getItem(TODOS_LS));
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