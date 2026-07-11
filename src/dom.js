import makeTodo from "./todoObj.js";

const projectListDOM = document.querySelector('.project-list');

export function createProjectDOM(title) {
    const project = document.createElement('div');
    project.classList.add('project');

    const h1 = document.createElement('h1');
    h1.textContent = title;

    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');

    const addTodoButton = document.createElement('button');
    addTodoButton.type = 'button';
    addTodoButton.textContent = '+';
    addTodoButton.classList.add('add-todo');
    addTodoButton.addEventListener('click', ()=>{
        console.log('add todo');
    });

    project.append(h1, todoList, addTodoButton);
    projectListDOM.append(project);
}

export function createTodoDOM() {

}