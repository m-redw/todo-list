import "./index.css";
import "./project.css";

import { createProjectDOM, createTodoDOM, createNewProject, createNewTodo } from "./dom.js";
import makeProject from "./projectObj.js";
import makeTodo from "./todoObj.js";
import setLS from "./localstore.js";

//localStorage.clear()
const projectlist = JSON.parse(localStorage.getItem('projectList'));
let projectIndex = 0;
if (projectlist) {
    for (const project of projectlist) {
        createNewProject(project.name, project.content);
        projectIndex++;
        for (const todo of project.content) {
            createNewTodo(todo.title, todo.desc, todo.dueDate, todo.priority, projectIndex);
        }
    }
} 