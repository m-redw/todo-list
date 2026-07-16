export default function setLS(dataName, data) {
    localStorage.setItem(`${dataName}`, JSON.stringify(data));
}