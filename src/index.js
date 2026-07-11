import "./index.css";
import "./project.css";

import { createProjectDOM, createTodoDOM } from "./dom.js";

const addProjectButton = document.querySelector('.add-project');
const projectDialog = document.querySelector('.new-project');
const createProjectButton = document.querySelector('.project-create');
const projectDialogTitle = document.querySelector('.project-title');

addProjectButton.addEventListener('click', ()=>{
    projectDialogTitle.value = '';
    projectDialog.showModal();
});

createProjectButton.addEventListener('click', ()=>{
    projectDialog.close();
    const title = projectDialogTitle.value;
    createProjectDOM(title);
});