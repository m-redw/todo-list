import "./index.css";
import { createTodo } from "./todoCreator.js";
import { createHeader } from "./headerCreator.js";
import { createProject } from "./projectCreator.js";

let projects = [];

// Make edit-todo dialog exitable
const editTodo = document.querySelector('#edit-todo');
const todoDialogExitButton = document.querySelector('.todo-dialog-exit');

todoDialogExitButton.addEventListener('click', ()=>{
    editTodo.close();
});


// Create project
const addProjectButton = document.querySelector('.add-project');
const projectDialog = document.querySelector('#create-project');
const projectCreateButton = document.querySelector('.project-create-button');
const warning = document.querySelector('.warning');

addProjectButton.addEventListener('click', ()=>{
    warning.textContent = '';
    projectDialog.showModal();
});

projectCreateButton.addEventListener('click', ()=>{
    const projectTitle = document.getElementById('project-title').value;
    
    if (projectTitle.length > 0 && !projects.includes(projectTitle)) {
        projects.push(projectTitle);
        createProject(projectTitle)
        projectDialog.close();
    } else {
        warning.textContent = 'Title is either too short or is already used!';
    }
});



// test (make project and add some content to it)
const project1 = createProject('1').contentContainer;
createTodo('test1', 'ee', 'Due in 2 days', project1)
createTodo('test2', '', '', project1)
createHeader('Heading 2', project1);