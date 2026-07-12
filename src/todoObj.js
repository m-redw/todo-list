class todo {
    constructor(title, desc, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export default function makeTodo(title, desc, dueDate, priority) {
    const newTodo = new todo(title, desc, desc, priority);
    return newTodo;
}