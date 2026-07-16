import makeTodo from "./todoObj.js";
import makeProject from "./projectObj.js";
import setLS from "./localstore.js";

const addProjectButton = document.querySelector('.add-project');
const createProjectButton = document.querySelector('.project-create');
const createTodoButton = document.querySelector('.todo-create')
const editTodoButton = document.querySelector('.todo-edit');
const deleteTodoButton = document.querySelector('.todo-delete');

const projectDialog = document.querySelector('.new-project');
const todoDialog = document.querySelector('.new-todo');
const editDialog = document.querySelector('.edit-todo')

const projectDialogTitle = document.querySelector('#project-title');
const projectListDOM = document.querySelector('.project-list');

const editTitle = document.querySelector('#edit-title');
const editDesc = document.querySelector('#edit-desc');
const editDueDate = document.querySelector('#edit-dueDate');
const editPriority = document.querySelector('#edit-priority');


let projects = [];
let whichProject = 0;

let currentTodo;

const deletedTodo = new CustomEvent('deletedTodo');

export function setProjects(list) {
    projects = list;
}

export function createProjectDOM(title, projectObj) {
    let thisProject = projects.length;

    const project = document.createElement('div');
    project.classList.add('project', `_${thisProject}`);

    function deleteTodo() {
        if (thisProject != 1) {
            --thisProject;
            project.classList.remove(...project.classList);
            project.classList.add('project', `_${thisProject}`);
            
            for (let todo of projectObj.content) {
                todo.project--;
            }
        }
    }
    document.addEventListener('deletedTodo', deleteTodo);

    const h1 = document.createElement('h1');
    h1.textContent = title;

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.type = 'button';
    deleteProjectButton.classList.add('project-delete');
    deleteProjectButton.textContent = 'x';

    deleteProjectButton.addEventListener('click', ()=>{
        const shouldDelete = confirm(`Delete "${title}"? Press OK to DELETE. Cancel otherwise.`);
        if (shouldDelete) {
           // Memory cleanup (2 lines below specifically)
           document.removeEventListener('deletedTodo', deleteTodo);
           projects.splice(thisProject-1, 1);
           setLS('projectList', projects);
           
           document.dispatchEvent(deletedTodo);

           project.remove();
        }
    })

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

    project.append(h1, deleteProjectButton, todoList, addTodoButton);
    projectListDOM.append(project);
}


export function createTodoDOM(todoObj, whichParent) {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const completeButton = document.createElement('button');
    completeButton.type = 'button';
    completeButton.classList.add('todo-complete');

    const checkmark = document.createElement('span');
    checkmark.classList.add('todo-checkmark');
    completeButton.append(checkmark);

    completeButton.addEventListener('click', (button)=>{
        button.stopPropagation();
        
        if (checkmark.textContent === '') {
            checkmark.textContent = '✔';
        } else {
            checkmark.textContent = '';
        }
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

    const todoList = document.querySelector(`.project._${whichParent} .todo-list`);
    todoList.append(todo);

    todo.addEventListener('click', ()=>{
        editTitle.value = todoObj.title;
        editDesc.value = todoObj.desc;
        editDueDate.value = todoObj.dueDate;
        editPriority.value = todoObj.priority;
        currentTodo = [todoObj, todoTitle, todoDesc, todoPriority, todo];
        whichProject = todoObj.project;
        editDialog.showModal();
    });
}


addProjectButton.addEventListener('click', ()=>{
    projectDialog.showModal();
});

//000000000000000000000000000000000000000
export function createNewProject(title, content) {
    const newProject = makeProject(title, content);
    projects.push(newProject);
    createProjectDOM(title, newProject);
}

export function createNewTodo(todoTitle, todoDesc, todoDueDate, todoPriority, whichParent) {
    const newTodo = makeTodo(todoTitle, todoDesc, todoDueDate, todoPriority, whichParent);
    createTodoDOM(newTodo, whichParent);
}
//000000000000000000000000000000000000000

createProjectButton.addEventListener('click', ()=>{
    const projectTitle = projectDialogTitle.value;
    if (projectTitle.length < 1) {
        alert('Project title required! (At least 1 char)');
        return;
    }

    createNewProject(projectTitle, [])
    setLS('projectList', projects);

    projectDialog.close();

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
    
    const newTodo = makeTodo(todoTitle, todoDesc, todoDueDate, todoPriority, whichProject);
    createTodoDOM(newTodo, whichProject);
    projects[whichProject-1].content.push(newTodo);
    setLS('projectList', projects);

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
    
    editDialog.close(); 
    projects[todoObj.project - 1].content[0] = todoObj;
    setLS('projectList', projects);
});

editDialog.addEventListener('close', ()=>{
    deleteTodoButton.textContent = 'DELETE';
});

deleteTodoButton.addEventListener('click', ()=>{
    if (deleteTodoButton.textContent === 'DELETE') {
        deleteTodoButton.textContent = 'CLICK AGAIN';
    } else if (deleteTodoButton.textContent === 'CLICK AGAIN') {
        const todoObj = currentTodo[0];
        const todoIndex = projects[todoObj.project-1].content.indexOf(todoObj);
        const todoDisplay = currentTodo[4];
        projects[whichProject-1].content.splice(todoIndex, 1);
        todoDisplay.remove();
        editDialog.close();
        setLS('projectList', projects);
    }
});