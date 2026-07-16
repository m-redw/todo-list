class project {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }
}

export default function makeProject(name, content) {
    const newProject = new project(name, content);
    return newProject;
}