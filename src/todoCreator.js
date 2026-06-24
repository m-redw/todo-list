// <div class="todo">
//     <div>
//         <button class="checkbox"></button>
//         <span class="title">Todooooooooooooooooooooooo 1</span>
//         <span class="desc">[...]</span>
//     </div>
//     <p class="due">Due in 3 days</p>                        
//     <button class="edit-todo">Edit</button>
//     <button class="delete-todo">x</button>
// </div>

export function createTodo(title, desc, due, parent) {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo')

    const div = createMainContent(title, desc);
    todoContainer.appendChild(div);

    if (due != '') {
        const dueDate = createDueDate(due);
        todoContainer.appendChild(dueDate);
    }

    const editButton = createEditButton();
    todoContainer.appendChild(editButton);
    
    const deleteButton = createDeleteButton();
    todoContainer.appendChild(deleteButton);

    parent.appendChild(todoContainer);
}




function createCheckbox() {
    const checkbox = document.createElement('button');
    checkbox.classList.add('checkbox');
    return checkbox;
}

function createTitle(title) {
    const newTitle = document.createElement('span');
    newTitle.classList.add('title');
    newTitle.textContent = title;
    return newTitle;
}

function createDesc(desc) {
    const newDesc = document.createElement('span');
    newDesc.classList.add('desc');
    newDesc.textContent = '[...]';
    return newDesc;
}

function createMainContent(title, desc) {
    const newDiv = document.createElement('div');
    const newCheckbox = createCheckbox();
    const newTitle = createTitle(title);

    newDiv.appendChild(newCheckbox);
    newDiv.appendChild(newTitle);

    if (desc != '') {
        const newDesc = createDesc(desc);
        newDiv.appendChild(newDesc);
    }


    return newDiv;
}

function createDueDate(due){
    const dueDate = document.createElement('p');
    dueDate.classList.add('due');
    dueDate.textContent = due;
    return dueDate;
}

function createEditButton() {
    const editButton = document.createElement('button');
    editButton.classList.add('edit-todo');
    editButton.textContent = 'Edit';
    return editButton;
}

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-todo');
    deleteButton.textContent = 'x';
    return deleteButton;
}
