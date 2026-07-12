import makeTodo from "./todoObj.js";

const addProjectButton = document.querySelector('.add-project');
const projectDialog = document.querySelector('.new-project');
const createProjectButton = document.querySelector('.project-create');
const projectDialogTitle = document.querySelector('.project-title');
const projectListDOM = document.querySelector('.project-list');
const todoDialog = document.querySelector('.new-todo');
const createTodoButton = document.querySelector('.todo-create')

let projectCount = 0;
let whichProject = 0;


export function createProjectDOM(title) {
    const thisProject = projectCount++;

    const project = document.createElement('div');
    project.classList.add('project', `_${thisProject}`);

    const h1 = document.createElement('h1');
    h1.textContent = title;

    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');

    const addTodoButton = document.createElement('button');
    addTodoButton.type = 'button';
    addTodoButton.textContent = '+';
    addTodoButton.classList.add('add-todo');
    addTodoButton.addEventListener('click', ()=>{
        todoDialog.showModal();
        whichProject = thisProject;
    });

    project.append(h1, todoList, addTodoButton);
    projectListDOM.append(project);
}


export function createTodoDOM(todoObj) {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const completeButton = document.createElement('button');
    completeButton.type = 'button';
    completeButton.classList.add('todo-complete');

    const todoTitle = document.createElement('h3');
    todoTitle.classList.add('todo-title');
    todoTitle.textContent = todoObj.title;

    const todoDesc = document.createElement('p');
    todoDesc.classList.add('.todo-desc');
    if (todoObj.desc != '') {
        todoDesc.textContent = '[...]';
    }

    const todoPriority = document.createElement('div');
    todoPriority.classList.add('todo-priority', todoObj.priority);
    if (todoObj.priority === 'medium') {
        todoPriority.textContent = 'MED';
    } else {
        todoPriority.textContent = todoObj.priority.toUpperCase();
    }

    todo.append(completeButton, todoTitle, todoDesc, todoPriority);

    const todoList = document.querySelector(`.project._${whichProject} .todo-list`);
    todoList.append(todo);
}


addProjectButton.addEventListener('click', ()=>{
    projectDialogTitle.value = '';
    projectDialog.showModal();
});

createProjectButton.addEventListener('click', ()=>{
    projectDialog.close();
    const title = projectDialogTitle.value;
    createProjectDOM(title);
});

createTodoButton.addEventListener('click', ()=>{
    const todoTitle = document.querySelector('#todo-title').value;
    const todoDesc = document.querySelector('#todo-desc').value;
    const todoDueDate = document.querySelector('#todo-dueDate').value;
    const todoPriority = document.querySelector('#todo-priority').value;
    
    const newTodo = makeTodo(todoTitle, todoDesc, todoDueDate, todoPriority);
    createTodoDOM(newTodo);

    todoDialog.close(); 
    document.querySelector('#todo-title').value = '';
    document.querySelector('#todo-desc').value = '';
    document.querySelector('#todo-dueDate').value = '';
    document.querySelector('#todo-priority').value = 'low';
});