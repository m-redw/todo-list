import "./index.css";
import "./project.css";

import makeTodo from "./todoObj.js";
import { createProjectDOM, createTodoDOM } from "./dom.js";

const addProjectButton = document.querySelector('.add-project');
addProjectButton.addEventListener('click', ()=>{
    createProjectDOM('test')
});