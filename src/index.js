import "./index.css";

const editTodo = document.querySelector('#edit-todo');
const dialogExitButton = document.querySelector('.dialog-exit');

// move logic to button creation
const todoDos = document.querySelectorAll(".edit-todo");
todoDos.forEach((todo) => {
    todo.addEventListener('click', ()=>{

        editTodo.showModal();
    });
});

dialogExitButton.addEventListener('click', ()=>{
    editTodo.close();
});
