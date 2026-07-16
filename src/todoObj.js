class todo {
    constructor(title, desc, dueDate, priority, project) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

export default function makeTodo(title, desc, dueDate, priority, project) {
    const newTodo = new todo(title, desc, dueDate, priority, project);
    return newTodo;
}