export function createHeader(title, parent) {
    const h2 = document.createElement('h2');
    h2.textContent = title
    parent.appendChild(h2);
}