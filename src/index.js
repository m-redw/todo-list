import "./index.css";
import { createTodo } from "./todoCreator.js";
import { createHeader } from "./headerCreator.js";

const editTodo = document.querySelector('#edit-todo');
const dialogExitButton = document.querySelector('.dialog-exit');

// move logic to button creation
const todoDos = document.querySelectorAll(".edit-todo");
todoDos.forEach((todo) => {
    todo.addEventListener('click', ()=>{

        editTodo.showModal();
    });
});

dialogExitButton.addEventListener('click', ()=>{
    editTodo.close();
});


const project1 = document.querySelector('.content-container');
createTodo('test1', 'ee', 'Due in 2 days', project1)
createTodo('test2', '', '', project1)
createHeader('Heading 2', project1);