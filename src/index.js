import "./index.css";
import { createTodo } from "./todoCreator.js";
import { createHeader } from "./headerCreator.js";
import { createProject } from "./projectCreator.js";

const editTodo = document.querySelector('#edit-todo');
const dialogExitButton = document.querySelector('.dialog-exit');

dialogExitButton.addEventListener('click', ()=>{
    editTodo.close();
});


const project1 = createProject('1').contentContainer;
createTodo('test1', 'ee', 'Due in 2 days', project1)
createTodo('test2', '', '', project1)
createHeader('Heading 2', project1);