import makeTodo from "./todoObj.js";

const addProjectButton = document.querySelector('.add-project');
const createProjectButton = document.querySelector('.project-create');
const createTodoButton = document.querySelector('.todo-create')
const editTodoButton = document.querySelector('.todo-edit');

const projectDialog = document.querySelector('.new-project');
const todoDialog = document.querySelector('.new-todo');
const editDialog = document.querySelector('.edit-todo')

const projectDialogTitle = document.querySelector('#project-title');
const projectListDOM = document.querySelector('.project-list');

const editTitle = document.querySelector('#edit-title');
const editDesc = document.querySelector('#edit-desc');
const editDueDate = document.querySelector('#edit-dueDate');
const editPriority = document.querySelector('#edit-priority');

let projectCount = 0;
let whichProject = 0;
let projects = [];

let currentTodo;

export function createProjectDOM(title) {
    const thisProject = ++projectCount;
    projects.push([]);

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
    completeButton.addEventListener('click', (button)=>{
        button.stopPropagation();
        todo.remove();
    });

    const todoTitle = document.createElement('h3');
    todoTitle.classList.add('todo-title');
    todoTitle.textContent = todoObj.title;

    const todoDesc = document.createElement('p');
    todoDesc.classList.add('todo-desc');
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

    todo.addEventListener('click', ()=>{
        editTitle.value = todoObj.title;
        editDesc.value = todoObj.desc;
        editDueDate.value = todoObj.dueDate;
        editPriority.value = todoObj.priority;
        currentTodo = [todoObj, todoTitle, todoDesc, todoPriority];
        editDialog.showModal();
    });
}


addProjectButton.addEventListener('click', ()=>{
    projectDialog.showModal();
});

createProjectButton.addEventListener('click', ()=>{
    if (projectDialogTitle.value.length < 1) {
        alert('Project title required! (At least 1 char)');
        return;
    }

    projectDialog.close();
    const title = projectDialogTitle.value;
    createProjectDOM(title);
    projectDialogTitle.value = '';
});

createTodoButton.addEventListener('click', ()=>{
    const todoTitle = document.querySelector('#todo-title').value;
    if (todoTitle.length < 1) {
        alert('Todo title required! (At least 1 char)');
        return;
    }
    const todoDesc = document.querySelector('#todo-desc').value;
    const todoDueDate = document.querySelector('#todo-dueDate').value;
    const todoPriority = document.querySelector('#todo-priority').value;
    

    const newTodo = makeTodo(todoTitle, todoDesc, todoDueDate, todoPriority);
    createTodoDOM(newTodo);
    projects[whichProject-1].push(newTodo);

    todoDialog.close(); 

    // Only resets after successfully creating new todo
    document.querySelector('#todo-title').value = '';
    document.querySelector('#todo-desc').value = '';
    document.querySelector('#todo-dueDate').value = '';
    document.querySelector('#todo-priority').value = 'low';
});

editTodoButton.addEventListener('click', ()=>{
    if (editTitle.value.length < 1) {
        alert('Todo title required! (At least 1 char)');
        return;
    }
    const todoObj = currentTodo[0];
    const todoTitle = currentTodo[1];
    const todoDesc = currentTodo[2];
    const todoPriority = currentTodo[3];


    todoObj.title = editTitle.value;
    todoObj.desc = editDesc.value;
    todoObj.dueDate = editDueDate.value;
    todoObj.priority = editPriority.value;
    
    todoTitle.textContent = todoObj.title;
    
    if (todoObj.desc != '') {
        todoDesc.textContent = '[...]';
    } else {
        todoDesc.textContent = '';
    }

    todoPriority.classList.remove('low', 'medium', 'high');
    todoPriority.classList.add(todoObj.priority);
    if (todoObj.priority === 'medium') {
        todoPriority.textContent = 'MED';
    } else {
        todoPriority.textContent = todoObj.priority.toUpperCase();
    }

    console.log(projects);
    editDialog.close(); 
});