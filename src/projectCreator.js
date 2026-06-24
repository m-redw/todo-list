{/* <div class="project">
    <div class="content-container">
        <h1>Project 1</h1>

        <h2>Heading 1</h2>
    </div>

    <button class="add-more">+</button>
</div> */}

const projectList = document.querySelector('.project-list');

export function createProject(title) {
    const project = document.createElement('div');
    project.classList.add('project');

    const contentContainer = createContentContainer(project);
    createProjectTitle(title, contentContainer);

    createAddButton(project);
    projectList.appendChild(project);

    return { contentContainer };
}




function createContentContainer(parent) {
    const container = document.createElement('div');
    container.classList.add('content-container');
    parent.appendChild(container);
    return container;
}

function createProjectTitle(title, parent) {
    const projectTitle = document.createElement('h1');
    projectTitle.textContent = title;
    parent.appendChild(projectTitle);
}

function createAddButton(parent) {
    const button = document.createElement('button');
    button.classList.add('add-more');
    button.textContent = '+';
    parent.appendChild(button);
}